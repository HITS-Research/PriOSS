import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as d3 from 'd3';
import { GranularityEnum, Granularity2LabelMapping, getSmallerGranularity } from './granularity.enum';
import { formatDisplayTime } from './formatDisplayTime.function';
import * as dateUtils from '../../../utilities/dateUtils.functions';
import { NotificationService } from 'src/app/notification/notification.component';
import { SpotHistoryRepository } from 'src/app/db/data-repositories/spotify/spot-history/spot-history.repository';
import { SpotYearlyListening } from 'src/app/models/Spotify/ListeningHistory/SpotYearlyListening';
import { SpotMonthlyListening } from 'src/app/models/Spotify/ListeningHistory/SpotMonthlyListening';
import { SpotHourlyListening } from 'src/app/models/Spotify/ListeningHistory/SpotHourlyListening';
import { SpotDailyListening } from 'src/app/models/Spotify/ListeningHistory/SpotDailyListening';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { SongtimelineComponent } from '../songtimeline/songtimeline.component';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { TopSongsComponent } from '../top-songs/top-songs.component';
import { TopArtistsComponent } from '../top-artists/top-artists.component';

interface ListeningtimeFilterHistoryEntry {
  granularity: GranularityEnum;
  filterFromDate: Date|null;
  filterToDate: Date|null;
  filterSingleDate: Date|null;
}

/**
  * This component visualizes the total listening time in relation to configurable time periods
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
@Component({
  selector: 'spot-listening-time',
  templateUrl: './listening-time.component.html',
  styleUrls: ['./listening-time.component.less']
})
export class ListeningTimeComponent extends SequenceComponentInit implements AfterViewInit, OnDestroy{

  @Input()
  previewMode = false;
  @ViewChild('SongtimelineComponent') 
  songtimelineComponent : SongtimelineComponent;
  @ViewChild('TopSongsComponent') 
  topSongsComponent : TopSongsComponent;
  @ViewChild('TopArtistsComponent') 
  topArtistsComponent : TopArtistsComponent;

  readonly spotifyGreen: string = "#1DB954";

  public Granularity2LabelMapping = Granularity2LabelMapping;
  public granularityValues = Object.values(GranularityEnum);
  selectedGranularity: GranularityEnum = GranularityEnum.Year;
  GranularityEnum = GranularityEnum;

  isFirstVisualizationRun = true;

  //intermediate saves for the datamaps, so they don't have to be recalculated when the filters change
  //this is only used for the larger datamaps, month & year, because they may take significant time to recalculate
  yearDataMap: Map<string, { date: Date, value: number }> = new Map();
  monthDataMap: Map<string, { date: Date, value: number }> = new Map();
  //save the last used data for visulization so the user can disable enable visual elements of the barchar
  lastUsedVisualizationData: { name: string, value: number, color: string }[];

  //Date Filters
  filterFromDate: Date | null;
  filterToDate: Date | null;
  filterSingleDate: Date | null;

  /**
   * A list of previously used filters, so users can easily go back to their previous views on the data
   */
  filterHistory: ListeningtimeFilterHistoryEntry[] = []
  /**
   * A copy of the current filter values. This is needed, so when the actual filters change, their previous values can be inserted into the history.
   */
  currentFilterHistoryEntry: ListeningtimeFilterHistoryEntry;

  //Barchart visual elements
  showDataTextAboveBars = false;

  /**
   * The name of the bar that the user right clicked on last. 
   * This is used to determine what date the bar represents when switching to Top Songs / Top Artists Visualization
   */
  rightClickedBarName = "";
  contextMenuEventSubscription: Subscription;

  /**
    * the listening history to be visualized, this is fetched in the constructor and saved here so the recreateVisualization method can access this info whenever it needs to update
    * the displayed chart
    */
  history: any;

  constructor(private spotHistoryRepo: SpotHistoryRepository, private dbService: NgxIndexedDBService, private notifyService: NotificationService, private router: Router) {
    super();
  }

/**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  ngAfterViewInit()
  {
    console.log("--- Preview Mode: " + this.previewMode);

    this.contextMenuEventSubscription = fromEvent(document,'contextmenu-open').subscribe((res:any)=>{
      console.log('Received Context Menu Event:');
      console.log(res.detail)
      this.rightClickedBarName = res.detail;
    });

    if (!this.previewMode)
    {
      this.initComponent();
    }
  }

  /**
  * A Callback called by angular when the component is destroyed
  * It handles the cleanup necessary.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  ngOnDestroy() {
    this.contextMenuEventSubscription.unsubscribe();
  }

/**
  * Displays the initial version of the visulaization and calculates the year and month based data for later reuse
  *
  * @author: Simon (scg@mail.upb.de)
  */
  override async initComponent(): Promise<void> {

    console.log("--- Initializing Component 2: ListeningTime");

    //Shows the single day view first because it takes less time to build than year/month/day views,
    //this gives us time to parse and compile the data needed for the year, month and day views
    this.selectedGranularity = GranularityEnum.Year;
    
    this.filterHistory = [];
    this.currentFilterHistoryEntry = { 
      granularity: this.selectedGranularity, 
      filterFromDate: null, 
      filterToDate: null, 
      filterSingleDate: null
    };

    let dataMap = await this.createYearData();
    this.yearDataMap = dataMap;

    await this.recreateVisualization();
    this.isFirstVisualizationRun = false;

    dataMap = await this.createMonthData();
    this.monthDataMap = dataMap;
  }


/**
  * Callback that handles updating the visualization after the user changed the date filters of the chart
  *
  * @author: Simon (scg@mail.upb.de)
  */
  onDateFilterChanged() {

    this.recreateVisualization();
  }

  /**
   * Called when the filter values change. Takes the current filter history entry and saves it in the filter history list.
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  updateFilterHistory() {

    const lastFilters = this.currentFilterHistoryEntry;//this.filterHistory[this.filterHistory.length-1];

    if(lastFilters.granularity != this.selectedGranularity ||
       lastFilters.filterFromDate != this.filterFromDate ||
       lastFilters.filterToDate != this.filterToDate ||
       lastFilters.filterSingleDate != this.filterSingleDate) {

      this.filterHistory.push(lastFilters);
      this.currentFilterHistoryEntry = { 
        granularity: this.selectedGranularity, 
        filterFromDate: this.filterFromDate, 
        filterToDate: this.filterToDate, 
        filterSingleDate: this.filterSingleDate
      };
    }
  }

  /**
   * Callback for going back to the previous filter in the filter history list.
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  onClickedRevertFilters() {
    const filters = this.filterHistory.pop();

    if(filters)
    {
      this.selectedGranularity = filters.granularity;
      this.filterFromDate = filters.filterFromDate;
      this.filterToDate = filters.filterToDate;
      this.filterSingleDate = filters.filterSingleDate;
      this.currentFilterHistoryEntry = filters;

      this.recreateVisualization(false);
    }
    else
    {
      //reset to defaults
      this.selectedGranularity = GranularityEnum.Year;
      this.filterFromDate = null;
      this.filterToDate = null;
      this.filterSingleDate = null;

      this.currentFilterHistoryEntry = { 
        granularity: this.selectedGranularity, 
        filterFromDate: this.filterFromDate, 
        filterToDate: this.filterToDate, 
        filterSingleDate: this.filterSingleDate
      };

      this.recreateVisualization(false);
    }
  }

/**
  * Callback that handles updating the visualization after the user changed the granularity of the chart
  *
  * @author: Simon (scg@mail.upb.de)
  */
  onGranularityChanged() {
    this.filterFromDate = null;
    this.filterToDate = null;

    this.recreateVisualization();
  }

  /**
    * Callback that handles updating barchart if the underlying data/filters have not changed but visual elements of the bar have been requested to change
    *
    * @author: Simon (scg@mail.upb.de)
    */
  onChartParametersChanged() {
    this.makeBarChart(this.lastUsedVisualizationData);
  }

  /**
    * Starts the updating process for the barchart after filters or granularity have changed.
    *
    *
    * @author: Simon (scg@mail.upb.de)
    */
  async recreateVisualization(updateFilterHistory = true) {
    let data: { name: string, value: number, color: string }[] | null = [];

    if(updateFilterHistory) {
      this.updateFilterHistory();
    }

    //compile the data based on the history in the selected granularity (e.g. by year / by month, etc.)
    switch (this.selectedGranularity) {
      case GranularityEnum.Year:
        data = this.buildDataArray(this.yearDataMap);
        break;
      case GranularityEnum.Month:
        data = this.buildDataArray(this.monthDataMap);
        break;
      case GranularityEnum.Day:
        data = await this.createDayData();
        break;
      case GranularityEnum.Hour:
        data = await this.createHourData();
        break;
      default:
        throw new Error('Unsupported Granularity');
    }


    //make new barchart according to data
    this.makeBarChart(data);
  }

  /**
    * Parses the listening history into a data map usable for creating a bar chart with year-granularity
    * (i.e., each bar represents one year).
    *
    * @returns The built datamap
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async createYearData() {

    const dataMap: Map<string, { date: Date, value: number }> = new Map();

    const spotYearlyListening: SpotYearlyListening[] = await this.spotHistoryRepo.getHistoryByYear();
    for(let i = 0; i < spotYearlyListening.length; i++)
    {
      const yearData: SpotYearlyListening = spotYearlyListening[i];
      const date: Date = new Date(Number(yearData.year), 0);
      const value: number = yearData.msPlayed;
      dataMap.set(yearData.year, { date, value })
    }

    return dataMap;
  }

  /**
    * Parses the listening history into a data map usable for creating a bar chart with month-granularity
    * (i.e., each bar represents one month)
    *
    * @returns the built datamap
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async createMonthData() {

    const dataMap: Map<string, { date: Date, value: number }> = new Map();

    const spotMonthlyListening: SpotMonthlyListening[] = await this.spotHistoryRepo.getHistoryByMonth();
    for(let i = 0; i < spotMonthlyListening.length; i++)
    {
      const monthData: SpotMonthlyListening = spotMonthlyListening[i];
      const date: Date = new Date(Number(monthData.year), Number(monthData.month)-1);
      const value: number = monthData.msPlayed;
      dataMap.set(monthData.yearMonth, { date, value })
    }

    return dataMap;
  }

  /**
    * Parses the listening history into a data array usable for creating a bar chart with day-granularity
    * (i.e., each bar represents one day)
    *
    * @returns A data array with one entry for every day in the timeperiod specified by filterFromDate and filterToDate filters.
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async createDayData() {
    console.log("Create day data");

    const dataMap: Map<string, { date: Date, value: number }> = new Map();

    //Show nothing unless filters are active
    if (this.filterFromDate == null || this.filterToDate == null) {
      return null;
    }

    const fromDate: Date = dateUtils.trimDate(this.filterFromDate, GranularityEnum.Day);
    const toDate: Date = dateUtils.trimDate(this.filterToDate, GranularityEnum.Day);

    const spotDailyListening: SpotDailyListening[] = await this.spotHistoryRepo.getHistoryByDay(fromDate, toDate);
    console.log(spotDailyListening);

    for (let i = 0; i < spotDailyListening.length; i++) {

      const historyEntry: SpotDailyListening = spotDailyListening[i];

      const date: Date = dateUtils.parseDate(historyEntry.date);
      const displayDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const value: number = historyEntry.msPlayed;
      dataMap.set(displayDate, { date, value });
    }

    const dataArray = this.buildDataArray(dataMap);

    return dataArray;
  }

  /**
    * Parses the listening history into a data array usable for creating a bar chart with hour-granularity
    * (i.e., each bar represents one hour)
    *
    * @returns A data array with one entry for every hour of the day specified by the filterSingleDate filter.
    *          If this filter is empty and this visualization is displayed directly after this component is loaded,
    *          then the filterSingleDate filter is set to the most recent day that is available in the history.
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async createHourData() {

    //Get the most recent day in the history from the db
    const mostRecentDay: Date = await this.spotHistoryRepo.getMostRecentDay();

    //If this is the initial visualization run, set the filter to the most recent day present in the history
    if (this.isFirstVisualizationRun) {
      this.filterSingleDate = mostRecentDay;
    }

    //Don't show anything if there is no date selected as a filter
    if (this.filterSingleDate == null) {
      return null;
    }

    const targetDate: Date = dateUtils.trimDate(this.filterSingleDate, GranularityEnum.Day);

    const dataMap: Map<string, { date: Date, value: number }> = new Map();
    const spotHourlyListening: SpotHourlyListening[] = await this.spotHistoryRepo.getHistoryByHour(targetDate);

    for(let i = 0; i < spotHourlyListening.length; i++)
    {
      const hourlyData: SpotHourlyListening = spotHourlyListening[i];
      const date: Date = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hourlyData.hour);
      const value: number = hourlyData.msPlayed;
      dataMap.set(hourlyData.displayHour, { date, value })
    }

    console.log("Data Map:");
    console.log(dataMap);
    return this.buildDataArray(dataMap);
  }

  /**
   * Takes in a dataMap and converts it into a dataarray that can be used by d3's visualization engine to display a barchart.
   * In the resulting dataarray all the filters present on the page are already applied.
   *
   * @param dataMap A Map for creating a bar in a barchart, with the display name as key and the date & value (height) of the bar as the value component of the map
   * @returns a data array with label, value and color for each bar in the barchart
   *
   * @author: Simon (scg@mail.upb.de)
   */
  buildDataArray(dataMap: Map<string, { date: Date, value: number }>) {
    dataMap = new Map([...dataMap.entries()].sort(function ([, value1], [, value2]) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return value1.date.getTime() - value2.date.getTime();
    }));

    //build data array
    const data: { name: string, value: number, color: string }[] = [];
    const names = Array.from(dataMap.keys());
    for (let i = 0; i < names.length; i++) {
      const element = dataMap.get(names[i]);

      if (element != undefined) {
        const date: Date = element.date;
        const value = Number(dataMap.get(names[i])?.value);

        //Applying the Time filters
        if (this.selectedGranularity == GranularityEnum.Hour) {
          //skip the entry if it is not on the specified filter date (defined by filterSingleDate)
          if (this.filterSingleDate != null && dateUtils.trimDate(date, GranularityEnum.Hour).getTime() == dateUtils.trimDate(this.filterSingleDate, GranularityEnum.Hour).getTime())
            continue;
        }
        else {
          //skip the entry if it is not within the filter range (defined by filterFromDate & filterToDate)
          if ((this.filterFromDate != null && dateUtils.trimDate(date, this.selectedGranularity).getTime() < dateUtils.trimDate(this.filterFromDate, this.selectedGranularity).getTime()) ||
            (this.filterToDate != null && dateUtils.trimDate(date, this.selectedGranularity).getTime() > dateUtils.trimDate(this.filterToDate, this.selectedGranularity).getTime())) {
            continue;
          }
        }

        data.push(
            { name: String(names[i]), value: value, color: this.spotifyGreen }
          );
      }
      else {
        throw new Error("Undefined element (key not found) in dataMap that was passed to buildDataArray.");
      }
    }

    return data;
  }

  /**
    * A formatting method that wraps the getDaysHoursMinutesSeconds into a format usable by d3's text formatting
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTimeFormat(domainValue: d3.NumberValue, index: number) {
    return formatDisplayTime(domainValue.valueOf());
  }

  /**
   * Calculates at which values on the y-Axis a tick should be displayed. Aims for 10 ticks but may vary depending on the concrete values.
   * The goal of this function is to display ticks that have rather even values (for example, dont have a tick at 1d 4h 23m but at 1d 4h 0m).
   * 
   * @param maxTimeValue the maximum value on the y-Axis (including a small margin over the highest actual value)
   * @returns A series of values at which a tick on the y-Axis should be displayed
   * @author: Simon (scg@mail.upb.de)
   */
  calculateTimeTicks(maxTimeValue : number) {

    let stepSize = 1000;
    let remainderFromMaxTime = maxTimeValue/1000;

    while (remainderFromMaxTime > 60) {
      remainderFromMaxTime /= 60;
      stepSize *= 60;
    }
    const numberOfTicks = 10;
    const stepSizeScaler = Math.round(maxTimeValue / (numberOfTicks * stepSize))
    const tickStepSize = stepSize * (stepSizeScaler > 0 ? stepSizeScaler : 1);

    return d3.range(0, maxTimeValue, (maxTimeValue/tickStepSize <= 5 ? tickStepSize/2 : tickStepSize));
  }

  /**
    * Creates a bar chart for the listening time based on the given data. The data may have any granularity
    *
    * @param data: The data array (structure: {name: string, value: number, color: string}[]) that should be used to fill the bar chart
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async makeBarChart(data: { name: string, value: number, color: string }[] | null) {
    //show an empty chart if the given data is null
    if (data == null) {
      data = [];
    }

    //remove old barchart
    d3.select("#listeningtime-bar-chart").selectAll("*").remove();

    //save used data
    this.lastUsedVisualizationData = data;

    const values: number[] = data.map((element: any) => element.value);
    const maxValue = values.reduce((a, b) => Math.max(a, b), -Infinity);
    const yAxisValueheight = maxValue * 1.1;

    const textSize = "20px";

    const margin = 100;
    const leftmargin = 150;
    const bottomMargin = 125;
    const xAxisWidth = window.innerWidth - margin * 2;
    const yAxisHeight = window.innerHeight*0.90 - margin * 2;
    const svg = d3
      .select("#listeningtime-bar-chart")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
        //`0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
      )
      .append("g")
      .attr("transform", "translate(" + leftmargin + "," + 0 + ")");

    const x: any = d3
      .scaleBand()
      .range([0, xAxisWidth])
      .domain(data.map((d: any) => d.name))
      .padding(0.2);

    // Drawing X-axis on the DOM
    svg
      .append("g")
      .attr("transform", "translate(0," + yAxisHeight + ")")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + yAxisHeight + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", textSize)
      /*
      //rotated labels with their start at the top
      .style("text-anchor", "start")
      .attr("dx", ".8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(65)");
      */
      //rotated labels with their end at the top
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

      
    const formatter = this.getTimeFormat;//d3.format(".0%");

    // Create Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, yAxisValueheight])
      .range([yAxisHeight,0]);//[yAxisHeight,0]

    // Draw the Y-axis on the DOM
    svg
      .append("g")
      .call(d3.axisLeft(y)
              .scale(y)
              .tickFormat(formatter)
              .tickValues(this.calculateTimeTicks(yAxisValueheight)))
      .selectAll("text")
      .style("font-size", textSize);

    // create tooltip element
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");

    //find the custom contextmenu  
    const contextMenu = d3.select("#contextmenu");

    let hoveringBarName = "";
    const currentGranularity: GranularityEnum = this.selectedGranularity;


    const calcBarHeight = (d: any) => yAxisHeight - y(d.value)

    // Create and fill the bars
    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", () => yAxisHeight)
      //.attr("y", (d: any) => height - y(d.value) * height / 100)
      .attr("width", x.bandwidth())
      .attr("height", 0)//calcBarHeight)
      //.attr("height", (d: any) => y(d.value) * height / 100)// this.height
      .attr("fill", (d: any) => d.color)
      //Left CLick
      .on("click", () => {
        tooltip.html(``).style("visibility", "hidden");
        if (this.selectedGranularity != GranularityEnum.Hour) {
          this.onBarClicked(hoveringBarName);
        }
        else if (this.filterSingleDate) {
          this.onBarClicked(dateUtils.getDisplayDateString(this.filterSingleDate) + " " + hoveringBarName)
        }
      })
      //Right Click
      .on("contextmenu", function (event, d) {
        //prevent the normal brwoser context menu from appearing
        event.preventDefault();
        //save the name of the bar that was rightcliced, so we can determine the date it represents later
        document.dispatchEvent(new CustomEvent('contextmenu-open',{detail: d.name}));
        //remove the tooltip, so it doesn't interfere with the new contextmenu
        tooltip.html(``).style("visibility", "hidden");
        //show the new context menu
        contextMenu.style("visibility", "visible")
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");

      })
      //Mouse Hover
      .on("mouseover", function (event, data) {
        contextMenu.style("visibility", "hidden");
        onMouseOver(currentGranularity, tooltip, this, data);
        hoveringBarName = data.name;
      })
      //Mouse moved: change tooltip position
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      //Mouse not hovering: hide tooltip
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
        hoveringBarName = "";
        //d3.select(this).style("boxshadow", "none");
        //d3.select(this).style("cursor", "auto");
      })
      //Add bar rising transition
      .transition()
            .duration(1000)
            .attr("y", (d: any) => y(d.value))
            .attr("height", calcBarHeight)
            .style("fill", (d: any) => d.color);

    //add texts above bars
    if (this.showDataTextAboveBars) {
      svg
        .selectAll("text.bar")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "#70747a")
        .style("font-size", textSize)
        .attr("x", (d: any) => x(d.name) + (x.bandwidth() / 2))
        .attr("y", (d: any) => y(d.value) - 5) // change text position
        .text((d: any) => formatDisplayTime(d.value));
    }
  }

  /**
    * Callback that handles stepping into a bar by changing the filters accordingly to the clicked bar
    *
    * @param clickedBarDateString The iso-date string of the bar that was clicked: either YYYY or YYYY-MM or YYYY-MM-DD
    *
    * @author: Simon (scg@mail.upb.de)
    */
  onBarClicked(clickedBarDateString: string) {
    const smallerGranulartiy: GranularityEnum | null = getSmallerGranularity(this.selectedGranularity);

    if (smallerGranulartiy != null) {
      this.selectedGranularity = smallerGranulartiy;
      //TODO: select correct date filter based on the given hoveringBarName
      this.calculateFilters(smallerGranulartiy, clickedBarDateString);
      this.recreateVisualization();
    }
    else {
      /* Switch out listeningtime visualization for songtimeline visualization
         this is done to make sure that, when the user navigates back from the songtimeline to the listeningtime, 
         the listening time's filter history is still available
      */
      const listeningTimePage = document.getElementById('listeningtime-page');
      const songtimelinePage = document.getElementById('songtimeline-page');

      if(songtimelinePage && listeningTimePage) {
        listeningTimePage.style.display='none';
        songtimelinePage.style.display='block';
        //set the correct input time in the visualization
        this.songtimelineComponent.filterDateTime = dateUtils.parseDate(clickedBarDateString);
        this.songtimelineComponent.onDateFilterChanged();

      }

      //this.notifyService.showNotification("Hour-wise visualization over a single day is the most detailed visualization available. You can't step into a single hour.");
    }
  }

/**
  * Callback for the context menu buttons: Displays the TopSongs Visualization with the date filtered to the bar that was right clicked last.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  goToTopSongs() {
    /* Switch out listeningtime visualization for Top Songs visualization
         this is done to make sure that, when the user navigates back to the listeningtime, 
         the listening time's filter history is still available
      */
    const listeningTimePage = document.getElementById('listeningtime-page');
    const topsongsPage = document.getElementById('topsongs-page');

    if(topsongsPage && listeningTimePage) {
      listeningTimePage.style.display='none';
      topsongsPage.style.display='block';
      d3.select("#contextmenu").style("visibility", "hidden");

      //set the correct input time in the visualization
      this.topSongsComponent.filterFromDate = dateUtils.parseDate(this.getStartDateFromLabel(this.rightClickedBarName));
      this.topSongsComponent.filterToDate = dateUtils.parseDate( this.getEndDateFromLabel(this.rightClickedBarName));
      this.topSongsComponent.calledFromListeningtime = true;
      this.topSongsComponent.onDateFilterChanged();
    }

    //this.router.navigate(['spot/top-songs/', this.getStartDateFromLabel(this.rightClickedBarName), this.getEndDateFromLabel(this.rightClickedBarName)]);
  }

/**
  * Callback for the context menu buttons: Displays the TopArtists Visualization with the date filtered to the bar that was right clicked last.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  goToTopArtists() {
    /* Switch out listeningtime visualization for Top Artists visualization
         this is done to make sure that, when the user navigates back to the listeningtime, 
         the listening time's filter history is still available
      */
    const listeningTimePage = document.getElementById('listeningtime-page');
    const topArtistsPage = document.getElementById('topartists-page');

    if(topArtistsPage && listeningTimePage) {
      listeningTimePage.style.display='none';
      topArtistsPage.style.display='block';
      d3.select("#contextmenu").style("visibility", "hidden");

      //set the correct input time in the visualization
      this.topArtistsComponent.filterFromDate = dateUtils.parseDate(this.getStartDateFromLabel(this.rightClickedBarName));
      this.topArtistsComponent.filterToDate = dateUtils.parseDate( this.getEndDateFromLabel(this.rightClickedBarName));
      this.topArtistsComponent.calledFromListeningtime = true;
      this.topArtistsComponent.onDateFilterChanged();
    }
   
    //this.router.navigate(['spot/top-artists/', this.getStartDateFromLabel(this.rightClickedBarName), this.getEndDateFromLabel(this.rightClickedBarName)]);
  }

/**
  * Based on the given label of a bar in the chart, it calculates the start date of the timeframe that the bar represents.
  * 
  * @returns: the calculated date as a date-string in the format YYYY-MM-DD HH24-00. Hours and Minutes are left out when not needed
  *
  * @author: Simon (scg@mail.upb.de)
  */
  getStartDateFromLabel(dateLabel: string): string {

    switch(this.selectedGranularity) {
      case GranularityEnum.Hour: {
        const date: Date|null= this.filterSingleDate;
        if(date) {
          return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + dateLabel;
        }
        else {
          return "";
        }
      }
      case GranularityEnum.Day:
        return dateLabel;
      case GranularityEnum.Month:
        return dateLabel + "-01";
      case GranularityEnum.Year:
        return dateLabel + "-01-01";
    }
  }

/**
  * Based on the given label of a bar in the chart, it calculates the end date of the timeframe that the bar represents.
  * 
  * @returns: the calculated date as a date-string in the format YYYY-MM-DD HH24-00. Hours and Minutes are left out when not needed
  *
  * @author: Simon (scg@mail.upb.de)
  */
  getEndDateFromLabel(dateLabel: string): string {

    let date: Date|null;
    let startDate: Date;
    let endDate: Date;

    switch(this.selectedGranularity) {
      case GranularityEnum.Hour:
        date = this.filterSingleDate;
        if(date) {
          //change dateLabel to be the next hour
          const dateParts = dateLabel.split(":");
          if(dateParts[0]) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (parseInt(dateParts[0]) + 1) + ':' + dateParts[1];
          }
          else {
            return "";
          }
        }
        else {
          return "";
        }

      case GranularityEnum.Day:
        startDate = dateUtils.parseDate(dateLabel);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
        return endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();

      case GranularityEnum.Month:
        startDate = dateUtils.parseDate(dateLabel);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        return endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();

      case GranularityEnum.Year:
        return dateLabel + "-12-31";
    }
  }

  /**
    * Calculates the necessary new values for the filters to inspect a single bar after that bar in the bar chart was clicked
    *
    * @param newGranularity The new smaller granularity to which should be switched after a bar was clicked
    * @param selectedBarDateString The iso-date string of the bar that was clicked: either YYYY or YYYY-MM or YYYY-MM-DD
    *
    * @author: Simon (scg@mail.upb.de)
    */
  calculateFilters(newGranularity: GranularityEnum, selectedBarDateString: string) {

    const dateParts = selectedBarDateString.split("-").map(Number);
    const selectedBarDate: Date = new Date(dateParts.length > 0 ? dateParts[0] : 0,
      dateParts.length > 1 ? dateParts[1] - 1 : 0,
      dateParts.length > 2 ? dateParts[2] : 1);

    if (newGranularity == GranularityEnum.Hour) {
      this.filterSingleDate = selectedBarDate;
    }
    else if (newGranularity == GranularityEnum.Day) {
      //the date only includes the month, so we have to calculate the first & last day of it
      this.filterFromDate = new Date(selectedBarDate.getFullYear(), selectedBarDate.getMonth(), 1);
      this.filterToDate = new Date(selectedBarDate.getFullYear(), selectedBarDate.getMonth() + 1, 0);//sets day 0 of the next month, i.e. the last day of the current month
    }
    else if (newGranularity == GranularityEnum.Month) {
      //the date only includes the year, so we have to use the first & last month of it
      this.filterFromDate = new Date(selectedBarDate.getFullYear(), 0);
      this.filterToDate = new Date(selectedBarDate.getFullYear(), 11);
    }

  }
}

/**
  * A function that handles displaying the tooltip when hovering over a bar in the barchart
  * This has to be a function since in the d3 onmouseover event, the 'this'-reference to the component object is not available
  *
  * @param selectedGranularity the current granularity that is selected
  * @param tooltip the d3 tooltip to update
  * @param currRect The d3 rect of the bar chart that is hovered
  * @param data the data associated with the hovered barchart
  *
  * @author: Simon (scg@mail.upb.de)
  */
function onMouseOver(selectedGranularity: GranularityEnum, tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>, currRect: SVGRectElement, data: { name: string, value: number, color: string }) {
  let html;
  if (selectedGranularity == GranularityEnum.Hour) {
    html = tooltip.html(`${formatDisplayTime(data.value)}<br><i>Click to see played songs.</i>`)
    d3.select(currRect).style("cursor", "pointer");
  }
  else {
    html = tooltip.html(`${formatDisplayTime(data.value)}<br><i>Click to inspect.</i>`)
    d3.select(currRect).style("cursor", "pointer");
  }

  html
    .style("visibility", "visible")
    .style("text-align", "center");

}

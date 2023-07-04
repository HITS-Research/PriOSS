import {Component, Input} from '@angular/core';
import * as d3 from 'd3';
import {SpotHistoryRepository} from "../../../db/data-repositories/spotify/spot-history/spot-history.repository";
import {NotificationService} from "../../../notification/notification.component";
import { SpotMinListenedToArtist } from 'src/app/models/Spotify/TopArtist/SpotMinListenedToArtist';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';

/**
 * This component visualizes how many songs from an artist were listened to
 * Because of missing UIDs for artists we cannot distinguish between artists with the same name
 *
 * @author: Jonathan (jvn@mail.upb.de)
 *
 */
@Component({
  selector: 'spot-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.less']
})
export class TopArtistsComponent extends SequenceComponentInit {

  readonly spotifyGreen: string = "#1DB954";
  readonly textSize = "20px";
  @Input()
  previewMode: boolean = false;
  showArtistHistoy : boolean  = false;

  filterFromDate: Date | null;
  filterToDate: Date | null;

  minListenedToArtist : any[];
  activeTabIndex: number = 0;
  selectedArtistName : string = "";
  selectedArtistHistory : any[];

  constructor(private spothistoryRepo: SpotHistoryRepository, private notifyService: NotificationService) {
    super();
    console.log('>> constructor artists visualization');
  }

/**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

  /**
   * Creates the initial visualization
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  override async initComponent() {
    //await new Promise(f => setTimeout(f, 500));  // TODO: fix
    console.log("--- Initializing Component 3: TopArtists");

    this.filterFromDate = await this.spothistoryRepo.getFirstDay();
    this.filterToDate = await this.spothistoryRepo.getMostRecentDay();

    let result: SpotMinListenedToArtist[] = await this.spothistoryRepo.getMinListenedToArtists(this.filterFromDate, this.filterToDate)
    this.minListenedToArtist = result;
    this.makeBarChart(result.slice(0, 10));

  }

  /**
   * This callback method is called when the user changes the date using the datepicker
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  onDateFilterChanged() {
    if (this.filterFromDate !== null && this.filterToDate !== null) {
      if (this.filterFromDate <= this.filterToDate) {
        this.spothistoryRepo.getMinListenedToArtists(this.filterFromDate, this.filterToDate).then((result) => {
          this.minListenedToArtist = result;
          if (this.activeTabIndex === 0) {
            this.makeBarChart(this.minListenedToArtist.slice(0, 10));
          }
        });
      } else {
        this.notifyService.showNotification("The To Date is before the From Date. Please correct this.");
      }
    }
  }


  /**
   * This callback method is called when the user switches between tabs
   *
   * @param index: The number of the tab (0 or 1)
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  onTabSwitch(index: number) {
    this.activeTabIndex = index;
    if (index === 0) {
      this.makeBarChart(this.minListenedToArtist.slice(0, 10));
    }
  }

  /**
   * Creates the bar chart showing the number of songs listened by an artist
   *
   * @param data: An array of SpotMinListenedToArtist
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  makeBarChart(data: { artistName: string, minPlayed: number }[]) {
    //remove old barchart
    d3.select(".bar_chart_top_artists").selectAll("*").remove();

    if (data.length === 0) {
      this.notifyService.showNotification("You did not listen to any music in the selected time period.");
      return;
    }

    let hoveringBarName: string = "";

    // set the dimensions and margins of the graph
    let margin = 100;
    let leftmargin = 200;
    let bottomMargin = 125;
    let xAxisWidth = window.innerWidth - margin * 2;
    let yAxisHeight = window.innerHeight*0.90 - margin * 2;

    // append the svg object to the body of the page
    const svg = d3.select(".bar_chart_top_artists")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
      )
      .append("g")
      .attr("transform", "translate(" + leftmargin + "," + 0 + ")");

    // create tooltip
    const tooltip = d3.select(".bar_chart_top_artists")
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

    // add X axis
    const xScale = d3.scaleLinear()
      .domain([0, data[0].minPlayed]) // maximum
      .range([0, xAxisWidth]);
    svg.append("g")
      .attr("transform", `translate(0, ${yAxisHeight})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", this.textSize);

    // Y axis
    var yScale: any = d3.scaleBand()
      .range([0, yAxisHeight])
      .domain(data.map(d => d.artistName))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0))
      .selectAll("text")
      .style("font-size", this.textSize);

    // bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0) )
      .attr("y", d => yScale(d.artistName))
      .attr("width", d => xScale(d.minPlayed))
      .attr("height", yScale.bandwidth())
      .attr("fill", this.spotifyGreen)
      .on("click", () => {
        this.onBarClicked(hoveringBarName);
      })
      //Mouse Hover
      .on("mouseover", function (event, data) {
        hoveringBarName = data.artistName;
        tooltip.html(data.minPlayed + " min").style("visibility", "visible");
      })
      //Mouse moved: change tooltip position
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      //Mouse not hovering: hide tooltip
      .on("mouseout", function () {
        hoveringBarName = "";
        tooltip.html(``).style("visibility", "hidden");
      })
      //Add bar rising transition
      .attr("width", 0)
      .transition()
      .duration(1000)
      .attr("width", (d) => xScale(d.minPlayed));

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", xAxisWidth - 20)
      .attr("y", yAxisHeight + margin)
      .text("Minutes listened")
      .style("font-size", "25px");
  }

  /**
   * Callback that handles clicking a bar by calling a new visualization
   *
   * @param artistName The name of the artist the bar belongs to
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  onBarClicked(artistName: string) {
    if (this.filterFromDate !== null && this.filterToDate !== null) {
      if (this.filterFromDate <= this.filterToDate) {
        this.spothistoryRepo.getListeningHistoryOfArtist(artistName, this.filterFromDate, this.filterToDate).then((result) => {
          this.selectedArtistName = artistName;
          this.selectedArtistHistory = result;
          this.showArtistHistoy = true;
        });
      }
    }
  }

  /**
   * Callback that handles clicking the back button from the artist history table
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  onBackFromArtist() {
    this.showArtistHistoy = false;
  }

}

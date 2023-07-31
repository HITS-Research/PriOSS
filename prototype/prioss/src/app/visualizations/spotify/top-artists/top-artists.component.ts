/* eslint-disable @typescript-eslint/no-explicit-any */
import {AfterViewInit, Component, Input} from '@angular/core';
import * as d3 from 'd3';
import {SpotHistoryRepository} from "../../../db/data-repositories/spotify/spot-history/spot-history.repository";
import {NotificationService} from "../../../notification/notification.component";
import { SpotMinListenedToArtist } from 'src/app/models/Spotify/TopArtist/SpotMinListenedToArtist';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { ActivatedRoute } from '@angular/router';

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
export class TopArtistsComponent extends SequenceComponentInit implements AfterViewInit{

  readonly spotifyGreen: string = "#1DB954";
  @Input()
  previewMode = false;
  @Input()
  calledFromListeningtime = false;

  showArtistHistoy   = false;

  filterFromDate: Date | null;
  filterToDate: Date | null;

  minListenedToArtist : any[];
  activeTabIndex = 0;
  selectedArtistName  = "";
  selectedArtistHistory : any[];

  constructor(private spothistoryRepo: SpotHistoryRepository, private notifyService: NotificationService, private route: ActivatedRoute) {
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

    if(!this.filterFromDate) {
      this.filterFromDate = await this.spothistoryRepo.getFirstDay();
    }
    if(!this.filterToDate) {
      this.filterToDate = await this.spothistoryRepo.getMostRecentDay();
    }
    
    if(this.filterFromDate && this.filterToDate) {
      const result: SpotMinListenedToArtist[] = await this.spothistoryRepo.getMinListenedToArtists(this.filterFromDate, this.filterToDate)
      this.minListenedToArtist = result;
      this.makeBarChart(result.slice(0, 10));
    }
    else {
      this.makeBarChart([]);
    }
    
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

    if (data.length === 0
        //If SQLite does not find any data it still returns an array with one entry, but the "artistName" portion in the entry is "null" (string, not nulltype)
        || (data.length == 1 && data[0].artistName == "null")) {
  
      data = [];

      d3.select(".bar_chart_top_artists")
        .append("div")
        .text("There is no listening history data in your data-download.");

      //this.notifyService.showNotification("You did not listen to any music in the selected time period.");

      return;
    }

    let hoveringBarName = "";

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 50, left: 100},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(".bar_chart_top_artists")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const yScale: any = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.artistName))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0));

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
      });

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Minutes listened");
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

  /**
   * A callback function that hides this visualization and replaces it with the listeningtime visualization.
   * by doing the replacement this way, instead of displaying this component on a seperate page apart from the listening time, 
   * the listeningtime visualization's filter history is preserved when navigating back to it.
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  returnToListeningTime() {
    const listeningTimePage = document.getElementById('listeningtime-page');
    const topArtistsPage = document.getElementById('topartists-page');
  
    if(topArtistsPage && listeningTimePage) {
      listeningTimePage.style.display='block';
      topArtistsPage.style.display='none';
    }
  }

}

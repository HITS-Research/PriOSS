import { AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from "d3";
import { NotificationService } from 'src/app/features/notification/notification.service';
import { SpotMinListenedToSong } from 'src/app/spotify/models/TopSong/SpotMinListenedToSong';
import { SpotHistoryRepository } from "../../../db/data-repositories/spotify/spot-history/spot-history.repository";
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';

/**
 * This component visualizes which songs have been listened the most to
 *
 * @author: Jonathan (jvn@mail.upb.de)
 *
 */
@Component({
  selector: 'spot-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.less']
})
export class TopSongsComponent extends SequenceComponentInit implements AfterViewInit {

  readonly spotifyGreen: string = "#1DB954";
  readonly textSize = "20px";
  @Input()
  previewMode = false;
  @Input()
  calledFromListeningtime = false;

  showSongHistoy  = false;

  filterFromDate: Date | null;
  filterToDate: Date | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  minListenedToSong : any[];
  activeTabIndex = 0;
  selectedSong : string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedSongHistory: any[];

  constructor(private spotHistoryRepo: SpotHistoryRepository, private notifyService: NotificationService, private route: ActivatedRoute) {
    super();
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
    //await new Promise(f => setTimeout(f, 1000));  // TODO: fix
    console.log("--- Initializing Component 4: TopSongs");

    if(!this.filterFromDate) {
      this.filterFromDate = await this.spotHistoryRepo.getFirstDay();
    }
    if(!this.filterToDate) {
      this.filterToDate = await this.spotHistoryRepo.getMostRecentDay();
    }

    if(this.filterFromDate && this.filterToDate) {
      const result: SpotMinListenedToSong[] = await this.spotHistoryRepo.getMinListenedToSongs(this.filterFromDate, this.filterToDate);
      this.minListenedToSong = result;
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
        this.spotHistoryRepo.getMinListenedToSongs(this.filterFromDate, this.filterToDate).then((result) => {
          this.minListenedToSong = result;
          if (this.activeTabIndex === 0) {
            this.makeBarChart(this.minListenedToSong.slice(0, 10));
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
      this.makeBarChart(this.minListenedToSong.slice(0, 10));
    }
  }

  /**
   * Creates the bar chart showing the most listened songs
   *
   * @param data: An array of SpotMinListenedToSong
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  makeBarChart(data: { artistName: string, trackName: string, minPlayed: number }[]) {
    //remove old barchart
    d3.select(".bar_chart_top_songs").selectAll("*").remove();

    if (data.length === 0
      //If SQLite does not find any data it still returns an array with one entry, but the "artistName" portion in the entry is "null" (string, not nulltype)
      || (data.length == 1 && data[0].artistName == "null")) {

      data = [];

      d3.select(".bar_chart_top_songs")
        .append("div")
        .text("There is no listening history data in your data-download.");

      //this.notifyService.showNotification("You did not listen to any music in the selected time period.");

      return;
  }

    let hoveringArtistName = "";
    let hoveringTrackName = "";

    // set the dimensions and margins of the graph
    const margin = 100;
    const leftmargin = 200;
    const bottomMargin = 125;
    const xAxisWidth = window.innerWidth - margin * 2;
    const yAxisHeight = window.innerHeight*0.90 - margin * 2;

    // append the svg object to the body of the page
    const svg = d3.select(".bar_chart_top_songs")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${xAxisWidth + margin * 2 + 25} ${yAxisHeight + bottomMargin}`
      )
      .append("g")
      .attr("transform", "translate(" + leftmargin + "," + 0 + ")");

    // create tooltip
    const tooltip = d3.select(".bar_chart_top_songs")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("display", "none")
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yScale: any = d3.scaleBand()
      .range([0, yAxisHeight])
      .domain(data.map(d => d.trackName))
      .padding(.1);
    const yAxis = svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0));

    yAxis.selectAll<SVGTextElement, string>("text") // Specify the type for text elements and the data type
      .style("font-size", this.textSize)
      .text(function(d: string) {
        const cleanTrackName = d.replace(/\(feat\..*?\)/i, ''); // Remove "(feat." and everything after it
        return (cleanTrackName.length > 18) ? cleanTrackName.substring(0, 15) + "..." : cleanTrackName;
      });

    yAxis.selectAll<SVGTextElement, string>("text")
      .on("mouseover", function(event, d) {
        const item = data.find(item => item.trackName === d);
        if (item) {
          const tooltipContent = `${item.trackName} by ${item.artistName}`;
          tooltip.style("display", "block")
            .html(tooltipContent)
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        }
      })
      .on("mouseout", function() {
        tooltip.style("display", "none");
      });


    // bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0) )
      .attr("y", d => yScale(d.trackName))
      .attr("width", d => xScale(d.minPlayed))
      .attr("height", yScale.bandwidth())
      .attr("fill", this.spotifyGreen)
      .on("click", () => {
        this.onBarClicked(hoveringArtistName, hoveringTrackName);
      })
      //Mouse Hover
      .on("mouseover", function (event, data) {
        hoveringArtistName = data.artistName;
        hoveringTrackName = data.trackName;
        tooltip.html(data.minPlayed + " min").style("display", "block");
      })
      //Mouse moved: change tooltip position
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      //Mouse not hovering: hide tooltip
      .on("mouseout", function () {
        hoveringArtistName = "";
        hoveringTrackName = "";
        tooltip.html(``).style("display", "none");
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
   * @param artistName The name of the artist the bar belongs to (needed because songs can have the same name)
   * @param trackName The name of the song the bar belongs to
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  onBarClicked(artistName: string, trackName: string) {
    if (this.filterFromDate !== null && this.filterToDate !== null) {
      if (this.filterFromDate <= this.filterToDate) {
        this.spotHistoryRepo.getListeningHistoryOfSong(artistName, trackName, this.filterFromDate, this.filterToDate).then((result) => {
          this.selectedSong = [artistName, trackName];
          this.selectedSongHistory = result;
          this.showSongHistoy = true;
        });
      }
    }
  }

  /**
   * Callback that handles clicking the back button from the artist history table
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  onBackFromSong() {
    this.showSongHistoy = false;
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
    const topSongsPage = document.getElementById('topsongs-page');

    if(topSongsPage && listeningTimePage) {
      listeningTimePage.style.display='block';
      topSongsPage.style.display='none';
    }
  }
}

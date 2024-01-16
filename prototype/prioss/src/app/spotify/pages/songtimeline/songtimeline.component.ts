import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as d3Timelines from "d3-timelines";
import * as d3Time from 'd3-time';
import * as d3Timeformat from 'd3-time-format';
import * as dateUtils from '../../../features/utils/dateUtils.functions';
import { SpotHistoryRepository } from 'src/app/db/data-repositories/spotify/spot-history/spot-history.repository';
import { GranularityEnum } from '../listening-time/granularity.enum';

/**
 * The internally used interface that represents the structure of the data that is needed for the visualization
 *
 * @author: Simon (scg@mail.upb.de)
 */
interface TimelineData{
  label: string,
  times: {"starting_time": number, "ending_time": number, label: string}[]
}

/**
  * This component visualizes what songs have been listened to during a specific hour of one day.
  * It is a subvisualization reachable from the listening time visualization's hour view
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
@Component({
  selector: 'prioss-spotify-songtimeline',
  templateUrl: './songtimeline.component.html',
  styleUrls: ['./songtimeline.component.less']
})
export class SongtimelineComponent {

  filterDateTime: Date;

  constructor(private spotHistoryRepo: SpotHistoryRepository) {

  }

/**
  * Callback that handles updating the visualization after the user changed the date filter
  *
  * @author: Simon (scg@mail.upb.de)
  */
  onDateFilterChanged() {
    this.recreateVisualization();
  }

/**
  * Starts the updating process for the visualization after filter have changed.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  async recreateVisualization() {
    const data = await this.createData();

    const startHour = dateUtils.trimDate(this.filterDateTime, GranularityEnum.Hour);
    const endHour = dateUtils.trimDate(startHour, GranularityEnum.Hour);
    startHour.setUTCHours(startHour.getHours());
    endHour.setUTCHours(endHour.getHours()+1);

    this.makeTimeline(data, startHour, endHour);
  }

/**
  * Gets the necessary data from the spotify listeningtime history SQL repository based on the selected date & hour filter
  *
  * @returns a data array as the basis of the visualization that can be passed to the makeTimeline method
  *
  * @author: Simon (scg@mail.upb.de)
  */
  async createData() {
    const dataArray : TimelineData[] | null = [];

    //Show nothing unless filter is set
    if (this.filterDateTime == null) {
      return null;
    }

    const spotSongs = await this.spotHistoryRepo.getHistoryForSingleHour(this.filterDateTime);
    for(let i = 0; i < spotSongs.length; i++) {
      dataArray.push(
        {label: "", times: [
          {"starting_time": spotSongs[i].startTimeMs, "ending_time": spotSongs[i].endTimeMs, "label": spotSongs[i].label}]
        }
      );
    }
    
    return dataArray;
  }

  /**
   * This functions redraws the timeline visualization based on the passed data.
   *
   * @param data the data that should be shown in the chart as a TimelineData-Array
   * @param startHour the hour at which the scale of the timeline data should start
   * @param endHour the hour at which the scale of the timeline data should end
   *
   * @author: Simon (scg@mail.upb.de)
   */
  async makeTimeline(data: TimelineData[] | null, startHour: Date, endHour: Date) {

    //remove old barchart
    d3.select("#songtimeline-chart").selectAll("*").remove();

    const chart = d3Timelines.timelines()
      .beginning(startHour)
      .ending(endHour)
      .stack()
      .tickFormat({
          format: d3Timeformat.utcFormat("%H:%M"),
          tickTime: d3Time.timeMinutes,
          tickInterval: 1,
          tickSize: 6
        }
      );

    const margin = 100;
    const leftmargin = 150;
    const bottomMargin = 125;
    const xAxisWidth = window.innerWidth - margin * 2;
    const yAxisHeight = window.innerHeight*0.85 - margin * 2;

    d3.select("#songtimeline-chart")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
        //`0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
      )
      .attr("transform", "translate(" + leftmargin + "," + 0 + ")")
      .datum(data)
      .call(chart);
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
    const songtimelinePage = document.getElementById('songtimeline-page');

    if(songtimelinePage && listeningTimePage) {
      listeningTimePage.style.display='block';
      songtimelinePage.style.display='none';
    }
  }
}

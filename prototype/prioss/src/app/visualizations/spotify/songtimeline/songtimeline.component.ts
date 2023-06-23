import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as d3Timelines from "d3-timelines";
import * as d3Time from 'd3-time';
import * as d3Timeformat from 'd3-time-format';
import * as dateUtils from '../../../utilities/dateUtils.functions';
import { SpotHistoryRepository } from 'src/app/db/data-repositories/spotify/spot-history/spot-history.repository';
import { GranularityEnum } from '../listening-time/granularity.enum';


interface TimelineData{
  label: string, 
  times: {"starting_time": number, "ending_time": number, label: string}[]
}

@Component({
  selector: 'app-songtimeline',
  templateUrl: './songtimeline.component.html',
  styleUrls: ['./songtimeline.component.less']
})
export class SongtimelineComponent {

  filterDateTime: Date;

  constructor(private spotHistoryRepo: SpotHistoryRepository) {
    
  }

  onDateFilterChanged() {
    //let data: { label: string, times: {"starting_time": number, "ending_time": number}[]}[] | null= [];
    //initial testdata
    /*let data : TimelineData[] | null= [
      {label: "", times: [
        {"starting_time": 1355752800000, "ending_time": 1355759900000, "label": "Wee1\ntest"},
        {"starting_time": 1355767900000, "ending_time": 1355774400000, "label": "Weee2"}]},
      {label: "", times: [
        {"starting_time": 1355759910000, "ending_time": 1355761900000, "label": "Weee3"}]},
      {label: "", times: [
        {"starting_time": 1355761910000, "ending_time": 1355763910000, "label": "Weee4"}]}
      ];
    */
    this.recreateVisualization();
  }

  async recreateVisualization() {
    let data = await this.createData();

    let startHour = dateUtils.trimDate(this.filterDateTime, GranularityEnum.Hour);
    let endHour = dateUtils.trimDate(startHour, GranularityEnum.Hour);
    endHour.setHours(endHour.getHours()+1);

    this.makeTimeline(data, startHour, endHour);
  }

  async createData() {
    let dataArray : TimelineData[] | null = [];

    //Show nothing unless filter is set
    if (this.filterDateTime == null) {
      return null;
    }
    console.log("Date filter:");
    console.log(this.filterDateTime);

    let spotSongs = await this.spotHistoryRepo.getHistoryForSingleHour(this.filterDateTime);
    for(let i = 0; i < spotSongs.length; i++) {
      dataArray.push(
        {label: "", times: [
          {"starting_time": spotSongs[i].startTimeMs, "ending_time": spotSongs[i].endTimeMs, "label": spotSongs[i].label}]
        }
      );
    }
    console.log("Timeline Data:");
    console.log(dataArray);

    return dataArray;
  }

  async makeTimeline(data: { label: string, times: {"starting_time": number, "ending_time": number}[]}[] | null, startHour: Date, endHour: Date) {

    //remove old barchart
    d3.select("#songtimeline-chart").selectAll("*").remove();

    var chart = d3Timelines.timelines()
      .beginning(startHour)
      .ending(endHour)
      .stack()
      .tickFormat({
          format: d3Timeformat.timeFormat("%H:%M"),
          tickTime: d3Time.timeMinutes,
          tickInterval: 1,
          tickSize: 6
        }
      );

    let margin = 100;
    let leftmargin = 150;
    let bottomMargin = 125;
    let xAxisWidth = window.innerWidth - margin * 2;
    let yAxisHeight = window.innerHeight*0.85 - margin * 2;

    var svg = d3.select("#songtimeline-chart")
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

  returnToListeningTime() {
    let listeningTimePage = document.getElementById('listeningtime-page');
    let songtimelinePage = document.getElementById('songtimeline-page');
  
    if(songtimelinePage && listeningTimePage) {
      listeningTimePage.style.display='block';
      songtimelinePage.style.display='none';
    }
  }
}
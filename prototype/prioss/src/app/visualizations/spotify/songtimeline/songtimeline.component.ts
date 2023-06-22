import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as d3Timelines from "d3-timelines";

@Component({
  selector: 'app-songtimeline',
  templateUrl: './songtimeline.component.html',
  styleUrls: ['./songtimeline.component.less']
})
export class SongtimelineComponent {

  filterDateTime: Date;

  onDateFilterChanged() {
    let testData = [
      {label: "person a", times: [
        {"starting_time": 1355752800000, "ending_time": 1355759900000},
        {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
      {label: "person b", times: [
        {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
      {label: "person c", times: [
        {"starting_time": 1355761910000, "ending_time": 1355763910000}]}
      ];

    this.makeTimeline(testData);
  }

  async makeTimeline(data: { label: string, times: {"starting_time": number, "ending_time": number}[]}[] | null) {
    
    var chart = d3Timelines.timelines();

    var svg = d3.select("#songtimeline-chart")
      .append("svg")
      .attr("width", 500)
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
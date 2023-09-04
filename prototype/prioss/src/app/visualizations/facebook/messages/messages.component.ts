import { Component, Input, OnInit } from '@angular/core';
import { MessagesModel } from 'src/app/models/Facebook/friendsMessages';
import * as utilities from 'src/app/utilities/generalUtilities.functions';
import { FaceBookMessagesInfoRepository } from 'src/app/db/data-repositories/facebook/fb-messages-data/fb-messages-friends.repo';
import { GroupMessagesModel } from 'src/app/models/Facebook/groupsMessages';
import * as d3 from 'd3';
import { FaceBookGroupMessagesInfoRepository } from 'src/app/db/data-repositories/facebook/fb-messages-data/fb-messages-groups.repo';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {
  messagesData: MessagesModel[] = [];
  groupMessagesData: GroupMessagesModel[] = [];
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  @Input()
  previewMode = false;
  totalPeopleMessages = 0;
  totalGroupMessages = 0;
  data: { label: string; value: any; }[];
  dataAvailableIn = false;
  dataAvailableGroup = false;

  constructor(
    private faceMessagesRepo: FaceBookMessagesInfoRepository,
    private facegroupMessagesRepo: FaceBookGroupMessagesInfoRepository
  ) {}

  async ngOnInit(): Promise<void> {
     this.getData();
  }
  
  /**
   * This method is responsible to get the required data for messages.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
   */
  async getData() {
    // Get all face messages info
    this.faceMessagesRepo.getAllFaceMessagesInfo().then((messages) => {
     this.messagesData = messages;
     this.dataAvailableIn = this.messagesData.length !== 0;
     // Calculate total friends messages
    this.totalPeopleMessages = this.messagesData.length;
    });
    // Get all face group messages info
    this.facegroupMessagesRepo.getAllFaceGroupMessagesInfo().then((group_messages) => {
    this.groupMessagesData = group_messages;
    this.dataAvailableGroup = this.groupMessagesData.length !== 0;
    // Calculate total group messages
    this.totalGroupMessages = this.groupMessagesData.length;
    });
  }

  /**
   * This method is responsible load the barchart on click of the tab.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
   */
  onTabSelected(event: any) {
    if (event.index === 2) {
        this.createBarChart("chart");
    }
  }

  /**
   * This method is responsible to create a bar chart for the data.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
  */
  createBarChart(chartId:string) {
    const data = this.groupMessagesData.slice(0, 10);
    const margin = { top: 40, right: 80, bottom: 350, left: 200 };
    const width = 1000 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;
    const svg = d3.select(`#${chartId}`)
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin + ")");

    const maxTickValue = d3.max(data, d => parseInt(d.value))!;
    const tickCount = Math.min(maxTickValue, 10);
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.2);
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.value))!])
      .range([height, 0]);
  
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll(".bar")
      .data(data)
      .enter().append("g")
      .attr("class", "bar-group")
      .attr("transform", d => `translate(${x(d.name)!}, 0)`);
    
    svg.selectAll(".bar-group")
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(parseInt((d as { value: string }).value)))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(parseInt((d as { value: string }).value)))
      .attr("fill", "steelblue");
    
    svg.selectAll(".bar-group")
      .append("text")
      .attr("class", "bar-label")
      .attr("x", x.bandwidth() / 2)
      .attr("y", d => y(parseInt((d as { value: string }).value)) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "16px") 
      .text(d => ((d as { value: string }).value).replace(" times", ""));
  
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .style("font-size", "20px")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");
        
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("font-size", "20px")
      .call(d3.axisLeft(y).ticks(tickCount)); // Use calculated tick count
  
    svg.append("text")
      .attr("transform", `translate(${margin.left + width / 2}, ${height + margin.top + 250})`)
      .style("text-anchor", "middle")
      .style("font-size", "26px")
      .text("Group Names");
  
    svg.append("text")
      .attr("transform", `rotate(-90) translate(${-margin.top - height / 2}, ${margin.left - 70})`)
      .style("text-anchor", "middle")
      .style("font-size", "26px")
      .text("No of Group Interactions");
  } 
}
export interface MessagesData {
  timestamp: number;
  name: string;
  color: string
}

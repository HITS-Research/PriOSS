import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export class chartData{
  year: number;
  count: number;
}
@Component({
  selector: 'app-friend-and-followers',
  templateUrl: './friend-and-followers.component.html',
  styleUrls: ['./friend-and-followers.component.less']
})
export class FriendAndFollowersComponent {
  friends: any[] = [];
  removedFriends: any[] = [];
  friendRequestRecieved: any[] = [];
  friendRequestSent: any[] = [];
  rejectedFriendRequests: any[] = [];
  whoYouFollow: any[] = [];

  @Input()
  previewMode: boolean = false;

  constructor(private dbService: NgxIndexedDBService){}

  ngOnInit() {
    this.getData();
  }

   /**
  * This methods gets all friends and followers related data from PriossDb
  * 
  *
  * @author: rbharmal@mail.upb.de
  *
  */
  private getData()
  {
    this.dbService.getAll('face/friends').subscribe((friends) => {
      this.friends= friends;
      this.createData(friends, "#myFriends", "blue");
    });
    this.dbService.getAll('face/removed_friends').subscribe((friends) => {
      this.removedFriends = friends;
      this.createData(friends,"#removedFriends", "green"); 
    });
    this.dbService.getAll('face/friend_requests_received').subscribe((friends) => {
      this.friendRequestRecieved= friends;    
      this.createData(friends,"#friendRequestSent", "red"); 
    });
    this.dbService.getAll('face/friend_requests_sent').subscribe((friends) => {
      this.friendRequestSent= friends;
      this.createData(friends,"#friendRequestRecieved", "yellow");
    });
    this.dbService.getAll('face/rejected_friend_requests').subscribe((friends) => {
      this.rejectedFriendRequests= friends;
      this.createData(friends,"#rejectedFriends", "pink");
    });
    this.dbService.getAll('face/who_you_follow').subscribe((friends) => {
      this.whoYouFollow= friends;
      this.createData(friends,"#following", "brown");
    });
  }

  /**
    * Creates data based on different years.
    * 
    * @param data: The data array (structure: data: any[], id: string, color: string) that should be used to create data and later pass on to the drawChart() method
    *
    * @author: Rashida (rbharmal@mail.upb.de)
    *
    */

  createData(friends: any[], id: string, color: string)
  {
    var data:any[] = [];
    var years: number[] = [];
    var dataCount: number[] = [];
    friends.forEach(x =>
      {
        const year = x.timestamp.getFullYear();
        if(years.indexOf(year) === -1){
          years.push(year);
        }  
      });
      years.sort();
    years.forEach(year => {
      const friendsCount = friends.filter(a => a.timestamp.getFullYear() === year);
      var abc = {year: year, count: friendsCount.length};
      data.push(abc);
    });
    this.drawChart(data, id, color)
    console.log(data);
  }

/**
    * Creates a bar chart for the friends related data.
    * 
    * @param data: The data array (structure: data: any[], id: string, color: string) that should be used to fill the bar chart
    *
    * @author: Rashida (rbharmal@mail.upb.de)
    *
    */

  drawChart(data: any[], id: string, color: string) {

    //show an empty chart if the given data is null
    if (data == null) {
      data = [];
    }

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Get svg based on the id to draw chart
    const svg = d3.select(id)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const x = d3.scaleBand()
      .domain(data.map(d => d.year.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)] as number[])
      .range([height, 0]);

    const tooltip = svg.append("text")
      .attr("class", "tooltip")
      .attr("x", 0)
      .attr("y", 0)
      .style("color", "white")
      .style("opacity", 0);

    // Fill the chart with data values
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.year.toString())!)
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.count))
        .attr("fill", color)
        // Show tooltip on mouseover
        .on("mouseover", function(event, d) {
          const barX = x(d.year.toString())! + x.bandwidth() / 2;
          const barY = y(d.count);
          tooltip.text(d.count)
            .attr("x", barX)
            .attr("y", barY - 5)
            .style("opacity", 1);
        })
        // Change position of tooltip on mouse move
        .on("mousemove", function (event) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        // Hide tooltip on mouse out
        .on("mouseout", function(event, d) {
          tooltip.style("opacity", 0);
        });
  

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .style("font-size", "20px")
      .call(d3.axisBottom(x));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("font-size", "20px")
      .call(d3.axisLeft(y).ticks(10));

    // Add x-axis label
    svg.append("text")
      .attr("transform", `translate(${margin.left + width / 2}, ${height + margin.top + 55})`)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Year");
    
    // Add y-axis label
    svg.append("text")
      .attr("transform", `rotate(-90) translate(${-margin.top - height / 2}, ${margin.left - 40})`)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Count");
  }
 
  
}

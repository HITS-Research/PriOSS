/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { FacebookFriendsRepository } from 'src/app/db/data-repositories/facebook/fb-friends-data/face_friends.repo';
import { FacebookFriendsModel } from 'src/app/facebook/models/faceFriends';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

export class chartData{
  year: number;
  count: number;
}
@Component({
  selector: 'app-friend-and-followers',
  templateUrl: './friend-and-followers.component.html',
  styleUrls: ['./friend-and-followers.component.less']
})
export class FriendAndFollowersComponent implements OnInit{

  friends: FacebookFriendsModel[] = [];
  friendsFilter = [...this.friends];
  visibleFriends = false;

  removedFriends: FacebookFriendsModel[] = [];
  removedFriendsFilter = [...this.removedFriends];
  visibleRemovedFriends = false

  friendRequestReceived: FacebookFriendsModel[] = [];
  friendRequestReceivedFilter = [...this.friendRequestReceived];
  visibleRequestsReceived = false

  friendRequestSent: FacebookFriendsModel[] = [];
  friendRequestSentFilter = [...this.friendRequestSent];
  visibleRequestsSent = false

  rejectedFriendRequests: FacebookFriendsModel[] = [];
  rejectedFriendRequestsFilter = [...this.rejectedFriendRequests];
  visibleRejectedFriends = false

  whoYouFollow: FacebookFriendsModel[] = [];
  whoYouFollowFilter = [...this.whoYouFollow];
  visibleWhoYouFollow = false

  searchValueFriends = '';
  searchValueRemovedFriends = '';
  searchValueRequestsSent = '';
  searchValueRequestsReceived = '';
  searchValueRejectedFriends = '';
  searchValueWhoYouFollow = '';


  @Input()
  previewMode = false;

  constructor(private faceFriendsRepo: FacebookFriendsRepository){}

  ngOnInit() {
    scrollToTop();
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
    this.faceFriendsRepo.getAllFacebookFriends().then((friends) => {
        this.friendRequestReceived = friends.filter(x => x.type === "#requestsReceived");
        this.createData(this.friendRequestReceived,"#friendRequestReceived", "#FF9800");
        this.friendRequestReceivedFilter = this.filterConnections(this.friendRequestReceived, '');

        this.friendRequestSent = friends.filter(x => x.type === "#requestsSent");
        this.createData(this.friendRequestSent,"#friendRequestSent", "#00C853");
        this.friendRequestSentFilter = this.filterConnections(this.friendRequestSent, '');

        this.friends = friends.filter(x=>x.type === "#friends");
        this.createData(this.friends, "#myFriends", "#1877F2");
        this.friendsFilter = this.filterConnections(this.friends, '');

        this.rejectedFriendRequests = friends.filter(x=>x.type === "#rejectedFriends");
        this.createData(this.rejectedFriendRequests,"#rejectedFriends", "#FF0000");
        this.rejectedFriendRequestsFilter = this.filterConnections(this.rejectedFriendRequests, '');

        this.removedFriends = friends.filter(x=>x.type === "#removedFriends");
        this.createData(this.removedFriends,"#removedFriends", "#808080");
        this.removedFriendsFilter = this.filterConnections(this.removedFriends, '');

        this.whoYouFollow = friends.filter(x=>x.type === "#following")
        this.createData(this.whoYouFollow,"#following", "#00BCD4");
        this.whoYouFollowFilter = this.filterConnections(this.whoYouFollow, '');
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
    const data:any[] = [];
    const years: number[] = [];
    friends.forEach(x =>
      {
        const year = new Date(x.timestamp*1000).getFullYear();
        if(years.indexOf(year) === -1){
          years.push(year);
        }
      });
      years.sort();
    years.forEach(year => {
      const friendsCount = friends.filter(a => new Date(a.timestamp*1000).getFullYear() === year);
      const abc = {year: year, count: friendsCount.length};
      data.push(abc);
    });
    this.drawChart(data, id, color)
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

    const margin = { top: 40, right: 20, bottom: 30, left: 0 };
    const width = 750 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

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
            .attr("x", barX - 19)
            .attr("y", barY + 20)
            .style("opacity", 1)
            .style("font-size", "24px");
        })
        // Change position of tooltip on mouse move
        .on("mousemove", function (event) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        // Hide tooltip on mouse out
        .on("mouseout", function() {
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
  }

/**
  * Converts timestamp into date.
  *
  * @param timestamp: the timestamp for date converstion
  * @author: Rashida (rbharmal@mail.upb.de)
  *
*/
  convertToDate(timestamp: number)
  {
    return new Date(timestamp*1000)
  }

  /**
   * This method is used to search functionality in the friends and followers page
   * @param tabName: The name of the tab in which the search is to be performed
  **/
  search(tabName: string): void {
    switch (tabName) {
      case 'friends':
        this.visibleFriends = false;
        this.friendsFilter = this.filterConnections(this.friends, this.searchValueFriends);
        break;
      case 'removedFriends':
        this.visibleRemovedFriends = false;
        this.removedFriendsFilter = this.filterConnections(this.removedFriends, this.searchValueRemovedFriends);
        break;
      case 'friendRequestSent':
        this.visibleRequestsSent = false;
        this.friendRequestSentFilter = this.filterConnections(this.friendRequestSent, this.searchValueRequestsSent);
        break;
      case 'friendRequestReceived':
        this.visibleRequestsReceived = false;
        this.friendRequestReceivedFilter = this.filterConnections(this.friendRequestReceived, this.searchValueRequestsReceived);
        break;
      case 'rejectedFriends':
        this.visibleRejectedFriends = false;
        this.rejectedFriendRequestsFilter = this.filterConnections(this.rejectedFriendRequests, this.searchValueRejectedFriends);
        break;
      case 'following':
        this.visibleWhoYouFollow = false;
        this.whoYouFollowFilter = this.filterConnections(this.whoYouFollow, this.searchValueWhoYouFollow);
        break;
    }
  }

  /**
   * This method is used to filter the connections based on the search value
   * @param connectionsList: The list of connections that should be filtered
   * @param searchValue: The search value based on which the connections should be filtered
   * @returns: The filtered connections list
   * */
  private filterConnections(connectionsList: FacebookFriendsModel[], searchValue: string = ''): FacebookFriendsModel[] {
    return connectionsList.filter((item: FacebookFriendsModel) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
  }

  /**
   * This method is used to reset the search functionality in the friends and followers page
   * @param tabName: The name of the tab in which the search is to be reset
   * */
  reset(tabName: string): void {
    switch (tabName) {
      case 'friends':
        this.visibleFriends = false;
        this.searchValueFriends = '';
        this.friendsFilter = [...this.friends];
        break;
      case 'removedFriends':
        this.visibleRemovedFriends = false;
        this.searchValueRemovedFriends = '';
        this.removedFriendsFilter = [...this.removedFriends];
        break;
      case 'friendRequestSent':
        this.visibleRequestsSent = false;
        this.searchValueRequestsSent = '';
        this.friendRequestSentFilter = [...this.friendRequestSent];
        break;
      case 'friendRequestReceived':
        this.visibleRequestsReceived = false;
        this.searchValueRequestsReceived = '';
        this.friendRequestReceivedFilter = [...this.friendRequestReceived];
        break;
      case 'rejectedFriends':
        this.visibleRejectedFriends = false;
        this.searchValueRejectedFriends = '';
        this.rejectedFriendRequestsFilter = [...this.rejectedFriendRequests];
        break;
      case 'following':
        this.visibleWhoYouFollow = false;
        this.searchValueWhoYouFollow = '';
        this.whoYouFollowFilter = [...this.whoYouFollow];
        break;
    }
  }

}

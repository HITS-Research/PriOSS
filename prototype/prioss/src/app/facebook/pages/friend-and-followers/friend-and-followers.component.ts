/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as d3 from 'd3';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';
import { FbConnectionsDataModel } from '../../state/models';
import { FacebookState } from '../../state/fb.state';
import { FriendItem } from '../../models/connections/FriendItem.interface';

export class chartData {
  year: number;
  count: number;
}
@Component({
  selector: 'app-friend-and-followers',
  templateUrl: './friend-and-followers.component.html',
  styleUrls: ['./friend-and-followers.component.less'],
})
export class FriendAndFollowersComponent implements OnInit {
  friends: FriendItem[] = [];
  friendsFilter: FriendItem[] = this.friends;
  visibleFriends = false;

  removedFriends: FriendItem[] = [];
  removedFriendsFilter: FriendItem[] = this.removedFriends;
  visibleRemovedFriends = false;

  friendRequestReceived: FriendItem[] = [];
  friendRequestReceivedFilter: FriendItem[] = this.friendRequestReceived;
  visibleRequestsReceived = false;

  friendRequestSent: FriendItem[] = [];
  friendRequestSentFilter: FriendItem[] = this.friendRequestSent;
  visibleRequestsSent = false;

  rejectedFriendRequests: FriendItem[] = [];
  rejectedFriendRequestsFilter: FriendItem[] = this.rejectedFriendRequests;
  visibleRejectedFriends = false;

  whoYouFollow: FriendItem[] = [];
  whoYouFollowFilter: FriendItem[] = this.whoYouFollow;
  visibleWhoYouFollow = false;

  connectionsDatastore: FbConnectionsDataModel = {} as FbConnectionsDataModel;

  searchValue = '';


  @Input()
  previewMode = false;

  constructor(private store: Store) {}

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
  private getData() {
    this.connectionsDatastore = this.store.selectSnapshot(
      FacebookState.getFacebookConnectionsData
    );
    this.friendRequestReceived =
      this.connectionsDatastore.receivedFriendRequests?.received_requests_v2??[];
      
    this.friendRequestSent =
      this.connectionsDatastore.sentFriendRequests?.sent_requests_v2??[];
    this.friends = this.connectionsDatastore.yourFriends?.friends_v2??[];
    this.rejectedFriendRequests =
      this.connectionsDatastore.rejectedFriendRequests?.rejected_requests_v2??[];
    this.removedFriends =
      this.connectionsDatastore.removedFriends?.deleted_friends_v2??[];
    this.whoYouFollow = this.connectionsDatastore.followed?.following_v3 ?? [];

    this.visibleFriends = this.friends.length > 0;
    this.visibleRemovedFriends = this.removedFriends.length > 0;
    this.visibleRequestsReceived = this.friendRequestReceived.length > 0;
    this.visibleRequestsSent = this.friendRequestSent.length > 0;
    this.visibleRejectedFriends = this.rejectedFriendRequests.length > 0;
    this.visibleWhoYouFollow = this.whoYouFollow.length > 0;

    //before we filter, we want to display everything
    this.whoYouFollowFilter = this.whoYouFollow;
    this.friendsFilter = this.friends;
    this.removedFriendsFilter = this.removedFriends;
    this.friendRequestReceivedFilter = this.friendRequestReceived;
    this.friendRequestSentFilter = this.friendRequestSent;
    this.rejectedFriendRequestsFilter = this.rejectedFriendRequests;

    this.createData(
      this.friendRequestReceived,
      '#friendRequestReceived',
      '#FF9800'
    );
    this.createData(
      this.friendRequestReceived,
      '#friendRequestReceived',
      '#FF9800'
    );
    this.createData(this.friendRequestSent, '#friendRequestSent', '#00C853');
    this.createData(this.friends, '#myFriends', '#1877F2');
    this.createData(this.rejectedFriendRequests, '#rejectedFriends', '#FF0000');
    this.createData(this.removedFriends, '#removedFriends', '#808080');
    this.createData(this.whoYouFollow, '#following', '#00BCD4');
  }

  /**
   * Creates data based on different years.
   *
   * @param data: The data array (structure: data: any[], id: string, color: string) that should be used to create data and later pass on to the drawChart() method
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */

  createData(friends: FriendItem[], id: string, color: string) {
    const data: any[] = [];
    const years: number[] = [];
    friends.forEach((x) => {
      const year = new Date(x.timestamp * 1000).getFullYear();
      if (years.indexOf(year) === -1) {
        years.push(year);
      }
    });
    years.sort();
    years.forEach((year) => {
      const friendsCount = friends.filter(
        (a) => new Date(a.timestamp * 1000).getFullYear() === year
      );
      const abc = { year: year, count: friendsCount.length };
      data.push(abc);
    });
    window.setTimeout(() => 
    this.drawChart(data, id, color), 100);
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

    const margin = { top: 40, right: 20, bottom: 30, left: 0 };
    const width = 750 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Get svg based on the id to draw chart
    const svg = d3
      .select(id)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.year.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)] as number[])
      .range([height, 0]);

    const tooltip = svg
      .append('text')
      .attr('class', 'tooltip')
      .attr('x', 0)
      .attr('y', 0)
      .style('color', 'white')
      .style('opacity', 0);

    // Fill the chart with data values
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.year.toString())!)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.count))
      .attr('fill', color)
      // Show tooltip on mouseover
      .on('mouseover', function (event, d) {
        const barX = x(d.year.toString())! + x.bandwidth() / 2;
        const barY = y(d.count);
        tooltip
          .text(d.count)
          .attr('x', barX - 19)
          .attr('y', barY + 20)
          .style('opacity', 1)
          .style('font-size', '24px');
      })
      // Change position of tooltip on mouse move
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      // Hide tooltip on mouse out
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .style('font-size', '20px')
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style('font-size', '20px')
      .call(d3.axisLeft(y).ticks(10));
  }

  /**
   * Converts timestamp into date.
   *
   * @param timestamp: the timestamp for date converstion
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  convertToDate(timestamp: number) {
    return new Date(timestamp * 1000);
  }

  /**
   * Searchs friends array according to the user input
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  searchFriends(): void {
    this.visibleFriends = false;
    this.friendsFilter = this.friends.filter(
      (item: FriendItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  /**
   * Searchs removed friends array according to the user input
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  searchRemovedFriends(): void {
    this.visibleRemovedFriends = false;
    this.removedFriendsFilter = this.removedFriends.filter(
      (item: FriendItem) => item.name.indexOf(this.searchValue) !== -1
    );
  
  }



  /**
   * Searchs friend requests sent array according to the user input
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  searchRequestSent(): void {
    this.visibleRequestsSent = false;
    this.friendRequestSentFilter = this.friendRequestSent.filter(
      (item: FriendItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  /**
   * Searchs friend requests received array according to the user input
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  searchRequestReceived(): void {
    this.visibleRequestsReceived = false;
    this.friendRequestReceivedFilter = this.friendRequestReceived.filter(
      (item: FriendItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  /**
   * Searchs rejected friends array according to the user input
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *    this.faceFriendsRepo.getAllFacebookFriends().then((friends) => {
      this.friendRequestReceived = friends.filter(
        (x) => x.type === '#requestsReceived',
      );
   */
  searchRejectedFriends(): void {
    this.visibleRejectedFriends = false;
    this.rejectedFriendRequestsFilter = this.rejectedFriendRequests.filter(
      (item: FriendItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  /**
   * Searchs who you f    this.faceFriendsRepo.getAllFacebookFriends().then((friends) => {
      this.friendRequestReceived = friends.filter(
        (x) => x.type === '#requestsReceived',
      );ollow array according to the user input
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  searchWhoYouFollow(): void {
    this.visibleWhoYouFollow = false;
    this.whoYouFollowFilter = this.whoYouFollow.filter(
      (item: FriendItem) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  /**
   * Resets the search filter and shows all value for all the arrays
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  reset(): void {
    this.searchValue = '';
    this.searchFriends();
    this.searchRejectedFriends();
    this.searchRemovedFriends();
    this.searchRequestReceived();
    this.searchRequestSent();
    this.searchWhoYouFollow();
  }
}

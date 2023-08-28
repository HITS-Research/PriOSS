import { AfterViewInit, Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';

enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

interface UserInOutMessages {
  weekday: string;
  ingoing: number;
  outgoing: number;
}

/**
 * This component is the visualization component on instagram's dashboard page.
 * This page is shown message information on instagram's dashboard.
 *
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Component({
  selector: 'app-insta-messages',
  templateUrl: './insta-messages.component.html',
  styleUrls: ['./insta-messages.component.less'],
})
export class InstaMessagesComponent
  extends SequenceComponentInit
  implements AfterViewInit
{
  @Input()
  previewMode = false;

  // Variables for bar chart
  //[ingoing, outgoing] first Monday, next tuesday, ...
  userInOutMessages: UserInOutMessages[] = [
    { weekday: Weekday.Monday, outgoing: 12, ingoing: 5 },
    { weekday: Weekday.Tuesday, outgoing: 2, ingoing: 10 },
    { weekday: Weekday.Wednesday, outgoing: 3, ingoing: 15 },
    { weekday: Weekday.Thursday, outgoing: 40, ingoing: 20 },
    { weekday: Weekday.Friday, outgoing: 14, ingoing: 25 },
    { weekday: Weekday.Saturday, outgoing: 101, ingoing: 30 },
    { weekday: Weekday.Sunday, outgoing: 0, ingoing: 35 },
  ];

  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async collectData() {
    this.makeBarChart(this.userInOutMessages);
    //   this.followerInfo = await this.instaFollowerRepo.getFollowerInfo();
    //   await this.instaFollowerRepo.getFollowerInfo().then((followerInfo) => {
    //     this.followerInfo = followerInfo;
    //     this.listOfFollowers = [...this.followerInfo];
    //   });
    //   this.followingInfo = await this.instaFollowingRepo.getFollowingInfo();
    //   await this.instaFollowingRepo.getFollowingInfo().then((followingInfo) => {
    //     this.followingInfo = followingInfo;
    //     this.listOfFollowing = [...this.followingInfo];
    //   });
    //   this.blockedInfo = await this.instaBlockedRepo.getBlockedInfo();
    //   await this.instaBlockedRepo.getBlockedInfo().then((blockedInfo) => {
    //     this.blockedInfo = blockedInfo;
    //     this.listOfBlocked = [...this.blockedInfo];
    //   });
    //   this.recentFollowInfo = await this.instaRecentFollowRepo.getRecentFollowInfo();
    //   await this.instaRecentFollowRepo.getRecentFollowInfo().then((recentFollowInfo) => {
    //     this.recentFollowInfo = recentFollowInfo;
    //     this.listOfRecentFollow = [...this.recentFollowInfo];
    //   });
    //   this.pendingFollowRequestInfo = await this.instaPendingFollowRequestRepo.getPendingFollowRequestInfo();
    //   await this.instaPendingFollowRequestRepo.getPendingFollowRequestInfo().then((pendingFollowRequestInfo) => {
    //     this.pendingFollowRequestInfo = pendingFollowRequestInfo;
    //     this.listOfPending = [...this.pendingFollowRequestInfo];
    //   });
    //   this.recentlyUnfollowedAccountInfo = await this.instaRecentlyUnfollowedAccountsRepo.getRecentlyUnfollowedAccountInfo();
    //   await this.instaRecentlyUnfollowedAccountsRepo.getRecentlyUnfollowedAccountInfo().then((recentlyUnfollowedAccountInfo) => {
    //     this.recentlyUnfollowedAccountInfo = recentlyUnfollowedAccountInfo;
    //     this.listOfRecentUnfollow = [...this.recentlyUnfollowedAccountInfo];
    //   });
    //   this.removedSuggestionInfo = await this.instaRemovedSuggestionRepo.getRemovedSuggestionInfo();
    //   await this.instaRemovedSuggestionRepo.getRemovedSuggestionInfo().then((removedSuggestionInfo) => {
    //     this.removedSuggestionInfo = removedSuggestionInfo;
    //     this.listOfRemoved = [...this.removedSuggestionInfo];
    //   });
    //   this.receivedFollowRequestInfo = await this.instaReceivedFollowRequestRepo.getReceivedFollowRequestInfo();
    //   await this.instaReceivedFollowRequestRepo.getReceivedFollowRequestInfo().then((receivedFollowRequestInfo) => {
    //     this.receivedFollowRequestInfo = receivedFollowRequestInfo;
    //     this.listOfReceived = [...this.receivedFollowRequestInfo];
    //   });
  }

  /**
   * Builds the graph for the followers and following accounts.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async ngAfterViewInit() {
    if (!this.previewMode) {
      await this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {
    console.log('--- Initializing Component 10: Messages');
    await this.collectData();
  }

  makeBarChart(userInOutMessages: UserInOutMessages[]) {
    const highestValue = Math.max(
      ...userInOutMessages.map((o) => o.ingoing),
      ...userInOutMessages.map((o) => o.outgoing)
    );
    const legendWidth = 70;
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 550 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#inOutBar')
      .append('svg')
      .attr('width', width + margin.left + margin.right + legendWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Parse the Data

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = ['ingoing', 'outgoing'];

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = d3.map(userInOutMessages, function (d) {
      return d.weekday;
    });

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, highestValue]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Another scale for subgroup position?
    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.05);

    // create tooltip element
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '15px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', '#fff')
      .text('a simple tooltip');

    //find the custom contextmenu
    const contextMenu = d3.select('#contextmenu');

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in data = loop group per group
      .data(userInOutMessages)
      .enter()
      .append('g')
      .attr('transform', (d) => {
        return 'translate(' + x(d.weekday.toString()) + ',0)';
      })
      .selectAll('rect')
      .data((d) => [
        { key: 'ingoing', value: d.ingoing },
        { key: 'outgoing', value: d.outgoing },
      ])
      .enter()
      .append('rect')
      .attr('x', (d) => {
        return xSubgroup(d.key) || 0;
      })
      .attr('y', (d) => {
        return y(d.value);
      })
      .attr('width', xSubgroup.bandwidth())
      .attr('height', (d) => {
        return height - y(d.value);
      })
      .attr('fill', (d) => {
        if (d.key === 'ingoing') {
          return '#fa7e1e';
        } else {
          return '#4f5bd5';
        }
      })
      //Mouse Hover
      .on('mouseover', (event, data) => {
        contextMenu.style('visibility', 'hidden');
        const html = tooltip.html(data.value.toString());
        d3.select('#contextmenu').style('cursor', 'pointer');

        html.style('visibility', 'visible').style('text-align', 'center');
      })
      //Mouse moved: change tooltip position
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      //Mouse not hovering: hide tooltip
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden');
      });
    svg
      .append('circle')
      .attr('cx', width + 10)
      .attr('cy', 130)
      .attr('r', 6)
      .style('fill', '#fa7e1e');
    svg
      .append('circle')
      .attr('cx', width + 10)
      .attr('cy', 160)
      .attr('r', 6)
      .style('fill', '#4f5bd5');
    svg
      .append('text')
      .attr('x', width + 25)
      .attr('y', 130)
      .text('Ingoing')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
    svg
      .append('text')
      .attr('x', width + 25)
      .attr('y', 160)
      .text('Outgoing')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
  }
}

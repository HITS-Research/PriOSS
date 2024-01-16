import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import * as d3 from 'd3';
import {
  InstaLikedCommentsWithCount
} from 'src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedCommentsWithCount';
import {InstaLikedPostsWithCount} from 'src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedPostsWithCount';
import {InstaLikedCommentsInfo} from 'src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedCommentsInfo';
import {InstaLikedPostsInfo} from 'src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedPostsInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";


/**
 * This component is for instagram's likes for comments and posts.
 * This page is shown once a user visits the likes tab in instagram dashboard
 *
 * @author: Mayank (mayank@mail.upb.de)
 *
 */
@Component({
  selector: 'app-insta-liked-content',
  templateUrl: './insta-liked-content.component.html',
  styleUrls: ['./insta-liked-content.component.less']
})
export class InstaLikedContentComponent extends SequenceComponentInit implements AfterViewInit, OnInit {

  @Input()
  previewMode = false;

  readonly color: string = "#DD2A7B";

  liked_comments_with_count: InstaLikedCommentsWithCount[] = [];
  liked_posts_with_count: InstaLikedPostsWithCount[] = [];
  liked_comments_amount = 0;
  liked_posts_amount = 0;

  liked_comments: InstaLikedCommentsInfo[] = [];
  liked_posts: InstaLikedPostsInfo[] = [];

  // Variables for Graph
  public userListForComments: any[] = [];
  public userListForPosts: any[] = [];

  // Variables for Search and Filter
  visible = false;
  likedCommentsSearchValue = '';
  likedPostsSearchValue = '';
  listOfLikedComments: InstaLikedCommentsInfo[] = [];
  listOfLikedPosts: InstaLikedPostsInfo[] = [];

  sortLikedCommentsDate = (a: InstaLikedCommentsInfo, b: InstaLikedCommentsInfo): number => +a.timestamp - +b.timestamp;
  sortLikedPostsDate = (a: InstaLikedPostsInfo, b: InstaLikedPostsInfo): number => +a.timestamp - +b.timestamp;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    const {likedCommentsInfo, likedPostsInfo} = this.store.selectSnapshot(InstaState.getUserInteractions);
    this.liked_comments_amount = likedCommentsInfo.length;
    this.liked_comments = likedCommentsInfo;
    this.listOfLikedComments = [...likedCommentsInfo]
    this.liked_comments_with_count = this.getTopCounts(likedCommentsInfo);
    this.liked_posts_amount = likedPostsInfo.length;
    this.liked_posts = likedPostsInfo;
    this.listOfLikedPosts = [...likedPostsInfo]
    this.liked_posts_with_count = this.getTopCounts(likedPostsInfo);
  }

  /**
   * A Callback called by angular when the views have been initialized
   * It handles the initialization when the component is displayed on its own dedicated page.
   *
   * @author: Mayank (mayank@mail.upb.de)
   */
  ngAfterViewInit() {
    if (!this.previewMode) {
      this.initComponent();
    }
  }

  /**
   *
   * @author: Mayank (mayank@mail.upb.de)
   */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 5: Liked Comments and Posts");
    this.userListForComments = this.fetchUsernames(this.liked_comments_with_count)
    this.userListForComments.unshift("None");
    this.makeBarChart(this.liked_comments_with_count, ".bar_chart_liked_comments");
    this.userListForPosts = this.fetchUsernames(this.liked_posts_with_count);
    this.userListForPosts.unshift("None");
    this.makeBarChart(this.liked_posts_with_count, ".bar_chart_liked_posts");
  }

  /**
   * Creates the bar chart showing the number of posts/comments liked based on user names
   *
   * @param data An array of InstaLikedPostsWithCount or InstaLikedCommentsWithCount
   * @param divId Div Id to update the chart in the HTML
   *
   * @author: Mayank (mayank@mail.upb.de)
   *
   */
  makeBarChart(data: { user: string, counts: number }[], divId: string) {
    //remove old barchart
    d3.select(divId).selectAll("*").remove();

    if (this.liked_comments.length === 0) {
      return;
    }

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 50, left: 100};
    const width = (460 - margin.left - margin.right) / 2;
    const screenHeight = window.innerHeight;
    const height = screenHeight / 2 - margin.top - margin.bottom;
    // const height = ((data.length + 5) * 15) - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(divId)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add X axis
    const xScale = d3.scaleLinear()
      .domain([0, this.getMaxCounts(data)])
      .range([0, width]);

    let xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    if (this.getMaxCounts(data) < 10) {
      xAxis = xAxis
        .tickValues(d3.range(0, this.getMaxCounts(data) + 1))
        .tickFormat(d3.format(".0f"));
    }

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // add Y axis
    const yScale: any = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.user))
      .padding(.2);
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0));

    // bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", d => yScale(d.user))
      .attr("width", d => xScale(d.counts))
      .attr("height", yScale.bandwidth())
      .attr("fill", this.color);

    if (divId == ".bar_chart_liked_comments") {
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Number of comments liked per user");
    } else if (divId == ".bar_chart_liked_posts") {
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Number of posts liked per user");
    }
  }

  fetchUsernames(arr: any[]): string[] {
    return arr.map(item => item.user).sort();
  }

  getMaxCounts(arr: any[]): number {
    let maxCount = 0;
    arr.forEach(function (item) {
      if (item.counts > maxCount) {
        maxCount = item.counts;
      }
    });
    return maxCount;
  }

  /**
   * Resets the given searchvalue.
   *
   * @param searchList the list that should be resetted.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  reset(searchList: string): void {
    switch (searchList) {
      case 'likedComments':
        this.likedCommentsSearchValue = '';
        break;
      case 'likedPosts':
        this.likedPostsSearchValue = '';
        break;
      default:
        break;
    }

    this.search(searchList);
  }

  /**
   * Searches the given list for the current searchvalue.
   *
   * @param searchList the list that should be searched.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  search(searchList: string): void {
    this.visible = false;

    switch (searchList) {
      case 'likedComments':
        this.listOfLikedComments = this.liked_comments.filter((item: InstaLikedCommentsInfo) => item.user.toLowerCase().indexOf(this.likedCommentsSearchValue.toLowerCase()) !== -1);
        break;
      case 'likedPosts':
        this.listOfLikedPosts = this.liked_posts.filter((item: InstaLikedPostsInfo) => item.user.toLowerCase().indexOf(this.likedPostsSearchValue.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }

  private getTopCounts(likedItems: any[]): any[] {
    const response: Record<string, any> = {};
    likedItems.forEach(({ user }) => {
      response[user] = { user, counts: (response[user]?.counts || 0) + 1 };
    });
    const sortedResponse = Object.values(response).sort((a, b) => b.counts - a.counts);
    return sortedResponse.length > 10 ? sortedResponse.slice(0, 10) : sortedResponse;
  }

}

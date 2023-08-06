import { AfterViewInit, Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import * as d3 from 'd3';
import {NotificationService} from "../../../notification/notification.component";

import { InstaLikedCommentsRepository } from 'src/app/db/data-repositories/instagram/insta-liked-content/insta-likedcomments.repository';
import { InstaLikedPostsRepository } from 'src/app/db/data-repositories/instagram/insta-liked-content/insta-likedposts.repository';
import { InstaLikedCommentsWithCount } from 'src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedCommentsWithCount';
import { InstaLikedPostsWithCount } from 'src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedPostsWithCount';
import { InstaLikedCommentsInfo } from 'src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedCommentsInfo';
import { InstaLikedPostsInfo } from 'src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedPostsInfo';



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
export class InstaLikedContentComponent extends SequenceComponentInit implements AfterViewInit{

  @Input()
  previewMode = false;

  readonly color: string = "#DD2A7B";

  liked_comments_with_count: InstaLikedCommentsWithCount[] = [];
  liked_posts_with_count: InstaLikedPostsWithCount[] = [];
  liked_comments_amount=0;
  liked_posts_amount=0;

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

  constructor(private instaLikedCommentsRepo: InstaLikedCommentsRepository, 
    private instaLikedPostsRepo: InstaLikedPostsRepository,
    private notificationService: NotificationService) {
    super();
  }

  /**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Mayank (mayank@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

  /**
  *
  * @author: Mayank (mayank@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 5: Liked Comments and Posts");
    
    // Fetch Count and Table Data for Liked Comments from Database
    await this.instaLikedCommentsRepo.getLikedCommentsInfo().then((liked_comments) => {
      this.liked_comments_amount = liked_comments.length;
      this.liked_comments = liked_comments;
      this.listOfLikedComments = [...liked_comments]
    });

    // Fetch Count and Table Data for Liked Posts from Database
    await this.instaLikedPostsRepo.getLikedPostsInfo().then((liked_posts) => {
      this.liked_posts_amount = liked_posts.length;
      this.liked_posts = liked_posts;
      this.listOfLikedPosts = [...liked_posts]
    });

    // Fetch data for Graph for Liked Comments from Database
    await this.instaLikedCommentsRepo.getLikedCommentsWithCount().then((liked_comments_with_count) => {
      this.liked_comments_with_count = liked_comments_with_count;
      this.userListForComments = this.fetchUsernames(liked_comments_with_count)
      this.userListForComments.unshift("None");
      this.makeBarChart(liked_comments_with_count,".bar_chart_liked_comments");
    });

    // Fetch data for Graph for Liked Posts from Database
    await this.instaLikedPostsRepo.getLikedPostsWithCount().then((liked_posts_with_count) => {
      this.liked_posts_with_count = liked_posts_with_count;
      this.userListForPosts = this.fetchUsernames(liked_posts_with_count);
      this.userListForPosts.unshift("None");
      this.makeBarChart(liked_posts_with_count,".bar_chart_liked_posts");
    });

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
      //this.notificationService.showNotification("You did not liked any comment in the selected filter options.");
      return;
    }

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 50, left: 100},
      width = (460 - margin.left - margin.right)/2,
      height = ((data.length + 5) * 15) - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(divId)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // create tooltip
    const tooltip = d3.select(divId)
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");

    // add X axis
    const xScale = d3.scaleLinear()
      .domain([0, this.getMaxCounts(data)])
      .range([0, width]);

    let xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    if(this.getMaxCounts(data) < 10) {
      xAxis = xAxis
      .tickValues(d3.range(0, this.getMaxCounts(data)+1))
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
      .attr("x", xScale(0) )
      .attr("y", d => yScale(d.user))
      .attr("width", d => xScale(d.counts))
      .attr("height", yScale.bandwidth())
      .attr("fill", this.color)

      //Mouse Hover
      .on("mouseover", function (event, data) {
        tooltip.html(data.counts.toString()).style("visibility", "visible");
      })
      //Mouse moved: change tooltip position
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .on("mousemove", function (event) {
        tooltip
          .style("top", (screenY) + "px")
          .style("left", (screenX) + "px");
      })
      //Mouse not hovering: hide tooltip
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
      });

      if(divId == ".bar_chart_liked_comments") {
        svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Number of comments liked per user");
      }
      else if (divId == ".bar_chart_liked_posts") {
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
    arr.forEach(function(item) {
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
}
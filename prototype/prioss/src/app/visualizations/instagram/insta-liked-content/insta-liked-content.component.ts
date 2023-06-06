import { Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import * as d3 from 'd3';
import {NotificationService} from "../../../notification/notification.component";

import { InstaLikedCommentsRepository } from 'src/app/db/data-repositories/instagram/insta-liked-content/insta-likedcomments.repository';
import { InstaLikedPostsRepository } from 'src/app/db/data-repositories/instagram/insta-liked-content/insta-likedposts.repository';
import { InstaLikedCommentsWithCount } from 'src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedCommentsWithCount';
import { InstaLikedPostsWithCount } from 'src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedPostsWithCount';



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
export class InstaLikedContentComponent extends SequenceComponentInit {

  @Input()
  previewMode: boolean = false;

  readonly color: string = "#DD2A7B";

  liked_comments: InstaLikedCommentsWithCount[] = [];
  liked_posts: InstaLikedPostsWithCount[] = [];
  liked_comments_amount: number=0;
  liked_posts_amount: number=0;

  filterFromDateForComments: Date | null;
  filterToDateForComments: Date | null;
  public userListForComments: any[] = [];
  selectedUserForComments: string = "None";

  filterFromDateForPosts: Date | null;
  filterToDateForPosts: Date | null;
  public userListForPosts: any[] = [];
  selectedUserForPosts: string = "None";

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
    console.log("--- Initializing Component 6: Liked Comments and Posts");
    
    await this.instaLikedCommentsRepo.getLikedCommentsInfo().then((liked_comments) => {
      this.liked_comments_amount = liked_comments.length;
    });

    await this.instaLikedCommentsRepo.getLikedCommentsWithCount().then((liked_comments_with_count) => {
      this.liked_comments = liked_comments_with_count;
      this.userListForComments = this.fetchUsernames(liked_comments_with_count)
      this.userListForComments.unshift("None");
      this.makeBarChart(liked_comments_with_count,".bar_chart_liked_comments");
    });

    this.filterFromDateForComments = await this.instaLikedCommentsRepo.getLikedCommentsFirstDate();
    this.filterToDateForComments = await this.instaLikedCommentsRepo.getLikedCommentsLastDate();

    await this.instaLikedPostsRepo.getLikedPostsInfo().then((liked_posts) => {
      this.liked_posts_amount = liked_posts.length;
    });

    await this.instaLikedPostsRepo.getLikedPostsWithCount().then((liked_posts_with_count) => {
      this.liked_posts = liked_posts_with_count;
      this.userListForPosts = this.fetchUsernames(liked_posts_with_count);
      this.userListForPosts.unshift("None");
      this.makeBarChart(liked_posts_with_count,".bar_chart_liked_posts");
    });

    this.filterFromDateForPosts = await this.instaLikedPostsRepo.getLikedPostsFirstDate();
    this.filterToDateForPosts = await this.instaLikedPostsRepo.getLikedPostsLastDate();

  }

  /**
   * This callback method is called when the user changes the date using the datepicker
   *
   * @author: Mayank (mayank@mail.upb.de)
   *
   */
  onDateFilterChangeForComment() {
    if (this.filterFromDateForComments !== null && this.filterToDateForComments !== null) {
      if (this.filterFromDateForComments <= this.filterToDateForComments) {
        if(this.selectedUserForComments == "None") {
          this.instaLikedCommentsRepo.filterLikedCommentsBasedOnDate(
            this.filterFromDateForComments,this.filterToDateForComments).then((liked_comments_with_count) => {
              this.liked_comments = liked_comments_with_count;
              this.userListForComments = this.fetchUsernames(liked_comments_with_count)
              this.userListForComments.unshift("None");
              this.makeBarChart(liked_comments_with_count,".bar_chart_liked_comments");
          });
        } 
        else {
          this.instaLikedCommentsRepo.filterLikedCommentsBasedOnUserAndDate(
            this.selectedUserForComments, this.filterFromDateForComments,
            this.filterToDateForComments).then((liked_comments_with_count) => {
              this.liked_comments = liked_comments_with_count;
              this.userListForComments = this.fetchUsernames(liked_comments_with_count)
              this.userListForComments.unshift("None");
              this.makeBarChart(liked_comments_with_count,".bar_chart_liked_comments");
          });
        }
      } else {
        this.notificationService.showNotification("The To Date is before the From Date. Please correct this.");
      }
    }
  }

  /**
   * This callback method is called when the user changes the date using the datepicker
   *
   * @author: Mayank (mayank@mail.upb.de)
   *
   */
  onDateFilterChangeForPost() {
    if (this.filterFromDateForPosts !== null && this.filterToDateForPosts !== null) {
      if (this.filterFromDateForPosts <= this.filterToDateForPosts) {
        if(this.selectedUserForPosts == "None") {
          this.instaLikedPostsRepo.filterLikedPostsBasedOnDate(
            this.filterFromDateForPosts,this.filterToDateForPosts).then((liked_posts_with_count) => {
              this.liked_posts = liked_posts_with_count;
              this.userListForPosts = this.fetchUsernames(liked_posts_with_count)
              this.userListForPosts.unshift("None");
              this.makeBarChart(liked_posts_with_count,".bar_chart_liked_posts");
          });
        } 
        else {
          this.instaLikedPostsRepo.filterLikedPostsBasedOnUserAndDate(
            this.selectedUserForPosts, this.filterFromDateForPosts,
            this.filterToDateForPosts).then((liked_posts_with_count) => {
              this.liked_posts = liked_posts_with_count;
              this.userListForPosts = this.fetchUsernames(liked_posts_with_count)
              this.userListForPosts.unshift("None");
              this.makeBarChart(liked_posts_with_count,".bar_chart_liked_posts");
          });
        }
      } else {
        this.notificationService.showNotification("The To Date is before the From Date. Please correct this.");
      }
    }
  }

  /**
   * This method is used to change data based on user selected for liked comments
   * 
   * @author: Mayank (mayank@mail.upb.de)
   */
  onUserChangeForComment() {
    if(this.selectedUserForComments == "None") {
      this.makeBarChart(this.liked_comments,".bar_chart_liked_comments");
    } 
    else {
      for(let i = 0; i < this.liked_comments.length; i++) {
        if(this.liked_comments[i].user == this.selectedUserForComments) {
          this.makeBarChart([this.liked_comments[i]],".bar_chart_liked_comments");
        }
      }
    }
  }

  /**
   * This method is used to change data based on user selected for liked posts
   * 
   * @author: Mayank (mayank@mail.upb.de)
   */
  onUserChangeForPost() {
    if(this.selectedUserForPosts == "None") {
      this.makeBarChart(this.liked_posts,".bar_chart_liked_posts");
    } 
    else {
      for(let i = 0; i < this.liked_posts.length; i++) {
        if(this.liked_posts[i].user == this.selectedUserForPosts) {
          this.makeBarChart([this.liked_posts[i]],".bar_chart_liked_posts");
        }
      }
    }
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
      width = 460 - margin.left - margin.right,
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
      .domain([0, this.getMaxCounts(data)]) // maximum
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var yScale: any = d3.scaleBand()
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
        data.user;
        tooltip.html(data.counts.toString()).style("visibility", "visible");
      })
      //Mouse moved: change tooltip position
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      //Mouse not hovering: hide tooltip
      .on("mouseout", function () {
        "";
        tooltip.html(``).style("visibility", "hidden");
      });

      if(divId == ".bar_chart_liked_comments") {
        svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Number of comments liked per user");
      }
      else if (divId == "bar_chart_liked_posts") {
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
    var maxCount = 0;
    arr.forEach(function(item) {
      if (item.counts > maxCount) {
        maxCount = item.counts;
      }
    });
    return maxCount;
  }
}
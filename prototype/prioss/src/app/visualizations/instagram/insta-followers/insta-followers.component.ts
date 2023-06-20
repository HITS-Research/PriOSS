import { Component, Input } from '@angular/core';
import cytoscape from 'cytoscape';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';

import { InstaFollowerInfo } from 'src/app/models/Instagram/FollowerInfo/FollowerInfo';
import { InstaFollowingInfo } from 'src/app/models/Instagram/FollowerInfo/FollowingInfo';
import { InstaBlockedInfo } from 'src/app/models/Instagram/FollowerInfo/BlockedInfo';
import { InstaFollowerRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-follower.repository';
import { InstaFollowingRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-following.repository';
import { InstaBlockedRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-blocked.repository';
import { InstaRecentFollowRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-recent-follow.repository';
import { InstaRecentFollowInfo } from 'src/app/models/Instagram/FollowerInfo/RecentFollow';
import { InstaPendingFollowRequestInfo } from 'src/app/models/Instagram/FollowerInfo/PendingFollowRequestInfo';
import { InstaPendingFollowRequestRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-pending-follow-request.repository';
import { InstaRecentlyUnfollowedInfo } from 'src/app/models/Instagram/FollowerInfo/RecentlyUnfollowedAccounts';
import { InstaRecentlyUnfollowedAccountsRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-recently-unfollowed-accounts.repository';
import { InstaRemovedSuggestionRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-removed-suggestion.repository';
import { InstaRemovedSuggestionInfo } from 'src/app/models/Instagram/FollowerInfo/RemovedSuggestion';
import { InstaReceivedFollowRequestRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-received-follow-request.repository';
import { InstaReceivedFollowRequestInfo } from 'src/app/models/Instagram/FollowerInfo/ReceivedFollowRequest';

/**
  * This component is the visualization component on instagram's dashboard page.
  * This page is shown follower and following information on instagram's dashboard.
  *
  * @author: Melina (kleber@mail.uni-paderborn.de)
  */
@Component({
  selector: 'app-insta-followers',
  templateUrl: './insta-followers.component.html',
  styleUrls: ['./insta-followers.component.less']
})

export class InstaFollowersComponent extends SequenceComponentInit{
  @Input()
  previewMode: boolean = false;

  followerInfo: InstaFollowerInfo[] = [];
  followingInfo: InstaFollowingInfo[] = [];
  blockedInfo: InstaBlockedInfo[] = [];
  recentFollowInfo: InstaRecentFollowInfo[] = [];
  pendingFollowRequestInfo: InstaPendingFollowRequestInfo[] = [];
  recentlyUnfollowedAccountInfo: InstaRecentlyUnfollowedInfo[] = [];
  removedSuggestionInfo : InstaRemovedSuggestionInfo[] = [];
  receivedFollowRequestInfo : InstaReceivedFollowRequestInfo[] = [];
  graphElements: {
    data: { id?: string; source?: string; target?: string };
  }[] = [];

  graphOptions = ['Followers', 'Following'];
  selectedTags: string[] = ['Followers', 'Following'];

  // Default page configuration for Follower / Following
  currentFollowerPage = 1;
  currentFollowingPage = 1;
  currentBlockedPage = 1;
  currentRecentFollowPage = 1;
  currentPendingFollowRequestPage = 1;
  currentRecentlyUnfollowedAccountsPage = 1;
  currentRemovedSuggestionPage = 1;
  currentReceivedFollowRequestPage = 1;
  pageSize = 10;

  cy: cytoscape.Core;

  constructor(
    private instaFollowerRepo: InstaFollowerRepository,
    private instaFollowingRepo: InstaFollowingRepository,
    private instaBlockedRepo: InstaBlockedRepository,
    private instaRecentFollowRepo: InstaRecentFollowRepository,
    private instaPendingFollowRequestRepo: InstaPendingFollowRequestRepository,
    private instaRecentlyUnfollowedAccountsRepo: InstaRecentlyUnfollowedAccountsRepository,
    private instaRemovedSuggestionRepo: InstaRemovedSuggestionRepository,
    private instaReceivedFollowRequestRepo: InstaReceivedFollowRequestRepository
  ) {
    super();
  }

  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async collectData() {
    this.followerInfo = await this.instaFollowerRepo.getFollowerInfo();
    await this.instaFollowerRepo.getFollowerInfo().then((followerInfo) => {
      this.followerInfo = followerInfo;
    });
    this.followingInfo = await this.instaFollowingRepo.getFollowingInfo();
    await this.instaFollowingRepo.getFollowingInfo().then((followingInfo) => {
      this.followingInfo = followingInfo;
    });
    this.blockedInfo = await this.instaBlockedRepo.getBlockedInfo();
    await this.instaBlockedRepo.getBlockedInfo().then((blockedInfo) => {
      this.blockedInfo = blockedInfo;
    });
    this.recentFollowInfo = await this.instaRecentFollowRepo.getRecentFollowInfo();
    await this.instaRecentFollowRepo.getRecentFollowInfo().then((recentFollowInfo) => {
      this.recentFollowInfo = recentFollowInfo;
    });
    this.pendingFollowRequestInfo = await this.instaPendingFollowRequestRepo.getPendingFollowRequestInfo();
    await this.instaPendingFollowRequestRepo.getPendingFollowRequestInfo().then((pendingFollowRequestInfo) => {
      this.pendingFollowRequestInfo = pendingFollowRequestInfo;
    });
    this.recentlyUnfollowedAccountInfo = await this.instaRecentlyUnfollowedAccountsRepo.getRecentlyUnfollowedAccountInfo();
    await this.instaRecentlyUnfollowedAccountsRepo.getRecentlyUnfollowedAccountInfo().then((recentlyUnfollowedAccountInfo) => {
      this.recentlyUnfollowedAccountInfo = recentlyUnfollowedAccountInfo;
    });
    this.removedSuggestionInfo = await this.instaRemovedSuggestionRepo.getRemovedSuggestionInfo();
    await this.instaRemovedSuggestionRepo.getRemovedSuggestionInfo().then((removedSuggestionInfo) => {
      this.removedSuggestionInfo = removedSuggestionInfo;
    });
    this.receivedFollowRequestInfo = await this.instaReceivedFollowRequestRepo.getReceivedFollowRequestInfo();
    await this.instaReceivedFollowRequestRepo.getReceivedFollowRequestInfo().then((receivedFollowRequestInfo) => {
      this.receivedFollowRequestInfo = receivedFollowRequestInfo;
    });
  }

  /**
   * Prepare the follower/following information for the graph representation. Means changing the format of the representation of this information.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  prepareGraphData() {
    //Creates a set of nodes for the star-pattern
    const nodes = new Set<string>();
    if (this.selectedTags.includes('Followers')) {
      this.followerInfo.forEach((follower) =>
        nodes.add(follower.instaAccountName)
      );
    }
    if (this.selectedTags.includes('Following')) {
      this.followingInfo.forEach((following) =>
        nodes.add(following.instaAccountName)
      );
    }
    //Gives every node their position in the cycle and add the nodes to the graphElement array
    this.graphElements = [...nodes].map((node, index) => ({
      data: {
        id: node,
      }
    }));

    //adds the users node to the array and fix his position into the center
    const you = 'you';
    this.graphElements.push({
      data: {
        id: you,
      }
    });
    //Add the edges between the user to its followers
    if (this.selectedTags.includes('Followers')) {
      this.followerInfo.forEach((follower) => {
        this.graphElements.push({
          data: {
            source: follower.instaAccountName,
            target: you,
          },
        });
      });
    }
    //Add the edges between the user to its following users
    if (this.selectedTags.includes('Following')) {
      this.followingInfo.forEach((following) => {
        this.graphElements.push({
          data: {
            source: you,
            target: following.instaAccountName,
          },
        });
      });
    }
  }

  /**
   * Update the graphElements and apply the layout again
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  updateGraph() {
    this.prepareGraphData();
    this.cy.elements().remove();
    this.cy.add(this.graphElements);
    this.cy.layout(({name:'circle', padding:30, fit:true})).run();
  }

  initGraph(){
    console.log("Enter init graph");
    console.log(document.getElementById('cy'));
    var container = document.getElementById('cy'); // container to render in
    this.cy = cytoscape({
      container, 
      elements: this.graphElements,
      style: [
        // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(id)',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],
      layout: {
        name: 'circle',
        padding: 30,
        fit: true
      },
    });
  }

  /**
   * Builds the graph for the followers and following accounts.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async ngAfterViewInit() {
    if(!this.previewMode) {
      await this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 4: FollowerInfo");
    await this.collectData();
    this.prepareGraphData();
    this.initGraph();
  }

  //Getter

  /**
   * This method slice a dataset for the tables in 10 entrys per page
   *
   * @param data the dataset that sould be sliced
   * @param currentPage the current page of the dataset
   * @returns the sliced data
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  getSlicedData(data: Array<any>, currentPage: number) {
    const start = (currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return data.slice(start, end);
  }

  get sliced_follower_data() {
    return this.getSlicedData(this.followerInfo, this.currentFollowerPage);
  }

  get sliced_following_data() {
    return this.getSlicedData(this.followingInfo, this.currentFollowingPage);
  }

  get sliced_blocked_data() {
    return this.getSlicedData(this.blockedInfo, this.currentBlockedPage);
  }

  get sliced_recent_follow_data() {
    return this.getSlicedData(this.recentFollowInfo, this.currentRecentFollowPage);
  }

  get sliced_pending_follow_request_data() {
    return this.getSlicedData(this.pendingFollowRequestInfo, this.currentPendingFollowRequestPage);
  }

  get sliced_recently_unfollowed_account_data() {
    return this.getSlicedData(this.recentlyUnfollowedAccountInfo, this.currentRecentlyUnfollowedAccountsPage);
  }

  get sliced_removed_suggestion_data() {
    return this.getSlicedData(this.removedSuggestionInfo, this.currentRemovedSuggestionPage);
  }

  get sliced_received_follow_request_data() {
    return this.getSlicedData(this.receivedFollowRequestInfo, this.currentReceivedFollowRequestPage);
  }

  //Event Handler

  // Changing the page number based on user selection
  on_follower_page_change(event: any) {
    this.currentFollowerPage = event;
  }

  // Changing the page number based on user selection
  on_following_page_change(event: any) {
    this.currentFollowingPage = event;
  }

  // Changing the page number based on user selection
  on_blocked_page_change(event: any) {
    this.currentBlockedPage = event;
  }

  // Changing the page number based on user selection
  on_recent_follow_page_change(event: any) {
    this.currentRecentFollowPage = event;
  }

  // Changing the page number based on user selection
  on_pending_follow_request_page_change(event: any) {
    this.currentPendingFollowRequestPage = event;
  }

   // Changing the page number based on user selection
   on_recently_unfollowed_account_page_change(event: any) {
    this.currentRecentlyUnfollowedAccountsPage = event;
  }

   // Changing the page number based on user selection
   on_removed_suggestion_page_change(event: any) {
    this.currentRemovedSuggestionPage = event;
  }
  
  // Changing the page number based on user selection
  on_received_follow_request_page_change(event: any) {
    this.currentReceivedFollowRequestPage = event;
  }

  on_graph_page_enter(){
    console.log("Enter event method");
    //this.cy.destroy();
    //this.cy.unmount();
    setTimeout(function() {
      var element = document.getElementById("yourElementId");
      // Do something with the element
    }, 1000); // Delayed for 1 second (adjust as needed)
    
    console.log(document.getElementById('cy'));
    this.initGraph();
    this.updateGraph();
  }

  /**
   * Updates the selected Tags that are used for filtering what graph elements are used
   *
   */
  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    }
    this.updateGraph();
  }
}

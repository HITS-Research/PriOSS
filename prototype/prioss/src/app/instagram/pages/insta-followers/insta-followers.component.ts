import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import cytoscape from 'cytoscape';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';

import {InstaFollowerInfo} from 'src/app/instagram/models/FollowerInfo/FollowerInfo';
import {InstaFollowingInfo} from 'src/app/instagram/models/FollowerInfo/FollowingInfo';
import {InstaBlockedInfo} from 'src/app/instagram/models/FollowerInfo/BlockedInfo';
import {InstaRecentFollowInfo} from 'src/app/instagram/models/FollowerInfo/RecentFollow';
import {InstaPendingFollowRequestInfo} from 'src/app/instagram/models/FollowerInfo/PendingFollowRequestInfo';
import {InstaRecentlyUnfollowedInfo} from 'src/app/instagram/models/FollowerInfo/RecentlyUnfollowedAccounts';
import {InstaRemovedSuggestionInfo} from 'src/app/instagram/models/FollowerInfo/RemovedSuggestion';
import {InstaReceivedFollowRequestInfo} from 'src/app/instagram/models/FollowerInfo/ReceivedFollowRequest';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";

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

export class InstaFollowersComponent extends SequenceComponentInit implements AfterViewInit, OnInit {
  @Input()
  previewMode = false;
  followVisible = false;
  pendingFollowVisible = false;
  receivedVisible = false;
  requestVisible = false;
  blockedVisible = false;
  recentUnfollowVisible = false;
  removedVisible = false;

  followerSearchValue = '';
  followingSearchValue = '';
  blockedSearchValue = '';
  recentFollowSearchValue = '';
  pendingSearchValue = '';
  recentUnfollowSearchValue = '';
  removedSearchValue = '';
  receivedSearchValue = '';

  sortFollowerDate = (a: InstaFollowerInfo, b: InstaFollowerInfo): number => +a.timestamp - +b.timestamp;
  sortFollowingDate = (a: InstaFollowingInfo, b: InstaFollowingInfo): number => +a.timestamp - +b.timestamp;
  sortBlockedDate = (a: InstaBlockedInfo, b: InstaBlockedInfo): number => +a.timestamp - +b.timestamp;
  sortRecentFollowDate = (a: InstaRecentFollowInfo, b: InstaRecentFollowInfo): number => +a.timestamp - +b.timestamp;
  sortPendingDate = (a: InstaPendingFollowRequestInfo, b: InstaPendingFollowRequestInfo): number => +a.timestamp - +b.timestamp;
  sortRecentUnfollowDate = (a: InstaRecentlyUnfollowedInfo, b: InstaRecentlyUnfollowedInfo): number => +a.timestamp - +b.timestamp;
  sortRemovedDate = (a: InstaRemovedSuggestionInfo, b: InstaRemovedSuggestionInfo): number => +a.timestamp - +b.timestamp;
  sortReceivedDate = (a: InstaReceivedFollowRequestInfo, b: InstaReceivedFollowRequestInfo): number => +a.timestamp - +b.timestamp;


  followerInfo: InstaFollowerInfo[] = [];
  listOfFollowers: InstaFollowerInfo[] = [];
  followingInfo: InstaFollowingInfo[] = [];
  listOfFollowing: InstaFollowingInfo[] = [];
  blockedInfo: InstaBlockedInfo[] = [];
  listOfBlocked: InstaBlockedInfo[] = [];
  recentFollowInfo: InstaRecentFollowInfo[] = [];
  listOfRecentFollow: InstaRecentFollowInfo[] = [];
  pendingFollowRequestInfo: InstaPendingFollowRequestInfo[] = [];
  listOfPending: InstaPendingFollowRequestInfo[] = [];
  recentlyUnfollowedInfo: InstaRecentlyUnfollowedInfo[] = [];
  listOfRecentUnfollow: InstaRecentlyUnfollowedInfo[] = [];
  removedSuggestionInfo: InstaRemovedSuggestionInfo[] = [];
  listOfRemoved: InstaRemovedSuggestionInfo[] = [];
  receivedFollowRequestInfo: InstaReceivedFollowRequestInfo[] = [];
  listOfReceived: InstaReceivedFollowRequestInfo[] = [];

  graphElements: {
    data: { id?: string; source?: string; target?: string };
  }[] = [];

  graphOptions = ['Followers', 'Following'];
  selectedTags: string[] = ['Followers', 'Following'];

  cy: cytoscape.Core;

  constructor(
    private store: Store
  ) {
    super();
  }

  ngOnInit() {
    Object.assign(this, {...this.store.selectSnapshot(InstaState.getSocialConnectionsData)});
      this.listOfFollowers = [...this.followerInfo];
      this.listOfFollowing = [...this.followingInfo];
      this.listOfBlocked = [...this.blockedInfo];
      this.listOfRecentFollow = [...this.recentFollowInfo];
      this.listOfPending = [...this.pendingFollowRequestInfo];
      this.listOfRecentUnfollow = [...this.recentlyUnfollowedInfo];
      this.listOfRemoved = [...this.removedSuggestionInfo];
      this.listOfReceived = [...this.receivedFollowRequestInfo];
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
    this.graphElements = [...nodes].map((node) => ({
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
    this.cy.layout(({name: 'circle', padding: 30, fit: true})).run();
  }

  initGraph() {
    const container = document.getElementById('cy'); // container to render in
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
    if (!this.previewMode) {
      await this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 3: FollowerInfo");
    await this.delay(10);
    this.prepareGraphData();
    this.initGraph();
    this.updateGraph();
  }

  /**
   * This function adds a small delay in loading the graph when enter the tab again.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async on_graph_page_enter() {
    while (!document.getElementById("cy")) {
      await this.delay(100);
    }
    this.initGraph();
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

  /**
   * Resets the given searchvalue.
   *
   * @param searchList the list that should be resetted.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  reset(searchList: string): void {
    switch (searchList) {
      case 'follower':
        this.followerSearchValue = '';
        break;
      case 'following':
        this.followingSearchValue = '';
        break;
      case 'blocked':
        this.blockedSearchValue = '';
        break;
      case 'recentFollow':
        this.recentFollowSearchValue = '';
        break;
      case 'pending':
        this.pendingSearchValue = '';
        break;
      case 'recentUnfollow':
        this.recentUnfollowSearchValue = '';
        break;
      case 'removed':
        this.removedSearchValue = '';
        break;
      case 'received':
        this.receivedSearchValue = '';
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
    this.followVisible = false;
    this.requestVisible = false;
    this.blockedVisible = false;
    this.recentUnfollowVisible = false;
    this.removedVisible = false;
    this.pendingFollowVisible = false;
    this.receivedVisible = false;

    switch (searchList) {
      case 'follower':
        this.listOfFollowers = this.followerInfo.filter((item: InstaFollowerInfo) => item.instaAccountName.toLowerCase().indexOf(this.followerSearchValue.toLowerCase()) !== -1)
        break;
      case 'following':
        this.listOfFollowing = this.followingInfo.filter((item: InstaFollowingInfo) => item.instaAccountName.toLowerCase().indexOf(this.followingSearchValue.toLowerCase()) !== -1)
        break;
      case 'blocked':
        this.listOfBlocked = this.blockedInfo.filter((item: InstaBlockedInfo) => item.instaAccountName.toLowerCase().indexOf(this.blockedSearchValue.toLowerCase()) !== -1)
        break;
      case 'recentFollow':
        this.listOfRecentFollow = this.recentFollowInfo.filter((item: InstaRecentFollowInfo) => item.instaAccountName.toLowerCase().indexOf(this.recentFollowSearchValue.toLowerCase()) !== -1)
        break;
      case 'pending':
        this.listOfPending = this.pendingFollowRequestInfo.filter((item: InstaPendingFollowRequestInfo) => item.instaAccountName.toLowerCase().indexOf(this.pendingSearchValue.toLowerCase()) !== -1)
        break;
      case 'recentUnfollow':
        this.listOfRecentUnfollow = this.recentlyUnfollowedInfo.filter((item: InstaRecentlyUnfollowedInfo) => item.instaAccountName.toLowerCase().indexOf(this.recentUnfollowSearchValue.toLowerCase()) !== -1)
        break;
      case 'removed':
        this.listOfRemoved = this.removedSuggestionInfo.filter((item: InstaRemovedSuggestionInfo) => item.instaAccountName.toLowerCase().indexOf(this.removedSearchValue.toLowerCase()) !== -1)
        break;
      case 'received':
        this.listOfReceived = this.receivedFollowRequestInfo.filter((item: InstaReceivedFollowRequestInfo) => item.instaAccountName.toLowerCase().indexOf(this.receivedSearchValue.toLowerCase()) !== -1)
        break;
      default:
        break;
    }
  }

  /**
   * Introduces a delay to ensure proper rendering of the graph.
   * The delay is needed to allow time for obtaining the required 'div' element
   * for placing the graph. This ensures a smooth and accurate initialization process.
   * @returns {Promise<void>}
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

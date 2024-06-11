import {AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { EChartsOption } from 'echarts';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';

import { InstaFollowerInfo } from 'src/app/instagram/models/FollowerInfo/FollowerInfo';
import { InstaFollowingInfo } from 'src/app/instagram/models/FollowerInfo/FollowingInfo';
import { InstaBlockedInfo } from 'src/app/instagram/models/FollowerInfo/BlockedInfo';
import { InstaRecentFollowInfo } from 'src/app/instagram/models/FollowerInfo/RecentFollow';
import { InstaPendingFollowRequestInfo } from 'src/app/instagram/models/FollowerInfo/PendingFollowRequestInfo';
import { InstaRecentlyUnfollowedInfo } from 'src/app/instagram/models/FollowerInfo/RecentlyUnfollowedAccounts';
import { InstaRemovedSuggestionInfo } from 'src/app/instagram/models/FollowerInfo/RemovedSuggestion';
import { InstaReceivedFollowRequestInfo } from 'src/app/instagram/models/FollowerInfo/ReceivedFollowRequest';
import { Store } from "@ngxs/store";
import { InstaState } from "../../state/insta.state";

@Component({
  selector: 'app-insta-followers',
  templateUrl: './insta-followers.component.html',
  styleUrls: ['./insta-followers.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  graphOptions = ['Followers', 'Following'];
  selectedTags: string[] = ['Followers', 'Following'];
  chartOptions: EChartsOption = {};

  private chartInstance: any;

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
    this.prepareChartOptions();
  }

  ngAfterViewInit() {
    this.initComponent();
  }

  async initComponent(): Promise<void> {
    this.prepareChartOptions();
  }

  prepareChartOptions() {
    const uniqueNodesMap = new Map<string, { name: string, category: string }>();
    const links: { source: string, target: string }[] = [];

    if (this.selectedTags.includes('Followers')) {
      this.followerInfo.forEach(f => {
        if (!uniqueNodesMap.has(f.instaAccountName)) {
          uniqueNodesMap.set(f.instaAccountName, { name: f.instaAccountName, category: 'Follower' });
        }
        links.push({ source: 'you', target: f.instaAccountName });
      });
    }

    if (this.selectedTags.includes('Following')) {
      this.followingInfo.forEach(f => {
        if (!uniqueNodesMap.has(f.instaAccountName)) {
          uniqueNodesMap.set(f.instaAccountName, { name: f.instaAccountName, category: 'Following' });
        }
        links.push({ source: 'you', target: f.instaAccountName });
      });
    }

    const nodes = [{ name: 'you' }, ...Array.from(uniqueNodesMap.values())];

    this.chartOptions = {
      tooltip: {},
      legend: {
        data: ['Follower', 'Following']
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        categories: [{ name: 'Follower' }, { name: 'Following' }],
        roam: true,
        label: {
          show: true,
          position: 'right',
          fontSize: 12,
          formatter: '{b}'
        },
        force: {
          repulsion: 250,
          edgeLength: [30, 150]
        },
        lineStyle: {
          color: 'source',
          curveness: 0.2
        },
      }],
      animationDurationUpdate: 200,
      animationEasingUpdate: 'quinticInOut',
      // Adding event for click
      on: {
        'click': function (params:any) {

          console.log(params);
          if (params['dataType'] === 'node') {
            alert('Node clicked: ' + params.data.name);
            // You can add more functionality here
          }
        }
      }
    };
  }

  onGraphPageEnter() {
    this.prepareChartOptions();
  }

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.prepareChartOptions();
  }

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
        this.listOfFollowers = this.followerInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.followerSearchValue.toLowerCase()));
        break;
      case 'following':
        this.listOfFollowing = this.followingInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.followingSearchValue.toLowerCase()));
        break;
      case 'blocked':
        this.listOfBlocked = this.blockedInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.blockedSearchValue.toLowerCase()));
        break;
      case 'recentFollow':
        this.listOfRecentFollow = this.recentFollowInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.recentFollowSearchValue.toLowerCase()));
        break;
      case 'pending':
        this.listOfPending = this.pendingFollowRequestInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.pendingSearchValue.toLowerCase()));
        break;
      case 'recentUnfollow':
        this.listOfRecentUnfollow = this.recentlyUnfollowedInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.recentUnfollowSearchValue.toLowerCase()));
        break;
      case 'removed':
        this.listOfRemoved = this.removedSuggestionInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.removedSearchValue.toLowerCase()));
        break;
      case 'received':
        this.listOfReceived = this.receivedFollowRequestInfo.filter(item => item.instaAccountName.toLowerCase().includes(this.receivedSearchValue.toLowerCase()));
        break;
      default:
        break;
    }
  }

  onPageChange(listType: string, pageIndex: number): void {
    const pageSize = 10;
    switch (listType) {
      case 'follower':
        this.listOfFollowers = this.paginate(this.followerInfo, pageIndex, pageSize);
        break;
      case 'following':
        this.listOfFollowing = this.paginate(this.followingInfo, pageIndex, pageSize);
        break;
      case 'blocked':
        this.listOfBlocked = this.paginate(this.blockedInfo, pageIndex, pageSize);
        break;
      case 'recentFollow':
        this.listOfRecentFollow = this.paginate(this.recentFollowInfo, pageIndex, pageSize);
        break;
      case 'pending':
        this.listOfPending = this.paginate(this.pendingFollowRequestInfo, pageIndex, pageSize);
        break;
      case 'recentUnfollow':
        this.listOfRecentUnfollow = this.paginate(this.recentlyUnfollowedInfo, pageIndex, pageSize);
        break;
      case 'removed':
        this.listOfRemoved = this.paginate(this.removedSuggestionInfo, pageIndex, pageSize);
        break;
      case 'received':
        this.listOfReceived = this.paginate(this.receivedFollowRequestInfo, pageIndex, pageSize);
        break;
      default:
        break;
    }
  }

  paginate(array: any[], pageIndex: number, pageSize: number): any[] {
    const start = (pageIndex - 1) * pageSize;
    return array.slice(start, start + pageSize);
  }

  clickHandler(nodeValue:string){
    if(nodeValue!=='you'){
      const username = nodeValue.split('>');
      window.open("https://www.instagram.com/"+(username.length>1?username[1]:username[0]).trim(),'_blank');
    }
  }
}

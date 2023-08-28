import { AfterViewInit, Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';


/**
  * This component is the visualization component on instagram's dashboard page.
  * This page is shown message information on instagram's dashboard.
  *
  * @author: Melina (kleber@mail.uni-paderborn.de)
  */
@Component({
  selector: 'app-insta-messages',
  templateUrl: './insta-messages.component.html',
  styleUrls: ['./insta-messages.component.less']
})
export class InstaMessagesComponent extends SequenceComponentInit implements AfterViewInit{
  @Input()
  previewMode = false;
  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async collectData() {
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
    if(!this.previewMode) {
      await this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 10: Messages");
    await this.collectData();
  }
}




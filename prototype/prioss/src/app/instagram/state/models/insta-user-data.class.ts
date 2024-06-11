import InstaUserDataModel from "./insta-user-data-model.interface";
import {
  InstaAccountInfo,
  InstaAdsActivityInfo,
  InstaAdsClickedInfo,
  InstaAdsInterestInfo,
  InstaAdsViewedInfo,
  InstaBasedInInfo,
  InstaBlockedInfo,
  InstaChatData,
  InstaContactInfo,
  InstaFollowerInfo,
  InstaFollowingInfo,
  InstaKeywordSearch,
  InstaLikedCommentsInfo,
  InstaLikedPostsInfo,
  InstaLoginInfo,
  InstaLogoutInfo,
  InstaPendingFollowRequestInfo,
  InstaPersonalInfo,
  InstaProfessionalInfo,
  InstaProfileChange,
  InstaReceivedFollowRequestInfo,
  InstaRecentFollowInfo,
  InstaRecentlyUnfollowedInfo,
  InstaRemovedSuggestionInfo,
  InstaShoppingInfo, InstaShoppingWishlistInfo, InstaSignUpInfo, InstaTagSearch, InstaTopicsInfo, InstaUserSearch
} from "../../models";
import InstaUserStoriesDataModel from "./insta-stories-data.interface";
import InstaUserPostsDataModel from "./insta-posts-data.interface";
import {InstaUserCommentsDataModel, InstaUserMessageDataModel} from "./index";

export class InstaUserData implements InstaUserDataModel {
  constructor(userData: InstaUserDataModel) {
    this.accountInfo = userData.accountInfo;
    this.adsActivityInfo = userData.adsActivityInfo || [];
    this.adsClickedInfo = userData.adsClickedInfo || [];
    this.adsInterestInfo = userData.adsInterestInfo || [];
    this.adsViewedInfo = userData.adsViewedInfo || [];
    this.basedInInfo = userData.basedInInfo;
    this.blockedInfo = userData.blockedInfo || [];
    this.chatData = userData.chatData || [];
    this.contactInfo = userData.contactInfo || [];
    this.followerInfo = userData.followerInfo || [];
    this.followingInfo = userData.followingInfo || [];
    this.keywordSearch = userData.keywordSearch || [];
    this.likedCommentsInfo = userData.likedCommentsInfo || [];
    this.likedPostsInfo = userData.likedPostsInfo || [];
    this.loginInfo = userData.loginInfo || [];
    this.logoutInfo = userData.logoutInfo || [];
    this.pendingFollowRequestInfo = userData.pendingFollowRequestInfo || [];
    this.personalInfo = userData.personalInfo;
    this.professionalInfo = userData.professionalInfo;
    this.profileChanges = userData.profileChanges || [];
    this.receivedFollowRequestInfo = userData.receivedFollowRequestInfo || [];
    this.recentFollowInfo = userData.recentFollowInfo || [];
    this.recentlyUnfollowedInfo = userData.recentlyUnfollowedInfo || [];
    this.removedSuggestionInfo = userData.removedSuggestionInfo || [];
    this.shoppingInfo = userData.shoppingInfo || [];
    this.shoppingWishlistInfo = userData.shoppingWishlistInfo || [];
    this.signUpInfo = userData.signUpInfo;
    this.tagSearch = userData.tagSearch || [];
    this.topicsInfo = userData.topicsInfo || [];
    this.userSearch = userData.userSearch || [];
    this.posts = userData.posts || [];
    this.stories = userData.stories || [];
    this.comments = userData.comments || [];
    this.messages = userData.messages || [];
    this.mediaFileInfo = userData.mediaFileInfo || new Map();
    this.updateProfilepic(userData.mediaFileInfo as Map<string, string>);
    // this.updateStoryMedia(userData.mediaFileInfo as Map<string, string>);
  }

  accountInfo: InstaAccountInfo;
  adsActivityInfo: InstaAdsActivityInfo[];
  adsClickedInfo: InstaAdsClickedInfo[];
  adsInterestInfo: InstaAdsInterestInfo[];
  adsViewedInfo: InstaAdsViewedInfo[];
  basedInInfo: InstaBasedInInfo;
  blockedInfo: InstaBlockedInfo[];
  chatData: InstaChatData[];
  contactInfo: InstaContactInfo[];
  followerInfo: InstaFollowerInfo[];
  followingInfo: InstaFollowingInfo[];
  keywordSearch: InstaKeywordSearch[];
  likedCommentsInfo: InstaLikedCommentsInfo[];
  likedPostsInfo: InstaLikedPostsInfo[];
  loginInfo: InstaLoginInfo[];
  logoutInfo: InstaLogoutInfo[];
  pendingFollowRequestInfo: InstaPendingFollowRequestInfo[];
  personalInfo: InstaPersonalInfo;
  professionalInfo: InstaProfessionalInfo;
  profileChanges: InstaProfileChange[];
  receivedFollowRequestInfo: InstaReceivedFollowRequestInfo[];
  recentFollowInfo: InstaRecentFollowInfo[];
  recentlyUnfollowedInfo: InstaRecentlyUnfollowedInfo[];
  removedSuggestionInfo: InstaRemovedSuggestionInfo[];
  shoppingInfo: InstaShoppingInfo[];
  shoppingWishlistInfo: InstaShoppingWishlistInfo[];
  signUpInfo: InstaSignUpInfo;
  tagSearch: InstaTagSearch[];
  topicsInfo: InstaTopicsInfo[];
  userSearch: InstaUserSearch[];
  stories:InstaUserStoriesDataModel[];
  posts:InstaUserPostsDataModel[];
  comments:InstaUserCommentsDataModel[];
  messages:InstaUserMessageDataModel[];
  mediaFileInfo: any;
  updateProfilepic(mediaFilemap:Map<string, string>){
    if(this.personalInfo.profilePic!=="error"){
      this.personalInfo.profilePic = mediaFilemap.get(this.personalInfo.profilePic)||"";
    }
  }

  updateStoryMedia(mediaFilemap:Map<string, string>){
    this.stories.forEach((story)=>{
      if(story.media && story.media.endsWith(".jpg")){
        story.media = mediaFilemap.get(story.media)||"";
      }else{
        story.media = "";
      }
    })
  }
}

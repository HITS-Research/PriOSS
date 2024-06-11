import {
    InstaAccountInfo,
    InstaAdsActivityInfo,
    InstaAdsClickedInfo,
    InstaAdsInterestInfo,
    InstaAdsViewedInfo,
    InstaBasedInInfo,
    InstaBlockedInfo, InstaChatData,
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
    InstaProfileChange, InstaReceivedFollowRequestInfo,
    InstaRecentFollowInfo,
    InstaRecentlyUnfollowedInfo, InstaRemovedSuggestionInfo,
    InstaShoppingInfo,
    InstaShoppingWishlistInfo,
    InstaSignUpInfo,
    InstaTagSearch, InstaTopicsInfo,
    InstaUserSearch, InstaContactInfo
} from "../../models";
import InstaUserStoriesDataModel from "./insta-stories-data.interface";
import InstaUserPostsDataModel from "./insta-posts-data.interface";
import {InstaUserCommentsDataModel, InstaUserMessageDataModel} from "./index";

export default interface InstaUserDataModel {
    personalInfo: InstaPersonalInfo;
    accountInfo: InstaAccountInfo;
    professionalInfo: InstaProfessionalInfo;
    basedInInfo: InstaBasedInInfo;
    profileChanges: InstaProfileChange[];
    adsInterestInfo: InstaAdsInterestInfo[];
    adsActivityInfo: InstaAdsActivityInfo[];
    adsClickedInfo: InstaAdsClickedInfo[];
    adsViewedInfo: InstaAdsViewedInfo[];
    signUpInfo: InstaSignUpInfo;
    loginInfo: InstaLoginInfo[];
    logoutInfo: InstaLogoutInfo[];
    likedCommentsInfo: InstaLikedCommentsInfo[];
    likedPostsInfo: InstaLikedPostsInfo[];
    contactInfo: InstaContactInfo[];
    userSearch: InstaUserSearch[];
    keywordSearch: InstaKeywordSearch[];
    tagSearch: InstaTagSearch[];
    topicsInfo: InstaTopicsInfo[];
    followerInfo: InstaFollowerInfo[];
    followingInfo: InstaFollowingInfo[];
    blockedInfo: InstaBlockedInfo[];
    pendingFollowRequestInfo: InstaPendingFollowRequestInfo[];
    recentlyUnfollowedInfo: InstaRecentlyUnfollowedInfo[];
    recentFollowInfo: InstaRecentFollowInfo[];
    removedSuggestionInfo: InstaRemovedSuggestionInfo[]
    receivedFollowRequestInfo: InstaReceivedFollowRequestInfo[];
    shoppingInfo: InstaShoppingInfo[];
    shoppingWishlistInfo: InstaShoppingWishlistInfo[];
    chatData: InstaChatData[];
    stories:InstaUserStoriesDataModel[];
    posts:InstaUserPostsDataModel[];
    comments:InstaUserCommentsDataModel[];
    messages:InstaUserMessageDataModel[];
    mediaFileInfo: any;
}


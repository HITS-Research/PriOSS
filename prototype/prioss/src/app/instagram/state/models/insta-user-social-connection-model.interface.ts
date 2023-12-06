import {
  InstaBlockedInfo,
  InstaFollowerInfo,
  InstaFollowingInfo,
  InstaPendingFollowRequestInfo, InstaReceivedFollowRequestInfo,
  InstaRecentFollowInfo,
  InstaRecentlyUnfollowedInfo, InstaRemovedSuggestionInfo

} from "../../models";

export default interface UserSocialConnectionModel{
  followerInfo: InstaFollowerInfo[];
  followingInfo: InstaFollowingInfo[];
  blockedInfo: InstaBlockedInfo[];
  recentFollowInfo: InstaRecentFollowInfo[];
  pendingFollowRequestInfo: InstaPendingFollowRequestInfo[];
  recentlyUnfollowedInfo: InstaRecentlyUnfollowedInfo[];
  removedSuggestionInfo: InstaRemovedSuggestionInfo[]
  receivedFollowRequestInfo: InstaReceivedFollowRequestInfo[];
}

import {
  FollowedModel,
  PeopleYouMayKnowModel,
  ReceivedFriendRequestsModel,
  RejectedFriendRequestsModel,
  RemovedFriendsModel,
  YourFriendsModel,
  SentFriendRequestsModel,
} from '../../models';
export default interface FbConnectionsDataModel {
  followed: FollowedModel;
  peopleYouMayKnow: PeopleYouMayKnowModel;
  receivedFriendRequests: ReceivedFriendRequestsModel;
  sentFriendRequests: SentFriendRequestsModel;
  rejectedFriendRequests: RejectedFriendRequestsModel;
  removedFriends: RemovedFriendsModel;
  yourFriends: YourFriendsModel;
}

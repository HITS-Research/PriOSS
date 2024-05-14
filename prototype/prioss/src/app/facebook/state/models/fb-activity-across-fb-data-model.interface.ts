import type {
  AlbumModel,
  CommentsModel,
  EventResponsesModel,
  EventsHiddenModel,
  EventsInvitedModel,
  FundraisersModel,
  GamingBookmarkAndAppSettingsModel,
  InformationDownloadRequestsModel,
  LikesAndReactionsModel,
  MessageRequestModel,
  NavigationbarActivityModel,
  PageLikesModel as PageLikedModel,
  PagesUnfollowedModel,
  PaymentsModel,
  PokesModel,
  PollVotesModel,
  PostPhotoModel,
  RecentlyFollowedHistoryModel,
  SecretConversationModel,
  InboxMessageModel,
  GroupMessageModel,
  CrossAppMessagingSettingsModel,
  AutofillInformationModel,
  ArchivedThreadModel,
  ItemsSoldModel,
  GroupsAdminedModel,
  GroupPostsModel,
  GroupsJoinedModel,
  GroupCommentsModel,
  GroupBadgesModel,
  PostModel,
  UncategorizedPhotos,
  PagesFollowedModel,
} from '../../models';
export default interface FbActivityAcrossFacebookModel {
  comments?: CommentsModel;
  likesAndReactions?: LikesAndReactionsModel;
  eventsInvited?: EventsInvitedModel;
  eventResponses?: EventResponsesModel;
  eventsHidden?: EventsHiddenModel;
  fundraisers?: FundraisersModel;
  gamingBookmarkAndAppSettings?: GamingBookmarkAndAppSettingsModel;
  albums?: AlbumModel[];
  postPhotos?: PostPhotoModel;
  posts?: PostModel[];
  uncategorizedPhotos?: UncategorizedPhotos;
  polls?: PollVotesModel;
  payments?: PaymentsModel;
  unfollowedPages?: PagesUnfollowedModel;
  likedPages?: PageLikedModel;
  followedPagesAndProfiles?: PagesFollowedModel;
  recentlyFollowedHistory?: RecentlyFollowedHistoryModel;
  pokes?: PokesModel;
  informatinDownloadRequests?: InformationDownloadRequestsModel;
  navigationbarActivity?: NavigationbarActivityModel;
  secretConversations?: SecretConversationModel[];
  messageRequests?: MessageRequestModel[];
  inboxMessages?: InboxMessageModel[];
  groupMessages?: GroupMessageModel[];
  crossAppMessagingSettings?: CrossAppMessagingSettingsModel;
  messageAutofillInformation?: AutofillInformationModel;
  archivedThreads?: ArchivedThreadModel[];
  marketplaceItemsSold?: ItemsSoldModel;
  groupsAdmined?: GroupsAdminedModel;
  groupPosts?: GroupPostsModel;
  groupsJoined?: GroupsJoinedModel;
  groupComments?: GroupCommentsModel;
  groupBadges?: GroupBadgesModel;
}

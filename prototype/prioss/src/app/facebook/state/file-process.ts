import JSZip from 'jszip';
import type {
  AccountActivityModel,
  AccountStatusChangesModel,
  ActiveSessionsModel,
  AdPreferencesModel,
  AddressBookModel,
  AdminRecordsModel,
  AdsInterestModel,
  AdvertiserInteractedModel,
  AdvertisersUsingYourDataModel,
  ArchivedThreadModel,
  ConnectedAppsAndWebsitesModel,
  ConsentModel,
  DeviceLocationModel,
  EmailAddressVerificationModel,
  EventInteractionModel,
  EventResponsesModel,
  EventsInvitedModel,
  LastActivityModel as FacebookActivityHistoryModel,
  FeedControlModel,
  FundraiserSettingsModel,
  GroupBadgesModel,
  GroupCommentsModel,
  GroupInteractionModel,
  GroupMessageModel,
  GroupPostsModel,
  GroupsAdminedModel,
  GroupsJoinedModel,
  IPAddressActivityModel,
  InboxMessageModel,
  LanguageAndLocalesModel,
  LastLoginInformationModel,
  LikesAndReactionsModel,
  LocationTimezoneModel,
  LoginProtectionDataModel,
  LoginsAndLogoutsModel,
  MessageRequestModel,
  MobileDeviceModel,
  NotificationMetaPrivacyPolicyUpdateModel,
  NotificationModel,
  OffFacebookActivityModel,
  OtherCategoriesUsedToReachYouModel,
  PeopleAndFriendsModel,
  PeopleInteractionModel,
  PeopleYouMayKnowModel,
  PrimaryLocationModel,
  PrimaryPublicLocationModel,
  ProfileInformationModel,
  ProfileInformationTimezoneModel,
  ReceivedFriendRequestsModel,
  RecentAccountRecoverySuccessesModel,
  RecentReportedConversionsModel,
  RecentlyViewedModel,
  RecentlyVisitedModel,
  RecognizedDevicesModel,
  RejectedFriendRequestsModel,
  RemovedFriendsModel,
  SearchHistoryModel,
  SentFriendRequestsModel,
  SubscriptionForNoAdsModel,
  SurveyResponseModel,
  VideoPreferenceModel,
  YourFriendsModel,
} from 'src/app/facebook/models';
import type { InferredTopicsModel } from 'src/app/facebook/models/LoggedInformation/Topics/Topics';
import type { DevicePushSettingModel } from 'src/app/facebook/models/Preferences/Preferences/DevicePushSettings';
import type { ReelsPreferenceModel } from 'src/app/facebook/models/Preferences/Preferences/ReelsPreference';
import { LikesAndReactionsItem } from 'src/app/facebook/models/activityAcrossFacebook/CommentsAndReactions/LikesAndReactions';
import type {
  FbActivityAcrossFacebookModel,
  FbAdsInformationModel,
  FbAppsAndWebsitesOffOfFacebookDataModel,
  FbConnectionsDataModel,
  FbLoggedInformationModel,
  FbPersonalInformationDataModel,
  FbPreferencesDataModel,
  FbSecurityLoginInformationDataModel,
  FbUserDataModel,
} from 'src/app/facebook/state/models';
import { UpdateFbUserData } from './fb.action';
import { WritableSignal } from '@angular/core';
import * as utilities from '../../features/utils/generalUtilities.functions';

/**
 * Parses the uploaded Facebook data-download-zip file into the store
 *
 * @author: Rashida (rbharmal@mail.upb.de), Rishma (rishmamn@mail.uni-paderborn.de)
 *
 */
export async function parseFacebookFile(
  zipPromise: Promise<JSZip>,
  progressSignal: WritableSignal<number> | null = null,
  abortSignal: WritableSignal<boolean> | null = null,
) {
  const userData: FbUserDataModel = {} as FbUserDataModel;

  // initialize sub-stores
  userData.activity_across_facebook = {} as FbActivityAcrossFacebookModel;
  userData.ads_and_businesses = {} as FbAdsInformationModel;
  userData.logged_information = {} as FbLoggedInformationModel;
  userData.personal_information = {} as FbPersonalInformationDataModel;
  userData.preferences = {} as FbPreferencesDataModel;
  userData.security_and_login_information =
    {} as FbSecurityLoginInformationDataModel;
  userData.apps_and_websites_off_of_fb =
    {} as FbAppsAndWebsitesOffOfFacebookDataModel;
  userData.connections = {} as FbConnectionsDataModel;

  const zip: JSZip = await zipPromise;

  const filepaths: string[] = Object.keys(zip.files).filter(path =>
    path.endsWith('.json'),
  );
  //sorting is important for folders with multiple json files, e.g. messages_1.json, messages_2.json, so we can parse them in order
  filepaths.sort();
  for (let i = 0; i < filepaths.length; i++) {
    if (abortSignal && abortSignal()) {
      abortSignal?.set(false);
      return;
    }
    progressSignal?.set(Math.round(100 * (i / filepaths.length)));

    const filepath: string = filepaths[i];
    const filename: string | undefined = filepath
      .split('\\')
      .pop()
      ?.split('/')
      .pop();

    //console.log('Filename: ' + filename);

    const content: string = await zip.files[filepath].async('string');

    if (!filename) {
      continue;
    }
    //logged_information
    if (filename === 'your_topics.json') {
      const inferredTopics: InferredTopicsModel = parseFacebookJSON(content);
      userData.logged_information.inferred_topics = inferredTopics;
    } else if (filename === 'device_location.json') {
      const jsonData: DeviceLocationModel = parseFacebookJSON(content);
      userData.logged_information.device_location = jsonData;
    } else if (filename === 'primary_location.json') {
      const jsonData: PrimaryLocationModel = parseFacebookJSON(content);
      userData.logged_information.primary_location = jsonData;
    } else if (filename === 'primary_public_location.json') {
      const jsonData: PrimaryPublicLocationModel = parseFacebookJSON(content);
      userData.logged_information.primary_public_location = jsonData;
    } else if (filename === 'timezone.json') {
      if (filepath.includes('location')) {
        const jsonData: LocationTimezoneModel = parseFacebookJSON(content);
        userData.logged_information.timezone = jsonData;
      } else if (filepath.includes('profile')) {
        const jsonData: ProfileInformationTimezoneModel =
          parseFacebookJSON(content);
        userData.personal_information.timezone = jsonData;
      }
    } else if (filename === 'notifications.json') {
      const jsonData: NotificationModel = parseFacebookJSON(content);
      userData.logged_information.notifications = jsonData;
    } else if (filename === 'notification_of_meta_privacy_policy_update.json') {
      const jsonData: NotificationMetaPrivacyPolicyUpdateModel =
        parseFacebookJSON(content);
      userData.logged_information.meta_privacy_policy_update = jsonData;
    } else if (filename === 'events_interactions.json') {
      const jsonData: EventInteractionModel = parseFacebookJSON(content);
      userData.logged_information.event_interaction = jsonData;
    } else if (filename === 'ads_interests.json') {
      const jsonData: AdsInterestModel = parseFacebookJSON(content);
      userData.logged_information.ads_interest = jsonData;
    } else if (filename === 'consents.json') {
      const jsonData: ConsentModel = parseFacebookJSON(content);
      userData.logged_information.consents = jsonData;
    } else if (filename === 'survey_responses.json') {
      const jsonData: SurveyResponseModel = parseFacebookJSON(content);
      userData.logged_information.survey_responses = jsonData;
    } else if (filename === 'recently_visited.json') {
      const jsonData: RecentlyVisitedModel = parseFacebookJSON(content);
      userData.logged_information.recently_visited = jsonData;
    } else if (filename === 'recently_viewed.json') {
      const jsonData: RecentlyViewedModel = parseFacebookJSON(content);
      userData.logged_information.recently_viewed = jsonData;
    }
    //ads_information
    else if (filename === "advertisers_you've_interacted_with.json") {
      const jsonData: AdvertiserInteractedModel = parseFacebookJSON(content);
      userData.ads_and_businesses.advertiserInteracted = jsonData;
    } else if (filename === 'your_recent_reported_conversions.json') {
      const jsonData: RecentReportedConversionsModel =
        parseFacebookJSON(content);
      userData.ads_and_businesses.recentReportedConversions = jsonData;
    } else if (filename === 'ad_preferences.json') {
      const jsonData: AdPreferencesModel = parseFacebookJSON(content);
      userData.ads_and_businesses.adPreferences = jsonData;
    } else if (filename === 'subscription_for_no_ads.json') {
      const jsonData: SubscriptionForNoAdsModel = parseFacebookJSON(content);
      userData.ads_and_businesses.subscriptionsForNoAds = jsonData;
    } else if (filename === 'other_categories_used_to_reach_you.json') {
      const jsonData: OtherCategoriesUsedToReachYouModel =
        parseFacebookJSON(content);
      userData.ads_and_businesses.otherCategoriesUsedToReachYou = jsonData;
    } else if (
      filename === 'advertisers_using_your_activity_or_information.json'
    ) {
      const jsonData: AdvertisersUsingYourDataModel =
        parseFacebookJSON(content);
      userData.ads_and_businesses.advertisersUsingYourData = jsonData;
    } else if (filename === 'apps_and_websites.json') {
      // TODO missing from new sample data maybe depracted
    } else if (filename === 'connected_apps_and_websites.json') {
      const jsonData: ConnectedAppsAndWebsitesModel =
        parseFacebookJSON(content);
      userData.apps_and_websites_off_of_fb.connectedAppsAndWebsites = jsonData;
    } else if (filename === 'your_activity_off_meta_technologies.json') {
      const jsonData: OffFacebookActivityModel = parseFacebookJSON(content);
      userData.apps_and_websites_off_of_fb.offFacebookActivity = jsonData;
    }
    //connections
    else if (filename === 'received_friend_requests.json') {
      const receivedFriendRequests: ReceivedFriendRequestsModel =
        parseFacebookJSON(content);
      userData.connections.receivedFriendRequests = receivedFriendRequests;
    } else if (filename === 'sent_friend_requests.json') {
      const sentFriendRequests: SentFriendRequestsModel =
        parseFacebookJSON(content);
      userData.connections.sentFriendRequests = sentFriendRequests;
    } else if (filename === 'rejected_friend_requests.json') {
      const jsonData: RejectedFriendRequestsModel = parseFacebookJSON(content);
      userData.connections.rejectedFriendRequests = jsonData;
    } else if (filename === 'your_friends.json') {
      const jsonData: YourFriendsModel = parseFacebookJSON(content);
      userData.connections.yourFriends = jsonData;
    } else if (filename === 'removed_friends.json') {
      const jsonData: RemovedFriendsModel = parseFacebookJSON(content);
      userData.connections.removedFriends = jsonData;
    } else if (filename === "who_you've_followed.json") {
      const jsonData = parseFacebookJSON(content);
      userData.connections.followed = jsonData;
    } else if (filename === 'people_you_may_know.json') {
      const jsonData: PeopleYouMayKnowModel = parseFacebookJSON(content);
      userData.connections.peopleYouMayKnow = jsonData;
    } else if (filename === 'profile_information.json') {
      const jsonData: ProfileInformationModel = parseFacebookJSON(content);
      userData.personal_information.profile_information = jsonData;
    } else if (filename === 'your_address_books.json') {
      const jsonData: AddressBookModel = parseFacebookJSON(content);
      userData.personal_information.address_books = jsonData;
    } else if (filename === 'your_search_history.json') {
      const jsonData: SearchHistoryModel = parseFacebookJSON(content);
      userData.logged_information.search_history = jsonData;
    } else if (filename === 'account_status_changes.json') {
      const jsonData: AccountStatusChangesModel = parseFacebookJSON(content);
      userData.security_and_login_information.account_status_changes = jsonData;
    } else if (filename === 'people_and_friends.json') {
      const jsonData: PeopleInteractionModel = parseFacebookJSON(content);
      userData.logged_information.people_interaction = jsonData;
    } else if (filename === 'group_interactions.json') {
      const jsonData: GroupInteractionModel = parseFacebookJSON(content);
      userData.logged_information.group_interaction = jsonData;
    } else if (
      /your_posts__check_ins__photos_and_videos_[0-9]+\.json/.test(filename)
    ) {
      if (!userData.activity_across_facebook.posts) {
        userData.activity_across_facebook.posts = [];
      }
      userData.activity_across_facebook.posts = [...parseFacebookJSON(content)];
      //folder structure is: posts/album/0.json posts/album/1.json etc
    } else if (filepath.includes('posts') && filepath.includes('album')) {
      if (/[0-9]\.json/.test(filename)) {
        if (!userData.activity_across_facebook.albums) {
          userData.activity_across_facebook.albums = [];
        }
        userData.activity_across_facebook.albums.push(
          parseFacebookJSON(content),
        );
      }
    } else if (filename === 'your_uncategorized_photos.json') {
      userData.activity_across_facebook.uncategorizedPhotos =
        parseFacebookJSON(content);
    }
    //security_and_login_information
    else if (filename === 'logins_and_logouts.json') {
      const jsonData: LoginsAndLogoutsModel = parseFacebookJSON(content);
      userData.security_and_login_information.logins_and_logouts = jsonData;
    } else if (filename === 'account_activity.json') {
      const jsonData: AccountActivityModel = parseFacebookJSON(content);
      userData.security_and_login_information.account_activity = jsonData;
    } else if (filename === 'information_about_your_last_login.json') {
      const jsonData: LastLoginInformationModel = parseFacebookJSON(content);
      userData.security_and_login_information.last_login_information = jsonData;
    } else if (filename === 'ip_address_activity.json') {
      const jsonData: IPAddressActivityModel = parseFacebookJSON(content);
      userData.security_and_login_information.ip_address_activity = jsonData;
    } else if (filename === 'record_details.json') {
      const jsonData: AdminRecordsModel = parseFacebookJSON(content);
      userData.security_and_login_information.record_details = jsonData;
    } else if (filename === 'your_facebook_activity_history.json') {
      const jsonData: FacebookActivityHistoryModel = parseFacebookJSON(content);
      userData.security_and_login_information.facebook_activity_history =
        jsonData;
    } else if (filename === 'recognized_devices.json') {
      const jsonData: RecognizedDevicesModel = parseFacebookJSON(content);
      userData.security_and_login_information.recognized_devices = jsonData;
    } else if (filename === 'mobile_devices.json') {
      const jsonData: MobileDeviceModel = parseFacebookJSON(content);
      userData.security_and_login_information.mobile_devices = jsonData;
    } else if (filename === 'email_address_verifications.json') {
      const jsonData: EmailAddressVerificationModel =
        parseFacebookJSON(content);
      userData.security_and_login_information.email_address_verifications =
        jsonData;
    } else if (filename === 'login_protection_data.json') {
      const jsonData: LoginProtectionDataModel = parseFacebookJSON(content);
      userData.security_and_login_information.login_protection_data = jsonData;
    } else if (filename === 'your_recent_account_recovery_successes.json') {
      const jsonData: RecentAccountRecoverySuccessesModel =
        parseFacebookJSON(content);
      userData.security_and_login_information.recent_account_recovery_successes =
        jsonData;
    } else if (filename === "where_you're_logged_in.json") {
      const jsonData: ActiveSessionsModel = parseFacebookJSON(content);
      userData.security_and_login_information.login_location = jsonData;
    }
    //preferences
    else if (filename === 'feed.json') {
      const jsonData: PeopleAndFriendsModel = parseFacebookJSON(content);
      userData.preferences.feed = jsonData;
    } else if (filename === 'controls.json') {
      const jsonData: FeedControlModel = parseFacebookJSON(content);
      userData.preferences.feedControls = jsonData;
    } else if (filename === 'your_fundraiser_settings.json') {
      const jsonData: FundraiserSettingsModel = parseFacebookJSON(content);
      userData.preferences.fundraiserSettings = jsonData;
    } else if (filename === 'reels_preferences.json') {
      const jsonData: ReelsPreferenceModel = parseFacebookJSON(content);
      userData.preferences.reelsPreferences = jsonData;
    } else if (filename === 'video.json') {
      const jsonData: VideoPreferenceModel = parseFacebookJSON(content);
      userData.preferences.videoPreferences = jsonData;
    } else if (filename === 'your_device_push_settings.json') {
      const jsonData: DevicePushSettingModel = parseFacebookJSON(content);
      userData.preferences.devicePushSettings = jsonData;
    } else if (filename === 'language_and_locale.json') {
      const jsonData: LanguageAndLocalesModel = parseFacebookJSON(content);
      userData.preferences.languageAndLocales = jsonData;
    } else if (filename === 'your_story_highlights.json') {
      //TODO not implemented
    }

    //activity_across_facebook/groups
    else if (filename === 'your_badges.json') {
      const jsonData: GroupBadgesModel = parseFacebookJSON(content);
      userData.activity_across_facebook.groupBadges = jsonData;
    } else if (filename === 'your_group_membership_activity.json') {
      const jsonData: GroupsJoinedModel = parseFacebookJSON(content);
      userData.activity_across_facebook.groupsJoined = jsonData;
    } else if (filename === 'your_comments_in_groups.json') {
      const jsonData: GroupCommentsModel = parseFacebookJSON(content);
      userData.activity_across_facebook.groupComments = jsonData;
    } else if (filename === 'your_groups.json') {
      const jsonData: GroupsAdminedModel = parseFacebookJSON(content);
      userData.activity_across_facebook.groupsAdmined = jsonData;
    } else if (filename === 'comments.json') {
      userData.activity_across_facebook.comments = parseFacebookJSON(content);
    } else if (filename.startsWith('likes_and_reactions_')) {
      if (
        userData.activity_across_facebook.likesAndReactions === undefined ||
        userData.activity_across_facebook.likesAndReactions ===
          ({} as LikesAndReactionsModel)
      ) {
        userData.activity_across_facebook.likesAndReactions =
          {} as LikesAndReactionsModel;
        userData.activity_across_facebook.likesAndReactions.likes_and_reactions =
          parseFacebookJSON(content);
      } else {
        const jsonData: LikesAndReactionsItem[] = parseFacebookJSON(content);
        userData.activity_across_facebook.likesAndReactions.likes_and_reactions =
          [...jsonData];
      }
    } else if (filename === 'group_posts_and_comments.json') {
      const jsonData: GroupPostsModel = parseFacebookJSON(content);
      userData.activity_across_facebook.groupPosts = jsonData;
    } else if (filename === "pages_you've_liked.json") {
      userData.activity_across_facebook.likedPages = parseFacebookJSON(content);
    } else if (filename === 'pages_and_profiles_you_follow.json') {
      userData.activity_across_facebook.followedPagesAndProfiles =
        parseFacebookJSON(content);
    } else if (filename === "pages_and_profiles_you've_unfollowed.json") {
      userData.activity_across_facebook.unfollowedPages =
        parseFacebookJSON(content);
    } else if (filename === 'your_event_responses.json') {
      const jsonData: EventResponsesModel = parseFacebookJSON(content);
      userData.activity_across_facebook.eventResponses = jsonData;
    } else if (filename === 'event_invitations.json') {
      const jsonData: EventsInvitedModel = parseFacebookJSON(content);
      userData.activity_across_facebook.eventsInvited = jsonData;
    } else if (filename === "events_you've_hidden.json") {
      const jsonData: EventsInvitedModel = parseFacebookJSON(content);
      userData.activity_across_facebook.eventsInvited = jsonData;
      //check for files with names like message_1.json, message_2.json etc.
    } else if (/^message_[0-9]+\.json/.test(filename)) {
      if (filepath.includes('archived_threads')) {
        const jsonData: ArchivedThreadModel = parseFacebookJSON(content);
        userData.activity_across_facebook.archivedThreads ??= [];
        userData.activity_across_facebook.archivedThreads?.push(jsonData);
      } else if (filepath.includes('inbox')) {
        //check if message is group message or normal message
        if (content.includes('joinable_mode')) {
          const jsonData: GroupMessageModel = parseFacebookJSON(content);
          //if groupmessages are nullish, set to empty array
          userData.activity_across_facebook.groupMessages ??= [];
          userData.activity_across_facebook.groupMessages?.push(jsonData);
        } else {
          const jsonData: InboxMessageModel = parseFacebookJSON(content);
          userData.activity_across_facebook.inboxMessages ??= [];
          userData.activity_across_facebook.inboxMessages?.push(jsonData);
        }
      } else if (filepath.includes('message_requests')) {
        const jsonData: MessageRequestModel = parseFacebookJSON(content);
        userData.activity_across_facebook.messageRequests ??= [];
        userData.activity_across_facebook.messageRequests?.push(jsonData);
      }
      //if there are more than one message files in the same folder
      const messagePaths = filepaths.filter(path =>
        path.includes(filepath.replace(filename, '')),
      );
      if (messagePaths.length > 1) {
        for (const messagefile of messagePaths) {
          if (messagefile !== filepath) {
            const content2: string =
              await zip.files[messagefile].async('string');
            if (messagefile.includes('archived_threads')) {
              const jsonData: ArchivedThreadModel = parseFacebookJSON(content2);
              for (const archivedTread of userData.activity_across_facebook
                .archivedThreads ?? []) {
                if (archivedTread.thread_path === jsonData.thread_path) {
                  archivedTread.messages = archivedTread.messages.concat(
                    jsonData.messages,
                  );
                }
              }
            } else if (messagefile.includes('inbox')) {
              //check if message is group message or normal message
              if (content2.includes('joinable_mode')) {
                const jsonData: GroupMessageModel = parseFacebookJSON(content2);
                for (const groupMessage of userData.activity_across_facebook
                  .groupMessages ?? []) {
                  if (groupMessage.thread_path === jsonData.thread_path) {
                    groupMessage.messages = groupMessage.messages.concat(
                      jsonData.messages,
                    );
                  }
                }
              } else {
                const jsonData: InboxMessageModel = parseFacebookJSON(content2);
                for (const inboxMessage of userData.activity_across_facebook
                  .inboxMessages ?? []) {
                  if (inboxMessage.thread_path === jsonData.thread_path) {
                    inboxMessage.messages = inboxMessage.messages.concat(
                      jsonData.messages,
                    );
                  }
                }
              }
            } else if (messagefile.includes('message_requests')) {
              const jsonData: MessageRequestModel = parseFacebookJSON(content2);
              for (const messageRequest of userData.activity_across_facebook
                .messageRequests ?? []) {
                if (messageRequest.thread_path === jsonData.thread_path) {
                  messageRequest.messages = messageRequest.messages.concat(
                    jsonData.messages,
                  );
                }
              }
            }
          }
        }
      }
    }
  }

  return new UpdateFbUserData(userData);
}

function parseFacebookJSON(content: string): any {
  let result = {};
  try {
    result = JSON.parse(content);
    result = utilities.modifyStringValuesInJSON(
      result,
      utilities.fixFacebookEncoding,
    );
  } catch (e) {
    console.error(`Error parsing JSON: ${e} ${content}`);
    return {};
  }

  return result;
}

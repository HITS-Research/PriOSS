import JSZip from 'jszip';
import type {
  ArchivedThreadModel,
  GroupMessageModel,
  InboxMessageModel,
  LikesAndReactionsModel,
  MessageRequestModel,
} from 'src/app/facebook/models';
import type { InferredTopicsModel } from 'src/app/facebook/models/LoggedInformation/Topics/Topics';
import type { LikesAndReactionsItem } from 'src/app/facebook/models/activityAcrossFacebook/CommentsAndReactions/LikesAndReactions';
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
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { FacebookDataFile } from '../models/FacebookDataFile.interface';
import { FacebookIndexedDBMedia } from '../models/FacebookIndexDBMedia.interface';

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
  indexedDbService: IndexedDbService,
  fileName: string,
  fileSizeInBytes: number,
) {


  const datafiles: FacebookDataFile[] = await indexedDbService.getAllFacebookUserDataStores();

  if (datafiles.length > 0) {
    for (const file of datafiles) {
      if (file.filename === fileName) {
        //if we dont access indexeddb here, the data will only be loaded, wehen the usere refreshes the page
        await indexedDbService.getSelectedFacebookDataStore();
        //just for compatibility until NGXS is removed completly

        return new UpdateFbUserData({} as FbUserDataModel);
      }
    }
  }



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
  const mediafiles: FacebookIndexedDBMedia[] = [];
  const zip: JSZip = await zipPromise;
  const filepaths: string[] = Object.keys(zip.files);
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
    const content: string = await zip.files[filepath].async('string');

    if (!filename) {
      continue;
    }
    if (!filename.endsWith('.json')) {
      const fileBlob = await zip.files[filepath].async('blob');
      mediafiles.push({
        id: i,
        data_export_file: fileName,
        thread_path: filepath,
        file_type: filepath.split('.').pop() ?? '',
        file: fileBlob
      });
      continue;
    }

    //logged_information
    if (filepath.endsWith('your_topics.json')) {
      const inferredTopics: InferredTopicsModel = parseFacebookJSON(content);
      userData.logged_information.inferred_topics = inferredTopics;
    } else if (filepath.endsWith('device_location.json')) {
      userData.logged_information.device_location = parseFacebookJSON(content);
    } else if (filepath.endsWith('primary_location.json')) {
      userData.logged_information.primary_location = parseFacebookJSON(content);
    } else if (filepath.endsWith('primary_public_location.json')) {
      userData.logged_information.primary_public_location = parseFacebookJSON(content);
    } else if (filepath.endsWith('timezone.json')) {
      if (filepath.includes('location')) {
        userData.logged_information.timezone = parseFacebookJSON(content);
      } else if (filepath.includes('profile')) {
        userData.personal_information.timezone = parseFacebookJSON(content);
      }
    } else if (filepath.endsWith('notifications.json')) {
      userData.logged_information.notifications = parseFacebookJSON(content);
    } else if (filepath.endsWith('notification_of_meta_privacy_policy_update.json')) {
      userData.logged_information.meta_privacy_policy_update = parseFacebookJSON(content);
    } else if (filepath.endsWith('events_interactions.json')) {
      userData.logged_information.event_interaction = parseFacebookJSON(content);
    } else if (filepath.endsWith('ads_interests.json')) {
      userData.logged_information.ads_interest = parseFacebookJSON(content);
    } else if (filepath.endsWith('consents.json')) {
      userData.logged_information.consents = parseFacebookJSON(content);
    } else if (filepath.endsWith('survey_responses.json')) {
      userData.logged_information.survey_responses = parseFacebookJSON(content);
    } else if (filepath.endsWith('recently_visited.json')) {
      userData.logged_information.recently_visited = parseFacebookJSON(content);
    } else if (filepath.endsWith('recently_viewed.json')) {
      userData.logged_information.recently_viewed = parseFacebookJSON(content);
    }
    //ads_information
    else if (filepath.endsWith("advertisers_you've_interacted_with.json")) {
      userData.ads_and_businesses.advertiserInteracted = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_recent_reported_conversions.json')) {
      userData.ads_and_businesses.recentReportedConversions = parseFacebookJSON(content);
    } else if (filepath.endsWith('ad_preferences.json')) {
      userData.ads_and_businesses.adPreferences = parseFacebookJSON(content);
    } else if (filepath.endsWith('subscription_for_no_ads.json')) {
      userData.ads_and_businesses.subscriptionsForNoAds = parseFacebookJSON(content);
    } else if (filepath.endsWith('other_categories_used_to_reach_you.json')) {
      userData.ads_and_businesses.otherCategoriesUsedToReachYou = parseFacebookJSON(content);
    } else if (
      filename === 'advertisers_using_your_activity_or_information.json'
    ) {
      userData.ads_and_businesses.advertisersUsingYourData = parseFacebookJSON(content);
    } else if (filepath.endsWith('apps_and_websites.json')) {
      // TODO missing from new sample data maybe depracted
    } else if (filepath.endsWith('connected_apps_and_websites.json')) {
      userData.apps_and_websites_off_of_fb.connectedAppsAndWebsites = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_activity_off_meta_technologies.json')) {
      userData.apps_and_websites_off_of_fb.offFacebookActivity = parseFacebookJSON(content);
    }
    //connections
    else if (filepath.endsWith('received_friend_requests.json')) {
      userData.connections.receivedFriendRequests = parseFacebookJSON(content);
    } else if (filepath.endsWith('sent_friend_requests.json')) {
      userData.connections.sentFriendRequests = parseFacebookJSON(content);
    } else if (filepath.endsWith('rejected_friend_requests.json')) {
      userData.connections.rejectedFriendRequests = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_friends.json')) {
      userData.connections.yourFriends = parseFacebookJSON(content);
    } else if (filepath.endsWith('removed_friends.json')) {
      userData.connections.removedFriends = parseFacebookJSON(content);
    } else if (filepath.endsWith("who_you've_followed.json")) {
      userData.connections.followed = parseFacebookJSON(content);
    } else if (filepath.endsWith('people_you_may_know.json')) {
      userData.connections.peopleYouMayKnow = parseFacebookJSON(content);
    } else if (filepath.endsWith('profile_information.json')) {
      userData.personal_information.profile_information = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_address_books.json')) {
      userData.personal_information.address_books = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_search_history.json')) {
      userData.logged_information.search_history = parseFacebookJSON(content);
    } else if (filepath.endsWith('account_status_changes.json')) {
      userData.security_and_login_information.account_status_changes = parseFacebookJSON(content);
    } else if (filepath.endsWith('people_and_friends.json')) {
      userData.logged_information.people_interaction = parseFacebookJSON(content);
    } else if (filepath.endsWith('group_interactions.json')) {
      userData.logged_information.group_interaction = parseFacebookJSON(content);
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
    } else if (filepath.endsWith('your_uncategorized_photos.json')) {
      userData.activity_across_facebook.uncategorizedPhotos =
        parseFacebookJSON(content);
    }
    //security_and_login_information
    else if (filepath.endsWith('logins_and_logouts.json')) {
      userData.security_and_login_information.logins_and_logouts = parseFacebookJSON(content);
    } else if (filepath.endsWith('account_activity.json')) {
      userData.security_and_login_information.account_activity = parseFacebookJSON(content);
    } else if (filepath.endsWith('information_about_your_last_login.json')) {
      userData.security_and_login_information.last_login_information = parseFacebookJSON(content);
    } else if (filepath.endsWith('ip_address_activity.json')) {
      userData.security_and_login_information.ip_address_activity = parseFacebookJSON(content);
    } else if (filepath.endsWith('record_details.json')) {
      userData.security_and_login_information.record_details = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_facebook_activity_history.json')) {
      userData.security_and_login_information.facebook_activity_history = parseFacebookJSON(content);
    } else if (filepath.endsWith('recognized_devices.json')) {
      userData.security_and_login_information.recognized_devices = parseFacebookJSON(content);
    } else if (filepath.endsWith('mobile_devices.json')) {
      userData.security_and_login_information.mobile_devices = parseFacebookJSON(content);
    } else if (filepath.endsWith('email_address_verifications.json')) {
      userData.security_and_login_information.email_address_verifications =
        parseFacebookJSON(content);
    } else if (filepath.endsWith('login_protection_data.json')) {
      userData.security_and_login_information.login_protection_data = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_recent_account_recovery_successes.json')) {
      userData.security_and_login_information.recent_account_recovery_successes =
        parseFacebookJSON(content);
    } else if (filepath.endsWith("where_you're_logged_in.json")) {
      userData.security_and_login_information.login_location = parseFacebookJSON(content);
    }
    //preferences
    else if (filepath.endsWith('feed.json')) {
      userData.preferences.feed = parseFacebookJSON(content);
    } else if (filepath.endsWith('controls.json')) {
      userData.preferences.feedControls = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_fundraiser_settings.json')) {
      userData.preferences.fundraiserSettings = parseFacebookJSON(content);
    } else if (filepath.endsWith('reels_preferences.json')) {
      userData.preferences.reelsPreferences = parseFacebookJSON(content);
    } else if (filepath.endsWith('video.json')) {
      userData.preferences.videoPreferences = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_device_push_settings.json')) {
      userData.preferences.devicePushSettings = parseFacebookJSON(content);
    } else if (filepath.endsWith('language_and_locale.json')) {
      userData.preferences.languageAndLocales = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_story_highlights.json')) {
      //TODO not implemented
    }

    //activity_across_facebook/groups
    else if (filepath.endsWith('your_badges.json')) {
      userData.activity_across_facebook.groupBadges = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_group_membership_activity.json')) {
      userData.activity_across_facebook.groupsJoined = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_comments_in_groups.json')) {
      userData.activity_across_facebook.groupComments = parseFacebookJSON(content);
    } else if (filepath.endsWith('your_groups.json')) {
      userData.activity_across_facebook.groupsAdmined = parseFacebookJSON(content);
    } else if (filepath.endsWith('comments.json')) {
      userData.activity_across_facebook.comments = parseFacebookJSON(content);
    } else if (filename.startsWith('likes_and_reactions_')) {
      if (
        userData.activity_across_facebook.likesAndReactions === undefined ||
        userData.activity_across_facebook.likesAndReactions ===
        null
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
    } else if (filepath.endsWith('group_posts_and_comments.json')) {
      userData.activity_across_facebook.groupPosts = parseFacebookJSON(content);
    } else if (filepath.endsWith("pages_you've_liked.json")) {
      userData.activity_across_facebook.likedPages = parseFacebookJSON(content);
    } else if (filepath.endsWith('pages_and_profiles_you_follow.json')) {
      userData.activity_across_facebook.followedPagesAndProfiles =
        parseFacebookJSON(content);
    } else if (filepath.endsWith("pages_and_profiles_you've_unfollowed.json")) {
      userData.activity_across_facebook.unfollowedPages =
        parseFacebookJSON(content);
    } else if (filepath.endsWith('your_event_responses.json')) {
      userData.activity_across_facebook.eventResponses = parseFacebookJSON(content);
    } else if (filepath.endsWith('event_invitations.json')) {
      userData.activity_across_facebook.eventsInvited = parseFacebookJSON(content);
    } else if (filepath.endsWith("events_you've_hidden.json")) {
      userData.activity_across_facebook.eventsHidden = parseFacebookJSON(content);
      //check for files with names like message_1.json, message_2.json etc.
    } else if(filepath.endsWith('message_1.json')){
      parseSingleMessageFile(filepath, content, userData);
    }
    else if (/message_([2-9]|\d{2,})\.json/.test(filename)) {
      //if there are more than one message files in the same folder
      parseMultiMessageFile(filepath, content, userData);
    }
  }

  const indexedDb = indexedDbService;
  const userDataFile: FacebookDataFile = generateFaceBookDataFile(userData, fileName, fileSizeInBytes);
  let skipLoadingOfData = false;
  await indexedDb.getAllFacebookUserDataStores().then((data) => {
    if (data.length > 0) {
      //compare each data with the new data and only add the new data, if there is no equal object in the database
      //saves time
      const newData = userData;
      for (let i = 0; i < data.length; i++) {
        if (JSON.stringify(data[i].facebookData) === JSON.stringify(newData)) {
          skipLoadingOfData = true;
        }
      }
    }
  })
  if (skipLoadingOfData) {
    //we will add the functionality for loading the data from indexedDb in the future
    skipLoadingOfData = false;
  }
  await indexedDb.bulkAddFacebookMediaFiles(mediafiles)
    .then(() => {
      indexedDb.addFacebookUserDataStore(userDataFile)
    });
  return new UpdateFbUserData({} as FbUserDataModel);
}

async function parseMultiMessageFile(filepath: string, content: string, userData: FbUserDataModel) {
  if (/message_([2-9]|\d{2,})\.json/.test(filepath)) {
    if (filepath.includes('archived_threads')) {
        const jsonData: ArchivedThreadModel = parseFacebookJSON(content);
        for (const archivedTread of userData.activity_across_facebook
          .archivedThreads ?? []) {
          if (archivedTread.thread_path === jsonData.thread_path) {
            archivedTread.messages = archivedTread.messages.concat(
              jsonData.messages,
            );
          }
          }
      } else if (filepath.includes('inbox')) {
        //check if message is group message or normal message
        if (content.includes('joinable_mode')) {
          const jsonData: GroupMessageModel = parseFacebookJSON(content);
          for (const groupMessage of userData.activity_across_facebook
            .groupMessages ?? []) {
            if (groupMessage.thread_path === jsonData.thread_path) {
              groupMessage.messages = groupMessage.messages.concat(
                jsonData.messages,
              );
            }
          }
        } else {
          const jsonData: InboxMessageModel = parseFacebookJSON(content);
          for (const inboxMessage of userData.activity_across_facebook
            .inboxMessages ?? []) {
            if (inboxMessage.thread_path === jsonData.thread_path) {
              console.log(`inboxMessage second file : ${jsonData.participants[0].name} ${jsonData.participants[1].name}`);
              inboxMessage.messages = inboxMessage.messages.concat(
                jsonData.messages,
              );
            }
          }
        }
      } else if (filepath.includes('message_requests')) {
        const jsonData: MessageRequestModel = parseFacebookJSON(content);
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

/**
 * the data export can include multiple message file per chat, if the amount of messages surpasses a certain value
 * this method is used to parse chats with a single message file
 * @param filepath the path of the file
 * @param content the content of the file
 * @param userData that the chat will be appended to. its call-by-sharing, so the changes will be reflected in the original object
 */
function parseSingleMessageFile(filepath: string, content: string, userData: FbUserDataModel) {
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
      console.log(`inboxMessage.messages: ${jsonData.participants[0].name} ${jsonData.participants[1].name}`);
    }
  } else if (filepath.includes('message_requests')) {
    const jsonData: MessageRequestModel = parseFacebookJSON(content);
    userData.activity_across_facebook.messageRequests ??= [];
    userData.activity_across_facebook.messageRequests?.push(jsonData);
  }
}


function generateFaceBookDataFile(
  userData: FbUserDataModel,
  fileName: string,
  fileSizeInBytes: number,
): FacebookDataFile {
  return {
    timestamp: Date.now(),
    filename: fileName,
    sizeInBytes: fileSizeInBytes,
    facebookData: userData,
  };
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

/**
 * @fileoverview This file contains functions for parsing and processing Facebook data from a zip file.
 * It includes methods for handling various types of Facebook data, including messages, user information,
 * and media files.
 */

import JSZip from 'jszip';
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
 * Parses the uploaded Facebook data-download-zip file and stores the data.
 * 
 * @param zipPromise - A promise that resolves to a JSZip object containing the Facebook data.
 * @param progressSignal - An optional WritableSignal to update the progress of the parsing process.
 * @param abortSignal - An optional WritableSignal to abort the parsing process.
 * @param indexedDbService - The IndexedDbService to interact with the IndexedDB.
 * @param fileName - The name of the uploaded file.
 * @param fileSizeInBytes - The size of the uploaded file in bytes.
 * @returns A promise that resolves to an UpdateFbUserData action.
 */
export async function parseFacebookFile(
  zipPromise: Promise<JSZip>,
  progressSignal: WritableSignal<number> | null = null,
  abortSignal: WritableSignal<boolean> | null = null,
  indexedDbService: IndexedDbService,
  fileName: string,
  fileSizeInBytes: number,
): Promise<UpdateFbUserData> {
  if (await isFileAlreadyProcessed(indexedDbService, fileName)) {
    return new UpdateFbUserData({} as FbUserDataModel);
  }

  const userData: FbUserDataModel = initializeUserDataModel();
  const mediafiles: FacebookIndexedDBMedia[] = [];

  const zip: JSZip = await zipPromise;
  const filepaths: string[] = Object.keys(zip.files);

  for (let i = 0; i < filepaths.length; i++) {
    if (await shouldAbortProcessing(abortSignal)) return new UpdateFbUserData({} as FbUserDataModel);
    updateProgress(progressSignal, i, filepaths.length);

    const filepath: string = filepaths[i];
    const filename: string | undefined = getFilename(filepath);
    if (!filename) continue;

    const content: string = await zip.files[filepath].async('string');

    if (!filename.endsWith('.json')) {
      await processNonJsonFile(mediafiles, zip, filepath, fileName, i);
      continue;
    }

    processJsonFile(userData, filepath, filename, content);
  }

  await saveProcessedData(indexedDbService, userData, mediafiles, fileName, fileSizeInBytes);

  return new UpdateFbUserData({} as FbUserDataModel);
}

/**
 * Parses a multi-message file and updates the user data accordingly.
 * This function is used when a chat has multiple message files due to a large number of messages.
 * 
 * @param filepath - The path of the file being parsed.
 * @param content - The content of the file being parsed.
 * @param userData - The user data to be updated.
 */
async function parseMultiMessageFile(filepath: string, content: string, userData: FbUserDataModel) {
  if (!/message_([2-9]|\d{2,})\.json/.test(filepath)) return;

  const jsonData = parseFacebookJSON(content);
  let category: keyof FbUserDataModel['activity_across_facebook'];
  let isGroupMessage = false;

  if (filepath.includes('archived_threads')) {
    category = 'archivedThreads';
  } else if (filepath.includes('inbox')) {
    isGroupMessage = content.includes('joinable_mode');
    category = isGroupMessage ? 'groupMessages' : 'inboxMessages';
  } else if (filepath.includes('message_requests')) {
    category = 'messageRequests';
  } else {
    return;
  }

  const messages = userData.activity_across_facebook[category] ?? [];
  const targetMessage = messages.find(msg => msg.thread_path === jsonData.thread_path);

  if (targetMessage) {
    targetMessage.messages = targetMessage.messages.concat(jsonData.messages);

    if (category === 'inboxMessages' && !isGroupMessage) {
      console.log(`inboxMessage second file : ${jsonData.participants[0].name} ${jsonData.participants[1].name}`);
    }
  }
}

/**
 * Parses a single message file and updates the user data accordingly.
 * This method is used for chats with a single message file.
 * 
 * @param filepath - The path of the file being parsed.
 * @param content - The content of the file being parsed.
 * @param userData - The user data to be updated. It's call-by-sharing, so changes will be reflected in the original object.
 */
function parseSingleMessageFile(filepath: string, content: string, userData: FbUserDataModel) {
  const jsonData = parseFacebookJSON(content);
  let category: keyof FbUserDataModel['activity_across_facebook'];

  if (filepath.includes('archived_threads')) {
    category = 'archivedThreads';
  } else if (filepath.includes('inbox')) {
    category = content.includes('joinable_mode') ? 'groupMessages' : 'inboxMessages';
  } else if (filepath.includes('message_requests')) {
    category = 'messageRequests';
  } else {
    return; // Exit if filepath doesn't match any category
  }
  userData.activity_across_facebook[category] ??= [];
  userData.activity_across_facebook[category]?.push(jsonData);
}

/**
 * Generates a FacebookDataFile object from the parsed user data.
 * 
 * @param userData - The parsed Facebook user data.
 * @param fileName - The name of the uploaded file.
 * @param fileSizeInBytes - The size of the uploaded file in bytes.
 * @returns A FacebookDataFile object containing the parsed data and metadata.
 */
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

/**
 * Parses a JSON string and applies Facebook-specific encoding fixes.
 * 
 * @param content - The JSON string to parse.
 * @returns The parsed and fixed JSON object.
 */
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

// Helper functions

/**
 * Checks if the given file has already been processed.
 * 
 * @param indexedDbService - The IndexedDbService to interact with the IndexedDB.
 * @param fileName - The name of the file to check.
 * @returns A promise that resolves to a boolean indicating whether the file has been processed.
 */
async function isFileAlreadyProcessed(indexedDbService: IndexedDbService, fileName: string): Promise<boolean> {
  const datafiles: FacebookDataFile[] = await indexedDbService.getAllFacebookUserDataStores();
  return datafiles.some(file => file.filename === fileName);
}

/**
 * Initializes an empty FbUserDataModel object.
 * 
 * @returns An initialized FbUserDataModel object.
 */
function initializeUserDataModel(): FbUserDataModel {
  const userData: FbUserDataModel = {} as FbUserDataModel;

  // initialize sub-stores
  userData.activity_across_facebook = {} as FbActivityAcrossFacebookModel;
  userData.ads_and_businesses = {} as FbAdsInformationModel;
  userData.logged_information = {} as FbLoggedInformationModel;
  userData.personal_information = {} as FbPersonalInformationDataModel;
  userData.preferences = {} as FbPreferencesDataModel;
  userData.security_and_login_information = {} as FbSecurityLoginInformationDataModel;
  userData.apps_and_websites_off_of_fb = {} as FbAppsAndWebsitesOffOfFacebookDataModel;
  userData.connections = {} as FbConnectionsDataModel;
  return userData;
}

/**
 * Checks if the processing should be aborted.
 * 
 * @param abortSignal - The WritableSignal that indicates whether to abort.
 * @returns A promise that resolves to a boolean indicating whether to abort.
 */
async function shouldAbortProcessing(abortSignal: WritableSignal<boolean> | null): Promise<boolean> {
  if (abortSignal && abortSignal()) {
    abortSignal?.set(false);
    return true;
  }
  return false;
}

/**
 * Updates the progress signal with the current progress.
 * 
 * @param progressSignal - The WritableSignal to update with the progress.
 * @param current - The current progress value.
 * @param total - The total number of items to process.
 */
function updateProgress(progressSignal: WritableSignal<number> | null, current: number, total: number) {
  progressSignal?.set(Math.round(100 * (current / total)));
}

/**
 * Extracts the filename from a filepath.
 * 
 * @param filepath - The full filepath.
 * @returns The extracted filename or undefined if not found.
 */
function getFilename(filepath: string): string | undefined {
  return filepath.split('\\').pop()?.split('/').pop();
}

/**
 * Processes a non-JSON file and adds it to the mediafiles array.
 * 
 * @param mediafiles - The array to store processed media files.
 * @param zip - The JSZip object containing the files.
 * @param filepath - The path of the file to process.
 * @param fileName - The name of the uploaded file.
 * @param index - The index of the file in the processing order.
 */
async function processNonJsonFile(mediafiles: FacebookIndexedDBMedia[], zip: JSZip, filepath: string, fileName: string, index: number) {
  const fileBlob = await zip.files[filepath].async('blob');
  mediafiles.push({
    id: index,
    data_export_file: fileName,
    thread_path: filepath,
    file_type: filepath.split('.').pop() ?? '',
    file: fileBlob
  });
}

/**
 * Processes a JSON file and updates the user data accordingly.
 * 
 * @param userData - The user data to update.
 * @param filepath - The path of the file being processed.
 * @param filename - The name of the file being processed.
 * @param content - The content of the file being processed.
 */
function processJsonFile(userData: FbUserDataModel, filepath: string, filename: string, content: string) {
  const jsonData = parseFacebookJSON(content);

  // This object maps file names to functions that process the data
  const fileHandlers: Record<string, (data: any) => void> = {
    // Logged Information
    'your_topics.json': data => userData.logged_information.inferred_topics = data,
    'device_location.json': data => userData.logged_information.device_location = data,
    'primary_location.json': data => userData.logged_information.primary_location = data,
    'primary_public_location.json': data => userData.logged_information.primary_public_location = data,
    'notifications.json': data => userData.logged_information.notifications = data,
    'notification_of_meta_privacy_policy_update.json': data => userData.logged_information.meta_privacy_policy_update = data,
    'events_interactions.json': data => userData.logged_information.event_interaction = data,
    'ads_interests.json': data => userData.logged_information.ads_interest = data,
    'consents.json': data => userData.logged_information.consents = data,
    'survey_responses.json': data => userData.logged_information.survey_responses = data,
    'recently_visited.json': data => userData.logged_information.recently_visited = data,
    'recently_viewed.json': data => userData.logged_information.recently_viewed = data,
    'your_search_history.json': data => userData.logged_information.search_history = data,
    'people_and_friends.json': data => userData.logged_information.people_interaction = data,
    'group_interactions.json': data => userData.logged_information.group_interaction = data,

    // Ads and Businesses
    "advertisers_you've_interacted_with.json": data => userData.ads_and_businesses.advertiserInteracted = data,
    'your_recent_reported_conversions.json': data => userData.ads_and_businesses.recentReportedConversions = data,
    'ad_preferences.json': data => userData.ads_and_businesses.adPreferences = data,
    'subscription_for_no_ads.json': data => userData.ads_and_businesses.subscriptionsForNoAds = data,
    'other_categories_used_to_reach_you.json': data => userData.ads_and_businesses.otherCategoriesUsedToReachYou = data,
    'advertisers_using_your_activity_or_information.json': data => userData.ads_and_businesses.advertisersUsingYourData = data,

    // Apps and Websites off of Facebook
    'connected_apps_and_websites.json': data => userData.apps_and_websites_off_of_fb.connectedAppsAndWebsites = data,
    'your_activity_off_meta_technologies.json': data => userData.apps_and_websites_off_of_fb.offFacebookActivity = data,

    // Connections
    'received_friend_requests.json': data => userData.connections.receivedFriendRequests = data,
    'sent_friend_requests.json': data => userData.connections.sentFriendRequests = data,
    'rejected_friend_requests.json': data => userData.connections.rejectedFriendRequests = data,
    'your_friends.json': data => userData.connections.yourFriends = data,
    'removed_friends.json': data => userData.connections.removedFriends = data,
    "who_you've_followed.json": data => userData.connections.followed = data,
    'people_you_may_know.json': data => userData.connections.peopleYouMayKnow = data,

    // Personal Information
    'profile_information.json': data => userData.personal_information.profile_information = data,
    'your_address_books.json': data => userData.personal_information.address_books = data,

    // Security and Login Information
    'logins_and_logouts.json': data => userData.security_and_login_information.logins_and_logouts = data,
    'account_activity.json': data => userData.security_and_login_information.account_activity = data,
    'information_about_your_last_login.json': data => userData.security_and_login_information.last_login_information = data,
    'ip_address_activity.json': data => userData.security_and_login_information.ip_address_activity = data,
    'record_details.json': data => userData.security_and_login_information.record_details = data,
    'your_facebook_activity_history.json': data => userData.security_and_login_information.facebook_activity_history = data,
    'recognized_devices.json': data => userData.security_and_login_information.recognized_devices = data,
    'mobile_devices.json': data => userData.security_and_login_information.mobile_devices = data,
    'email_address_verifications.json': data => userData.security_and_login_information.email_address_verifications = data,
    'login_protection_data.json': data => userData.security_and_login_information.login_protection_data = data,
    'your_recent_account_recovery_successes.json': data => userData.security_and_login_information.recent_account_recovery_successes = data,
    "where_you're_logged_in.json": data => userData.security_and_login_information.login_location = data,
    'account_status_changes.json': data => userData.security_and_login_information.account_status_changes = data,

    // Preferences
    'feed.json': data => userData.preferences.feed = data,
    'controls.json': data => userData.preferences.feedControls = data,
    'your_fundraiser_settings.json': data => userData.preferences.fundraiserSettings = data,
    'reels_preferences.json': data => userData.preferences.reelsPreferences = data,
    'video.json': data => userData.preferences.videoPreferences = data,
    'your_device_push_settings.json': data => userData.preferences.devicePushSettings = data,
    'language_and_locale.json': data => userData.preferences.languageAndLocales = data,

    // Activity Across Facebook
    'your_badges.json': data => userData.activity_across_facebook.groupBadges = data,
    'your_group_membership_activity.json': data => userData.activity_across_facebook.groupsJoined = data,
    'your_comments_in_groups.json': data => userData.activity_across_facebook.groupComments = data,
    'your_groups.json': data => userData.activity_across_facebook.groupsAdmined = data,
    'comments.json': data => userData.activity_across_facebook.comments = data,
    'group_posts_and_comments.json': data => userData.activity_across_facebook.groupPosts = data,
    "pages_you've_liked.json": data => userData.activity_across_facebook.likedPages = data,
    'pages_and_profiles_you_follow.json': data => userData.activity_across_facebook.followedPagesAndProfiles = data,
    "pages_and_profiles_you've_unfollowed.json": data => userData.activity_across_facebook.unfollowedPages = data,
    'your_event_responses.json': data => userData.activity_across_facebook.eventResponses = data,
    'event_invitations.json': data => userData.activity_across_facebook.eventsInvited = data,
    "events_you've_hidden.json": data => userData.activity_across_facebook.eventsHidden = data,
    'your_uncategorized_photos.json': data => userData.activity_across_facebook.uncategorizedPhotos = data,
  };

  const endsWith = Object.keys(fileHandlers).find(key => filepath.endsWith(key));
  if (endsWith) {
    fileHandlers[endsWith](jsonData);
    return;
  }

  // Handle special cases
  if (filepath.endsWith('timezone.json')) {
    if (filepath.includes('location')) {
      userData.logged_information.timezone = jsonData;
    } else if (filepath.includes('profile')) {
      userData.personal_information.timezone = jsonData;
    }
  } else if (/your_posts__check_ins__photos_and_videos_[0-9]+\.json/.test(filename)) {
    userData.activity_across_facebook.posts ??= [];
    userData.activity_across_facebook.posts = [...jsonData];
  } else if (filepath.includes('posts') && filepath.includes('album') && /[0-9]\.json/.test(filename)) {
    userData.activity_across_facebook.albums ??= [];
    userData.activity_across_facebook.albums.push(jsonData);
  } else if (filename.startsWith('likes_and_reactions_')) {
    userData.activity_across_facebook.likesAndReactions ??= { likes_and_reactions: [] };
    userData.activity_across_facebook.likesAndReactions.likes_and_reactions = jsonData;
  } else if (filepath.endsWith('message_1.json')) {
    parseSingleMessageFile(filepath, content, userData);
  } else if (/message_([2-9]|\d{2,})\.json/.test(filename)) {
    parseMultiMessageFile(filepath, content, userData);
  }
}

/**
 * Saves the processed data to IndexedDB.
 * 
 * @param indexedDbService - The IndexedDbService to interact with the IndexedDB.
 * @param userData - The processed user data to save.
 * @param mediafiles - The processed media files to save.
 * @param fileName - The name of the uploaded file.
 * @param fileSizeInBytes - The size of the uploaded file in bytes.
 */
async function saveProcessedData(
  indexedDbService: IndexedDbService,
  userData: FbUserDataModel,
  mediafiles: FacebookIndexedDBMedia[],
  fileName: string,
  fileSizeInBytes: number
) {
  const userDataFile: FacebookDataFile = generateFaceBookDataFile(userData, fileName, fileSizeInBytes);
  await indexedDbService.bulkAddFacebookMediaFiles(mediafiles);
  await indexedDbService.addFacebookUserDataStore(userDataFile);
}
import JSZip from 'jszip';

import { WritableSignal } from '@angular/core';
import * as devicetypeUtils from '../../features/utils/devicetype.functions';
import * as utilities from '../../features/utils/generalUtilities.functions';
import type {
  InstaChatData,
  InstaChatPartnerData,
} from '../models/MessageInfo/InstaChatData';
import { UpdateInstaUserData } from './insta.action';
import type InstaUserDataModel from './models/insta-user-data-model.interface';

/**
 * Parses the uploaded Instagram data-download-zip file into the store
 * @author: Paul (pasch@mail.upb.de)
 *
 */
export async function parseInstagramFile(
  zipPromise: Promise<JSZip>,
  progressSignal: WritableSignal<number> | null = null,
  abortSignal: WritableSignal<boolean> | null = null,
) {
  const userData: InstaUserDataModel = {} as InstaUserDataModel;
  userData.chatData = [];

  const zip: JSZip = await zipPromise;

  const filepaths: string[] = Object.keys(zip.files);
  for (let i = 0; i < filepaths.length; i++) {
    if (abortSignal && abortSignal()) {
      abortSignal.set(false);
      return;
    }

    progressSignal?.set(Math.round(100 * (i / filepaths.length)));

    const filepath: string = filepaths[i];
    const content: string = await zip.files[filepath].async('string');
    const filename: string | undefined = filepath
      .split('\\')
      .pop()
      ?.split('/')
      .pop();

    if (!filename) {
      continue;
    }

    //add personal information
    if (filename.startsWith('personal_information')) {
      const jsonData = JSON.parse(content);
      const personalData = jsonData.profile_user[0].string_map_data;
      // Email Handling
      let email = '';
      if (personalData.Email !== undefined) {
        email = personalData.Email.value;
      } else if (personalData['Email address'] !== undefined) {
        email = utilities.getValueIgnoreCase(
          personalData,
          'Email address',
          false,
        );
      }

      const gender = utilities.getValueIgnoreCase(
        personalData,
        'Gender',
        false,
      );
      const birthdate = utilities.getValueIgnoreCase(
        personalData,
        'Date of birth',
        false,
      );
      userData.personalInfo = {
        username: personalData?.Username?.value,
        email,
        gender,
        birthdate,
      };
    } else if (filename.startsWith('account_information')) {
      const jsonData = JSON.parse(content);
      const accountData = jsonData.profile_account_insights[0].string_map_data;

      const contactSyncing = utilities.getValueIgnoreCase(
        accountData,
        'Contact Syncing',
        false,
      );
      const firstCountryCode = utilities.getValueIgnoreCase(
        accountData,
        'First Country Code',
        false,
      );
      const hasSharedLiveVideo = utilities.getValueIgnoreCase(
        accountData,
        'Has Shared Live Video',
        false,
      );
      const lastLogin = utilities.getValueIgnoreCase(
        accountData,
        'Last Login',
        true,
      );
      const lastLogout = utilities.getValueIgnoreCase(
        accountData,
        'Last Logout',
        true,
      );
      const firstStoryTime = utilities.getValueIgnoreCase(
        accountData,
        'First Story Time',
        true,
      );
      const lastStoryTime = utilities.getValueIgnoreCase(
        accountData,
        'Last Story Time',
        true,
      );
      const firstCloseFriendsStoryTime = utilities.getValueIgnoreCase(
        accountData,
        'First Close Friends Story Time',
        true,
      );
      userData.accountInfo = {
        contactSyncing,
        firstCountryCode,
        hasSharedLiveVideo,
        lastLogin,
        lastLogout,
        firstStoryTime,
        lastStoryTime,
        firstCloseFriendsStoryTime,
      };
    } else if (filename.startsWith('professional_information')) {
      const jsonData = JSON.parse(content);
      const profData = jsonData.profile_business[0];
      userData.professionalInfo = { title: profData.title };
    } else if (filename.startsWith('account_based_in')) {
      const jsonData = JSON.parse(content);
      const basedData =
        jsonData.inferred_data_primary_location[0].string_map_data;
      userData.basedInInfo = { accountBasedIn: basedData['City Name'].value };
    } else if (filename.startsWith('profile_changes')) {
      const jsonData = JSON.parse(content);
      const profileData = jsonData.profile_profile_change;
      userData.profileChanges = [];
      for (let i = 0; i < profileData.length; i++) {
        const changed = profileData[i].string_map_data.Changed.value;
        const previous_value = utilities.getValueIgnoreCase(
          profileData[i].string_map_data,
          'Previous Value',
          false,
        );
        const new_value = utilities.getValueIgnoreCase(
          profileData[i].string_map_data,
          'New Value',
          false,
        );
        const change_date = utilities.getValueIgnoreCase(
          profileData[i].string_map_data,
          'Change Date',
          true,
        );
        userData.profileChanges.push({
          title: profileData[i].title,
          changed,
          previous_value,
          new_value,
          change_date,
        });
      }
    }
    //add ads related data
    else if (filename.startsWith('ads_interests')) {
      const jsonData = JSON.parse(content);
      const adsInterestData = jsonData.inferred_data_ig_interest;
      userData.adsInterestInfo = [];
      for (let i = 0; i < adsInterestData.length; i++) {
        userData.adsInterestInfo.push({
          interest: utilities.getValueIgnoreCase(
            adsInterestData[i].string_map_data,
            'Interest',
            false,
          ),
        });
      }
    } else if (filename.startsWith('advertisers_using_your_activity')) {
      const jsonData = JSON.parse(content);
      const adsData = jsonData.ig_custom_audiences_all_types;
      userData.adsActivityInfo = [];
      for (let i = 0; i < adsData.length; i++) {
        userData.adsActivityInfo.push({
          advertiserName: adsData[i].advertiser_name,
          has_data_file_custom_audience:
            adsData[i].has_data_file_custom_audience,
          has_remarketing_custom_audience:
            adsData[i].has_remarketing_custom_audience,
          has_in_person_store_visit: adsData[i].has_in_person_store_visit,
        });
      }
    } else if (filename.startsWith('ads_clicked')) {
      const jsonData = JSON.parse(content);
      const adsClickedData = jsonData.impressions_history_ads_clicked;
      userData.adsClickedInfo = [];
      for (let i = 0; i < adsClickedData.length; i++) {
        userData.adsClickedInfo.push({
          title: adsClickedData[i].title,
          timestamp: adsClickedData[i].string_list_data[0].timestamp,
        });
      }
    } else if (filename.startsWith('ads_viewed')) {
      const jsonData = JSON.parse(content);
      const adsViewedData = jsonData.impressions_history_ads_seen;
      userData.adsViewedInfo = [];

      const author = utilities.getValueIgnoreCase(
        adsViewedData[0].string_map_data,
        'Author',
        false,
      );
      const timestamp = utilities.getValueIgnoreCase(
        adsViewedData[0].string_map_data,
        'Time',
        true,
      );
      for (let i = 0; i < adsViewedData.length; i++) {
        userData.adsViewedInfo.push({ title: author, timestamp });
      }

    } else if (filename.startsWith('signup_information.json')) {
      const jsonData = JSON.parse(content);
      const signup_data =
        jsonData.account_history_registration_info[0].string_map_data;

      const username = utilities.getValueIgnoreCase(
        signup_data,
        'Username',
        false,
      );
      const ip_address = utilities.getValueIgnoreCase(
        signup_data,
        'IP Address',
        false,
      );
      const time = utilities.getValueIgnoreCase(signup_data, 'Time', true);
      const email = utilities.getValueIgnoreCase(signup_data, 'Email', false);
      const phone_number = utilities.getValueIgnoreCase(
        signup_data,
        'Phone Number',
        false,
      );
      const device = utilities.getValueIgnoreCase(signup_data, 'Device', false);
      userData.signUpInfo = {
        username,
        ip_address,
        timestamp: time,
        email,
        phone_number,
        device,
        color: 'blue',
      };
    } else if (filename.startsWith('login_activity.json')) {
      const jsonData = JSON.parse(content);
      const loginData = jsonData.account_history_login_history;
      userData.loginInfo = [];
      for (let i = 0; i < loginData.length; i++) {
        const user_agent = utilities.getValueIgnoreCase(
          loginData[i].string_map_data,
          'User Agent',
          false,
        );
        userData.loginInfo.push({
          ip_address: utilities.getValueIgnoreCase(
            loginData[i].string_map_data,
            'IP Address',
            false,
          ),
          timestamp: utilities.getValueIgnoreCase(
            loginData[i].string_map_data,
            'Time',
            true,
          ),
          user_agent,
          type: 'Login',
          color: 'green',
          device: devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent),
        });
      }
    } else if (filename.startsWith('logout_activity.json')) {
      const jsonData = JSON.parse(content);
      const logoutData = jsonData.account_history_logout_history;
      userData.logoutInfo = [];
      for (let i = 0; i < logoutData.length; i++) {
        const user_agent = utilities.getValueIgnoreCase(
          logoutData[i].string_map_data,
          'User Agent',
          false,
        );
        userData.logoutInfo.push({
          user_agent,
          ip_address: utilities.getValueIgnoreCase(
            logoutData[i].string_map_data,
            'IP Address',
            false,
          ),
          timestamp: utilities.getValueIgnoreCase(
            logoutData[i].string_map_data,
            'Time',
            true,
          ),
          type: 'Logout',
          color: 'red',
          device: devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent),
        });
      }
    } else if (filename.startsWith('liked_comments')) {
      const jsonData = JSON.parse(content);
      const likedComments = jsonData.likes_comment_likes;
      userData.likedCommentsInfo = [];
      for (let i = 0; i < likedComments.length; i++) {
        userData.likedCommentsInfo.push({
          user: likedComments[i].title,
          href_link: likedComments[i].string_list_data[0].href,
          timestamp: likedComments[i].string_list_data[0].timestamp,
        });
      }
    } else if (filename.startsWith('liked_posts')) {
      const jsonData = JSON.parse(content);
      const likedPosts = jsonData.likes_media_likes;
      userData.likedPostsInfo = [];
      for (let i = 0; i < likedPosts.length; i++) {
        userData.likedPostsInfo.push({
          user: likedPosts[i].title,
          href_link: likedPosts[i].string_list_data[0].href,
          timestamp: likedPosts[0].string_list_data[0].timestamp,
        });
      }
    } else if (filename.startsWith('synced_contacts')) {
      const jsonData = JSON.parse(content);
      const contactsData = jsonData.contacts_contact_info;
      userData.contactInfo = [];
      for (let i = 0; i < contactsData.length; i++) {
        userData.contactInfo.push({
          firstName: contactsData[i].string_map_data['First name'].value,
          surname: contactsData[i].string_map_data['Surname'].value,
          contactInformation:
            contactsData[i].string_map_data['Contact information'].value,
        });
      }
    }
    //searches related data
    else if (filename.startsWith('account_searches')) {
      const jsonData = JSON.parse(content);
      const searchData = jsonData.searches_user;
      userData.userSearch = [];
      for (let i = 0; i < searchData.length; i++) {
        const mappingData = searchData[i].string_map_data;
        userData.userSearch.push({
          search: mappingData.Search.value,
          timestamp: mappingData.Time.timestamp,
        });
      }
    } else if (filename.startsWith('word_or_phrase_searches')) {
      const jsonData = JSON.parse(content);
      const searchData = jsonData.searches_keyword;
      userData.keywordSearch = [];
      for (let i = 0; i < searchData.length; i++) {
        const mappingData = searchData[i].string_map_data;
        userData.keywordSearch.push({
          search: mappingData.Search.value,
          timestamp: mappingData.Time.timestamp,
        });
      }
    } else if (filename.startsWith('tag_searches')) {
      const jsonData = JSON.parse(content);
      const searchData = jsonData.searches_hashtag;
      userData.tagSearch = [];
      for (let i = 0; i < searchData.length; i++) {
        const mappingData = searchData[i].string_map_data;
        userData.tagSearch.push({
          search: mappingData.Search.value,
          timestamp: mappingData.Time.timestamp,
        });
      }
    }
    //add follower information
    else if (filename.startsWith('followers_1')) {
      const jsonData = JSON.parse(content);
      userData.followerInfo = [];
      for (let i = 0; i < jsonData.length; i++) {
        const instaProfileURL = jsonData[i].string_list_data[0].href;
        const timestamp = jsonData[i].string_list_data[0].timestamp;
        const instaAccountName = jsonData[i].string_list_data[0].value;
        userData.followerInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }
    //add following information
    else if (filename.startsWith('following')) {
      const jsonData = JSON.parse(content);
      const followingData = jsonData.relationships_following;
      userData.followingInfo = [];
      for (let i = 0; i < followingData.length; i++) {
        const instaProfileURL = followingData[i].string_list_data[0].href;
        const timestamp = followingData[i].string_list_data[0].timestamp;
        const instaAccountName = followingData[i].string_list_data[0].value;
        userData.followingInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }
    //add blocked information
    else if (filename.startsWith('blocked_accounts')) {
      const jsonData = JSON.parse(content);
      const blockedData = jsonData.relationships_blocked_users;
      userData.blockedInfo = [];
      for (let i = 0; i < blockedData.length; i++) {
        const instaProfileURL = blockedData[i].string_list_data[0].href;
        const timestamp = blockedData[i].string_list_data[0].timestamp;
        const instaAccountName = blockedData[i].title;
        userData.blockedInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }
    //Shopping related information
    else if (filename.startsWith('recently_viewed_items.json')) {
      const jsonData = JSON.parse(content);
      const shoppingData = jsonData.checkout_saved_recently_viewed_products;
      userData.shoppingInfo = [];
      for (let i = 0; i < shoppingData.length; i++) {
        userData.shoppingInfo.push({
          merchantName: utilities.getValueIgnoreCase(
            shoppingData[i].string_map_data,
            'Merchant Name',
            false,
          ),
          productName: utilities.getValueIgnoreCase(
            shoppingData[i].string_map_data,
            'Product Name',
            false,
          ),
        });
      }
    }
    //Shopping wishlist related information
    else if (filename.startsWith('wishlist_items.json')) {
      const jsonData = JSON.parse(content);
      const shoppingWishListData = jsonData.checkout_saved_products;
      userData.shoppingWishlistInfo = [];
      for (let i = 0; i < shoppingWishListData.length; i++) {
        userData.shoppingWishlistInfo.push({
          productName: utilities.getValueIgnoreCase(
            shoppingWishListData[i].string_map_data,
            'Product Name',
            false,
          ),
          merchantName: utilities.getValueIgnoreCase(
            shoppingWishListData[i].string_map_data,
            'Merchant Name',
            false,
          ),
        });
      }
    }

    //add recent follow information
    else if (filename.startsWith('recent_follow_requests')) {
      const jsonData = JSON.parse(content);
      const recentFollowData = jsonData.relationships_permanent_follow_requests;
      userData.recentFollowInfo = [];
      for (let i = 0; i < recentFollowData.length; i++) {
        const instaProfileURL = recentFollowData[i].string_list_data[0].href;
        const timestamp = recentFollowData[i].string_list_data[0].timestamp;
        const instaAccountName = recentFollowData[i].string_list_data[0].value;
        userData.recentFollowInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }
    //add pending follow request information
    else if (filename.startsWith('pending_follow_requests')) {
      const jsonData = JSON.parse(content);
      const pendingFollowData = jsonData.relationships_follow_requests_sent;
      userData.pendingFollowRequestInfo = [];
      for (let i = 0; i < pendingFollowData.length; i++) {
        const instaProfileURL = pendingFollowData[i].string_list_data[0].href;
        const timestamp = pendingFollowData[i].string_list_data[0].timestamp;
        const instaAccountName = pendingFollowData[i].string_list_data[0].value;
        userData.pendingFollowRequestInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }
    //add recently unfollowed accounts information
    else if (filename.startsWith('recently_unfollowed_accounts')) {
      const jsonData = JSON.parse(content);
      const recentlyUnfollowData = jsonData.relationships_unfollowed_users;
      userData.recentlyUnfollowedInfo = [];
      for (let i = 0; i < recentlyUnfollowData.length; i++) {
        const instaProfileURL =
          recentlyUnfollowData[i].string_list_data[0].href;
        const timestamp = recentlyUnfollowData[i].string_list_data[0].timestamp;
        const instaAccountName =
          recentlyUnfollowData[i].string_list_data[0].value;
        userData.recentlyUnfollowedInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }

    //add removed suggestion information
    else if (filename.startsWith('removed_suggestions')) {
      const jsonData = JSON.parse(content);
      const removedSuggestionData =
        jsonData.relationships_dismissed_suggested_users;
      userData.removedSuggestionInfo = [];
      for (let i = 0; i < removedSuggestionData.length; i++) {
        const instaProfileURL =
          removedSuggestionData[i].string_list_data[0].href;
        const timestamp =
          removedSuggestionData[i].string_list_data[0].timestamp;
        const instaAccountName =
          removedSuggestionData[i].string_list_data[0].value;
        userData.removedSuggestionInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }

    //add received follow request information
    else if (filename.startsWith("follow_requests_you've_received")) {
      const jsonData = JSON.parse(content);
      const receivedRequestData =
        jsonData.relationships_follow_requests_received;
      userData.receivedFollowRequestInfo = [];
      for (let i = 0; i < receivedRequestData.length; i++) {
        const instaProfileURL = receivedRequestData[i].string_list_data[0].href;
        const timestamp = receivedRequestData[i].string_list_data[0].timestamp;
        const instaAccountName =
          receivedRequestData[i].string_list_data[0].value;
        userData.receivedFollowRequestInfo.push({
          instaProfileURL,
          instaAccountName,
          timestamp,
        });
      }
    }

    //your topic data
    else if (filename.startsWith('your_topics')) {
      const jsonData = JSON.parse(content);
      const yourTopicData = jsonData.topics_your_topics;
      userData.topicsInfo = [];
      for (let i = 0; i < yourTopicData.length; i++) {
        userData.topicsInfo.push({
          topic: utilities.getValueIgnoreCase(
            yourTopicData[i].string_map_data,
            'Name',
            false,
          ),
        });
      }
    }

    //ChatDataInformation
    else if (filename.startsWith('message_1')) {
      const jsonData = JSON.parse(content);
      const otherMessagesPerUser: { [id: string]: InstaChatPartnerData } = {};
      jsonData.participants.forEach((participant: any) => {
        otherMessagesPerUser[participant.name] = {
          sender: participant.name,
          messages: 0,
          avg: 0,
          text: 0,
          share: 0,
          audio: 0,
          photos: 0,
          monday: 0,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
          sunday: 0,
        };
      });
      jsonData.messages.forEach((message: any) => {
        if (message.content == undefined) {
          return;
        }
        if (otherMessagesPerUser[message.sender_name] == undefined) {
          otherMessagesPerUser[message.sender_name] = {
            sender: message.sender_name,
            messages: 0,
            avg: 0,
            text: 0,
            share: 0,
            audio: 0,
            photos: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
          };
        }
        otherMessagesPerUser[message.sender_name].messages++;

        if (message.share != undefined) {
          otherMessagesPerUser[message.sender_name].share++;
        } else if (message.audio_files != undefined) {
          otherMessagesPerUser[message.sender_name].audio++;
        } else if (message.photos != undefined) {
          otherMessagesPerUser[message.sender_name].photos++;
        } else {
          otherMessagesPerUser[message.sender_name].avg =
            (otherMessagesPerUser[message.sender_name].text *
              otherMessagesPerUser[message.sender_name].avg +
              message.content.length) /
            (otherMessagesPerUser[message.sender_name].text + 1);

          otherMessagesPerUser[message.sender_name].text++;
        }

        switch (new Date(message.timestamp_ms).getDay()) {
          case 0:
            otherMessagesPerUser[message.sender_name].sunday++;
            break;
          case 1:
            otherMessagesPerUser[message.sender_name].monday++;
            break;
          case 2:
            otherMessagesPerUser[message.sender_name].tuesday++;
            break;
          case 3:
            otherMessagesPerUser[message.sender_name].wednesday++;
            break;
          case 4:
            otherMessagesPerUser[message.sender_name].thursday++;
            break;
          case 5:
            otherMessagesPerUser[message.sender_name].friday++;
            break;
          case 6:
            otherMessagesPerUser[message.sender_name].saturday++;
            break;
        }
      });
      const yourName =
        jsonData.participants[jsonData.participants.length - 1].name;
      const chatData: InstaChatData = {
        chat: jsonData.title,
        yourMessages: otherMessagesPerUser[yourName].messages,
        monday: otherMessagesPerUser[yourName].monday,
        tuesday: otherMessagesPerUser[yourName].tuesday,
        wednesday: otherMessagesPerUser[yourName].wednesday,
        thursday: otherMessagesPerUser[yourName].thursday,
        friday: otherMessagesPerUser[yourName].friday,
        saturday: otherMessagesPerUser[yourName].saturday,
        sunday: otherMessagesPerUser[yourName].sunday,
        otherMessages: [],
      };
      delete otherMessagesPerUser[yourName];
      for (const otherMessagesPerUserKey in otherMessagesPerUser) {
        chatData.otherMessages.push(
          otherMessagesPerUser[otherMessagesPerUserKey],
        );
      }
      userData.chatData.push(chatData);
    }
  }

  if (abortSignal && abortSignal()) {
    abortSignal.set(false);
    return;
  }

  return new UpdateInstaUserData(userData);
}

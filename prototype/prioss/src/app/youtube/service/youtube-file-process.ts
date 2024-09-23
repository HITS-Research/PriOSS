import JSZip from 'jszip';
import {WritableSignal} from '@angular/core';
import {UpdateYouTubeUserData} from "../state/youtube.action";
import {parseCSVData} from "../../features/utils/csv-parser.function";
import YouTubeUserDataModel from "../state/models/youtube-user-data.model";
import {
  YouTubeChatData,
  YouTubeCommentData,
  YouTubeSubscriptionData,
  YouTubeUserChannelConfigData,
  YouTubeUserChannelData,
  YouTubeUserChannelUrlConfigData,
  YouTubeUserPlaylistMetadata,
  YouTubeUserSearchHistoryData,
  YouTubeUserVideoData,
  YouTubeUserVideoDescriptionData,
  YouTubeUserVideoMetaData,
  YouTubeUserWatchHistoryData
} from "../models";


export async function parseYoutubeFile(
  zipPromise: Promise<JSZip>,
  progressSignal: WritableSignal<number> | null = null,
  abortSignal: WritableSignal<boolean> | null = null,
) {
  const userdata = {} as YouTubeUserDataModel;
  userdata.playlists = [];
  const zip: JSZip = await zipPromise;

  const filepaths: string[] = Object.keys(zip.files);
  let picUrl = "error"
  for (let i = 0; i < filepaths.length; i++) {
    if (abortSignal && abortSignal()) {
      abortSignal.set(false);
      return;
    }
    progressSignal?.set(Math.round(100 * (i / filepaths.length)));
    const filepath: string = filepaths[i];
      if (filepath.endsWith("ProfilePhoto.jpg")) {
          picUrl = filepath;
        const mediaContent: Blob = await zip.files[filepath].async('blob');
        const reader = new FileReader();
        reader.onload = () => {
          picUrl = reader.result as string;
        };
        reader.readAsDataURL(mediaContent);
      }
    if (filepath.endsWith(".json")) {
      const data = JSON.parse(await zip.files[filepath].async('string'));
      if (filepath.endsWith("Profile.json")) {
        const emails: string[] = [];
        for (let i = 0; i < data.emails.length; i++) {
          emails.push(data.emails[i].value);
        }
        userdata.profileData = {
          firstName: data.name["givenName"] || "",
          lastName: data.name["familyName"] || "",
          displayName: data.displayName || "",
          gender: data.gender.type || "Not Defined",
          pictureSrc : picUrl,
          emails
        }
      } else if (filepath.endsWith("search-history.json")) {
        const searchHistory: YouTubeUserSearchHistoryData[] = [];
        for (let i = 0; i < data.length; i++) {
          if(data[i].title.startsWith("Searched for")){
            searchHistory.push({text: data[i].title?.replace("Searched for","").trim() || "", timestamp: data[i].time, url: data[i].titleUrl});
          }
        }
        userdata.searchHistory = searchHistory;
      } else if (filepath.endsWith("watch-history.json")) {
        const watchHistory: YouTubeUserWatchHistoryData[] = [];
        for (let i = 0; i < data.length; i++) {
          if(data[i].details === undefined && data[i].title.startsWith("Watched")){
            watchHistory.push({
              title: data[i].title?.replace("Watched","").trim() || "",
              videoUrl: data[i]?.titleUrl,
              channelName: data[i].subtitles && data[i].subtitles.length ? data[i]?.subtitles[0].name : "Undefined",
              channelUrl: data[i].subtitles && data[i].subtitles.length ? data[i]?.subtitles[0].url : "Undefined",
              timestamp: data[i]?.time
            });
          }
        }
        userdata.watchHistory = watchHistory;
      }
    } else if (filepath.endsWith(".csv")) {
      const data = await parseCSVData(zip.files[filepath]);
      if (filepath.endsWith("subscriptions.csv")) {
        userdata.subscriptionData = (data.map((subscriptionData) => {
          return {
            channelId: subscriptionData['Channel Id'],
            channelUrl: subscriptionData['Channel Url'],
            channelTitle: subscriptionData['Channel Title']
          }
        }) || []) as YouTubeSubscriptionData[];
      } else if (filepath.endsWith("comments.csv")) {
        userdata.commentsData = (data.map((commentData) => {
          return {
            channelId: commentData['Channel ID'],
            timestamp: commentData['Comment Create Timestamp'],
            price: commentData['Price'],
            commentId: commentData['Comment ID'],
            videoId: commentData['Video ID'],
            comment: JSON.parse(commentData['Comment Text'])['text']
          }
        }) || []) as YouTubeCommentData[];
      } else if (filepath.endsWith("live chats.csv")) {
        userdata.chats = (data.map((chat) => {
          return {
            chatId: chat['Live Chat ID'],
            channelId: chat['Channel ID'],
            videoId: chat['Video ID'],
            timestamp: chat['Live Chat Create Timestamp'],
            price: chat['Price'],
            message: JSON.parse(chat['Live Chat Text'])['text']
          }
        }) || []) as YouTubeChatData[];
      } else if (filepath.endsWith("channel.csv")) {
        userdata.channels = (data.map((channel) => {
          return {
            channelId: channel['Channel ID'],
            title: channel['Channel Title (Original)'],
            visibility: channel['Channel Visibility'],
          }
        }) || []) as YouTubeUserChannelData[];
      } else if (filepath.endsWith("channel feature data.csv")) {
        userdata.channelsConfig = (data.map((channelConfig) => {
          return {
            channelId: channelConfig['Channel ID'],
            autoModerationInChat: channelConfig['Channel Auto Moderation in Live Chat'] === "true",
            allowedCommentsType: channelConfig['Video Default Allowed Comments Type'],
            targetAudience: channelConfig['Video Default Targeted Audience'],
            license: channelConfig['Video Default License'],
            longitude: channelConfig['Video Default Location Longitude'],
            latitude: channelConfig['Video Default Location Latitude'],
          }
        }) || []) as YouTubeUserChannelConfigData[];
      } else if (filepath.endsWith("channel URL configs.csv")) {
        userdata.channelsUrlConfig = (data.map((channelConfig) => {
          return {
            channelId: channelConfig['Channel ID'],
            url1Name: channelConfig['Channel Vanity URL 1 Name'],
          }
        }) || []) as YouTubeUserChannelUrlConfigData[];
      } else if (filepath.endsWith("video recordings.csv")) {
        userdata.videos = (data.map((video) => {
          return {
            videoId: video['Video ID'],
            altitude: video['Video Recording Altitude'],
            latitudeL: video['Video Recording Latitude'],
            longitude: video['Video Recording Longitude'],
          }
        }) || []) as YouTubeUserVideoData[];
      } else if (filepath.endsWith("video texts.csv")) {
        userdata.videosDescription = (data.map((video) => {
          return {
            videoId: video['Video ID'],
            timestamp: video['Video Text Create Timestamp'],
            description: video['Video Description Text Segments 1'],
            title: video['Video Title Text Segments 1'],
            lastUpdateTimestamp: video['Video Text Update Timestamp'],
          }
        }) || []) as YouTubeUserVideoDescriptionData[];
      } else if (filepath.endsWith("/videos.csv")) {
        userdata.videosMetaData = (data.map((video) => {
          return {
            videoId: video['Video ID'],
            length: +video['Approx Duration (ms)'],
            category: video['Video Category'],
            description: video['Video Description (Original)'],
            channelId: video['Channel ID'],
            title: video['Video Title (Original)'],
            privacy: video['Privacy'],
            state: video['Video State'],
            creationTimestamp: video['Video Create Timestamp'],
            publishTimestamp: video['Video Publish Timestamp'],
          }
        }) || []) as YouTubeUserVideoMetaData[];
      } else if (filepath.endsWith("/playlists.csv")) {
        userdata.playlistsMetaData = (data.map((playlistMeta) => {
          return {
            playlistId: playlistMeta['Playlist ID'],
            addOnTop: playlistMeta['Add new videos to top'] === "True",
            title: playlistMeta['Playlist Title (Original)'],
            language: playlistMeta['Playlist Title (Original) Language'],
            creationTimestamp: playlistMeta['Playlist Create Timestamp'],
            lastUpdateTimestamp: playlistMeta['Playlist Update Timestamp'],
            videoOrder: playlistMeta['Playlist Video Order'],
            visibility: playlistMeta['Playlist Visibility']
          }
        }) || []) as YouTubeUserPlaylistMetadata[];
      } else if (filepath.endsWith("-videos.csv")) {
        const match = filepath.match(/([^/]+)-[^/]+\.csv$/)
        userdata.playlists.push({
          playlistName: match ? match[1] : "Undefined",
          videos: (data.map((video) => {
            return {
              videoId: video['Video ID'],
              timestamp: video['Playlist Video Creation Timestamp']
            }
          }) || [])
        });
      }
    }
  }
  userdata.profileData.pictureSrc = picUrl;

  if (abortSignal && abortSignal()) {
    abortSignal.set(false);
    return;
  }
  return new UpdateYouTubeUserData(userdata);
}


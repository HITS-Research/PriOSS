import {
  YouTubeChatData,
  YouTubeCommentData,
  YouTubeProfileData,
  YouTubeSubscriptionData,
  YouTubeUserChannelConfigData,
  YouTubeUserChannelData,
  YouTubeUserChannelUrlConfigData, YouTubeUserPlaylistData, YouTubeUserPlaylistMetadata, YouTubeUserSearchHistoryData,
  YouTubeUserVideoData,
  YouTubeUserVideoDescriptionData,
  YouTubeUserVideoMetaData, YouTubeUserWatchHistoryData
} from "../../models";
import YoutubeHistoryGraphData from "../../models/youtube-history-graph-data-model.interface";
import YouTubeWatchHistoryPieChartData from "../../models/youtube-watch-history-pie-chart-data-model.interface";

export default interface YouTubeUserDataModel {
  profileData: YouTubeProfileData;
  subscriptionData: YouTubeSubscriptionData[];
  commentsData: YouTubeCommentData[];
  chats: YouTubeChatData[];
  channels: YouTubeUserChannelData[];
  channelsConfig: YouTubeUserChannelConfigData[];
  channelsUrlConfig: YouTubeUserChannelUrlConfigData[];
  videos: YouTubeUserVideoData[];
  videosDescription: YouTubeUserVideoDescriptionData[];
  videosMetaData: YouTubeUserVideoMetaData[];
  playlists: YouTubeUserPlaylistData[];
  playlistsMetaData: YouTubeUserPlaylistMetadata[];
  searchHistory: YouTubeUserSearchHistoryData[];
  watchHistory: YouTubeUserWatchHistoryData[];
  historyGraphData: YoutubeHistoryGraphData;
  recentSearchHistory:string[];
  recentWatchHistory:string[];
  watchHistoryChannelPieData:YouTubeWatchHistoryPieChartData[];
}

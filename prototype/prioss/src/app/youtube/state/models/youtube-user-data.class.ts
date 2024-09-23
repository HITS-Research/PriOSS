import {
  YouTubeChatData,
  YouTubeCommentData, YoutubeHistoryGraphData,
  YouTubeProfileData,
  YouTubeSubscriptionData,
  YouTubeUserChannelConfigData,
  YouTubeUserChannelData,
  YouTubeUserChannelUrlConfigData,
  YouTubeUserPlaylistData,
  YouTubeUserPlaylistMetadata,
  YouTubeUserSearchHistoryData,
  YouTubeUserVideoData,
  YouTubeUserVideoDescriptionData,
  YouTubeUserVideoMetaData,
  YouTubeUserWatchHistoryData, YouTubeWatchHistoryPieChartData
} from "../../models";
import YouTubeUserDataModel from "./youtube-user-data.model";
import {DataRangeCalculatorService} from "../../../instagram/service/echarts/data-range-calculator.service";

export default class YouTubeUserData implements YouTubeUserDataModel {
  constructor(userData: YouTubeUserDataModel, private rangeCalculator: DataRangeCalculatorService) {
    this.profileData = userData.profileData;
    this.subscriptionData = userData.subscriptionData;
    this.commentsData = userData.commentsData;
    this.chats = userData.chats;
    this.channelsConfig = userData.channelsConfig;
    this.channelsUrlConfig = userData.channelsUrlConfig;
    this.videos = userData.videos;
    this.videosDescription = userData.videosDescription;
    this.videosMetaData = userData.videosMetaData;
    this.playlists = userData.playlists;
    this.playlistsMetaData = userData.playlistsMetaData;
    this.constructHistoryGraphdata(userData.searchHistory, userData.watchHistory);
    this.extractRecentSearchHistory(userData.searchHistory);
    this.extractRecentWatchHistory(userData.watchHistory);
    this.constructWatchHistoryChannelPieData(userData.watchHistory);
  }

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
  recentSearchHistory:string[] = [];
  recentWatchHistory:string[] = [];
  watchHistoryChannelPieData:YouTubeWatchHistoryPieChartData[] = [];

  private constructHistoryGraphdata(searchHistory: YouTubeUserSearchHistoryData[], watchHistory: YouTubeUserWatchHistoryData[]) {
    const searchHistoryData = searchHistory.map((searchHistoryData) => searchHistoryData.timestamp);
    const watchHistoryData = watchHistory.map(watchHistoryData => watchHistoryData.timestamp);
    const dateRange = this.rangeCalculator.getDateRangeArray([...searchHistoryData, ...watchHistoryData], false, true);
    this.historyGraphData = {
      dateRange,
      searchData: this.rangeCalculator.countOccurrencesInRange(dateRange,searchHistoryData,false, true),
      watchData: this.rangeCalculator.countOccurrencesInRange(dateRange,watchHistoryData,false, true),
    }
  }

  private extractRecentSearchHistory(searchHistory: YouTubeUserSearchHistoryData[]) {
    const data = searchHistory.map((data)=>data.text);
    this.recentSearchHistory = data.length>50?data.slice(0,50):data;
  }

  private extractRecentWatchHistory(watchHistory: YouTubeUserWatchHistoryData[]) {
    const data = watchHistory.map((data)=>data.title);
    this.recentWatchHistory = data.length>50?data.slice(0,50):data;
  }

  private constructWatchHistoryChannelPieData(watchHistory: YouTubeUserWatchHistoryData[]) {
    const pieData: Map<string, number> = new Map();
    let othersFreq = watchHistory.length;
    watchHistory.forEach((data)=>{
      const channelFreq =  pieData.get(data.channelName) ?? 0;
      pieData.set(data.channelName, channelFreq+1);
    });
    [...pieData.entries()].filter((entry)=>entry[0]!=='Undefined').sort((a, b) => b[1] - a[1]).slice(0,19).forEach((item)=>{
      othersFreq-=item[1];
      this.watchHistoryChannelPieData.push({name:item[0],value:item[1]});
    });
    this.watchHistoryChannelPieData.push({name:'Others',value:othersFreq});
  }
}

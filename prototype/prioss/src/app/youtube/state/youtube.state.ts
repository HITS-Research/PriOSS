import {Action, Selector, State, StateContext} from '@ngxs/store';
import { Injectable } from '@angular/core';
import {ResetYouTubeUserData, UpdateYouTubeUserData} from "./youtube.action";
import YouTubeStateModel from "./models/youtube-state.model";
import YouTubeUserData from "./models/youtube-user-data.class";
import YouTubeUserDataModel from "./models/youtube-user-data.model";
import {
  YouTubeChatData, YouTubeCommentData, YoutubeHistoryGraphData, YouTubeProfileData, YouTubeSubscriptionData,
  YouTubeUserPlaylistData,
  YouTubeUserPlaylistMetadata, YouTubeWatchHistoryPieChartData,
} from "../models";
import {CustomStorageService} from "./custom-storage/service/custom-storage.service";
import {YoutubeUserDataKeys} from "./custom-storage/youtube-user-data-keys";
import {DataRangeCalculatorService} from "../../instagram/service/echarts/data-range-calculator.service";

@State<YouTubeStateModel>({
  name: 'youtube',
  defaults: {
    userData: []
  },
})

@Injectable()
export class YouTubeState {

  constructor(private storageService:CustomStorageService,  private rangeCalculator: DataRangeCalculatorService) { }

  @Selector()
  static getUserData(state: YouTubeStateModel): YouTubeUserDataModel {
    return state.userData[state.userData.length-1];
  }

  @Selector()
  static getUserPlaylists(state: YouTubeStateModel): YouTubeUserPlaylistData[] {
    return state.userData[state.userData.length-1].playlists;
  }

  @Selector()
  static getUserPlaylistsMeta(state: YouTubeStateModel): YouTubeUserPlaylistMetadata[] {
    return state.userData[state.userData.length-1].playlistsMetaData;
  }
  @Selector()
  static getUserHistoryGraphData(state: YouTubeStateModel): YoutubeHistoryGraphData {
    return state.userData[state.userData.length-1].historyGraphData;
  }

  @Selector()
  static getUserRecentSearchHistory(state: YouTubeStateModel): string[] {
    return state.userData[state.userData.length-1].recentSearchHistory;
  }

  @Selector()
  static getUserRecentWatchHistory(state: YouTubeStateModel): string[] {
    return state.userData[state.userData.length-1].recentWatchHistory;
  }

  @Selector()
  static getUserWatchHistoryPieData(state: YouTubeStateModel): YouTubeWatchHistoryPieChartData[] {
    return state.userData[state.userData.length-1].watchHistoryChannelPieData;
  }

  @Selector()
  static getUserMessages(state: YouTubeStateModel): YouTubeChatData[] {
    return state.userData[state.userData.length-1].chats;
  }


  @Selector()
  static getUserComments(state: YouTubeStateModel): YouTubeCommentData[] {
    return state.userData[state.userData.length-1].commentsData;
  }

  @Selector()
  static getSubscriptions(state: YouTubeStateModel): YouTubeSubscriptionData[] {
    return state.userData[state.userData.length-1].subscriptionData;
  }

  @Selector()
  static getUserProfile(state: YouTubeStateModel): YouTubeProfileData {
    return state.userData[state.userData.length-1].profileData;
  }

  @Action(UpdateYouTubeUserData)
  updateUser(ctx: StateContext<YouTubeStateModel>, { userData }: UpdateYouTubeUserData) {
    //secondary storage IDB
    YoutubeUserDataKeys.forEach((key)=>{
      this.storageService.add(key,JSON.stringify(userData[key]));
    })
    //primary Storage Store
    const state = ctx.getState();
    const newState = {
      ...state,
      userData: [...state.userData, new YouTubeUserData(userData, this.rangeCalculator)]
    };
    ctx.setState(newState);
  }

  @Action(ResetYouTubeUserData)
  resetUser(ctx: StateContext<YouTubeStateModel>) {
    ctx.setState({ userData: [] } as YouTubeStateModel);
  }
}

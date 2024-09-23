import {Action, Selector, State, StateContext} from "@ngxs/store";
import { AppStateModel, } from "./models";
import { Injectable } from "@angular/core";
import { InstaState } from "../instagram/state/insta.state";
import { FacebookState } from "../facebook/state/fb.state";
import { SpotifyState } from "../spotify/state/spotify.state";
import {YouTubeState} from "../youtube/state/youtube.state";
import {SetNetworkStatus} from "./app.action";


@State<AppStateModel>({
  name: 'PriOSS',
  defaults: {
    networkStatus: true,
  },
  children: [InstaState, FacebookState, SpotifyState, YouTubeState],
})
@Injectable()
export class AppState {
  @Selector()
  static networkStatus(state: AppStateModel) {
    return state.networkStatus;
  }

  @Action(SetNetworkStatus)
  setNetworkStatus(ctx: StateContext<AppStateModel>, action: SetNetworkStatus) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      networkStatus: action.networkStatus,
    });
  }
}

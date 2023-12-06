import {State} from "@ngxs/store";
import {AppStateModel,} from "./models";
import {Injectable} from "@angular/core";
import {InstaState} from "../instagram/state/insta.state";
import {FbState} from "../facebook/state/fb.state";
import {SpotState} from "../spotify/state/spot.state";


@State<AppStateModel>({
  name: 'app',
  defaults: {
  },
  children: [InstaState, FbState, SpotState],
})
@Injectable()
export class AppState {

  constructor() {
  }

}

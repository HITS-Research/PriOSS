import {Action, State, StateContext} from '@ngxs/store';
import {SpotStateModel} from "./models";
import {Injectable} from "@angular/core";
import {ResetSpotUserData} from "./spot.action";


@State<SpotStateModel>({
  name: 'spot',
  defaults: {},
})

@Injectable()
export class SpotState {

  constructor() {
  }

  @Action(ResetSpotUserData)
  resetUser(ctx: StateContext<SpotStateModel>) {
    ctx.setState({} as SpotStateModel);
  }

}

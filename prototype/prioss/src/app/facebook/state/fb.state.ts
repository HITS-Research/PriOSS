import {Action, State, StateContext} from '@ngxs/store';
import {FbStateModel} from "./models";
import {Injectable} from "@angular/core";
import {ResetFbUserData} from "./fb.action";


@State<FbStateModel>({
  name: 'fb',
  defaults: {
  },
})

@Injectable()
export class FbState {
  constructor() {
  }

  @Action(ResetFbUserData)
  resetUser(ctx: StateContext<FbStateModel>) {
    ctx.setState({} as FbStateModel);
  }
}

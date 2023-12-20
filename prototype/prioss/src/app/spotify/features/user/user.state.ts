import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadUserFromZip, SpotifyResetUser } from './user.actions';
import { SpotifyUserStateModel } from './user.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyUserStateModel = {};

/**
 * The state of user data of the users zip file.
 */
@State<SpotifyUserStateModel>({
  name: 'spotifyUser',
  defaults: defaults,
})
@Injectable()
export class SpotifyUserState {

  /**
   * Resets the User-State.
   */
  @Action(SpotifyResetUser)
  resetUser(context: StateContext<SpotifyUserStateModel>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the User-State by the given zip file.
   */
  @Action(SpotifyReadUserFromZip)
  async readUserFromZip(
    context: StateContext<SpotifyUserStateModel>,
    { zip }: SpotifyReadUserFromZip
  ) {
    const FILE_NAME = 'Userdata.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    const data = JSON.parse(await file.async('string'));
    context.setState(data);
  }
}

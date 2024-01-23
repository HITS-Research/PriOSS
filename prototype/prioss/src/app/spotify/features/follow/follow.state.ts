import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadFollowFromZip, SpotifyResetFollow } from './follow.actions';
import { SpotifyFollowStateModel } from './follow.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyFollowStateModel = {
  dismissingUsersCount: 0,
  followerCount: 0,
  followingUsersCount: 0,
};

/**
 * The state of follow data of the users zip file.
 */
@State<SpotifyFollowStateModel>({
  name: 'spotifyFollow',
  defaults: defaults,
})
@Injectable()
export class SpotifyFollowState {

  /**
   * Resets the Follow-State.
   */
  @Action(SpotifyResetFollow)
  resetFollow(context: StateContext<SpotifyFollowStateModel>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Follow-State by the given zip file.
   */
  @Action(SpotifyReadFollowFromZip)
  async readFollowFromZip(
    context: StateContext<SpotifyFollowStateModel>,
    { zip }: SpotifyReadFollowFromZip
  ) {
    // TODO: Check name in other zips
    const FILE_NAME: string = 'Follow.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    const fileContent: SpotifyFollowStateModel = JSON.parse(
      await file.async('string')
    );
    context.setState(fileContent);
  }

}

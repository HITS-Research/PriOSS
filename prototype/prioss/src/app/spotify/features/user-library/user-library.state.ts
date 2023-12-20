import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadUserLibraryFromZip, SpotifyResetUserLibrary } from './user-library.actions';
import { SpotifyUserLibraryStateModel } from './user-library.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyUserLibraryStateModel = {
  albums: [],
  artists: [],
  bannedArtists: [],
  tracks: [],
  bannedTracks: [],
  shows: [],
  episodes: [],
  other: []
};

/**
 * The state of library state data of the users zip file.
 */
@State<SpotifyUserLibraryStateModel>({
  name: 'spotifyUserLibrary',
  defaults: defaults,
})
@Injectable()
export class SpotifyUserLibraryState {

  /**
   * Resets the User-Library-State.
   */
  @Action(SpotifyResetUserLibrary)
  resetUserLibrary(context: StateContext<SpotifyUserLibraryStateModel>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the User-Library-State by the given zip file.
   */
  @Action(SpotifyReadUserLibraryFromZip)
  async readUserLibraryFromZip(
    context: StateContext<SpotifyUserLibraryStateModel>,
    { zip }: SpotifyReadUserLibraryFromZip
  ) {
    const FILE_NAME: string = 'YourLibrary.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    const fileContent: SpotifyUserLibraryStateModel = JSON.parse(
      await file.async('string')
    );

    context.setState(fileContent);
  }

}

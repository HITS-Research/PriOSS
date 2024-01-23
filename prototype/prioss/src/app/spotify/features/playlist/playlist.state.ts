import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadPlaylistsFromZip, SpotifyResetPlaylists } from './playlist.actions';
import { SpotifyPlaylistsStateModel } from './playlist.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyPlaylistsStateModel[] = [];

/**
 * The state of playlist data of the users zip file.
 */
@State<SpotifyPlaylistsStateModel[]>({
  name: 'spotifyPlayList',
  defaults: defaults,
})
@Injectable()
export class SpotifyPlaylistState {

  /**
   * Resets the Playlist-State.
   */
  @Action(SpotifyResetPlaylists)
  resetPlayList(context: StateContext<SpotifyPlaylistsStateModel[]>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Playlist-State by the given zip file.
   */
  @Action(SpotifyReadPlaylistsFromZip)
  async readPlayListFromZip(
    context: StateContext<SpotifyPlaylistsStateModel[]>,
    { zip }: SpotifyReadPlaylistsFromZip
  ) {
    // TODO: Check name in other zips
    const FILE_NAME: string = 'Playlist1.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    const fileContent: SpotifyPlaylistsStateModel[] = JSON.parse(
      await file.async('string')
    );
    context.setState(fileContent);
  }

}

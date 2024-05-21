import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  SpotifyReadFollowFromZip,
  SpotifyResetFollow,
} from '../features/follow/follow.actions';
import {
  SpotifyReadIdentifiersFromZip,
  SpotifyResetIdentifiers,
} from '../features/identifier/identifier.action';
import {
  SpotifyReadInferencesFromZip,
  SpotifyResetInferences,
} from '../features/inferences/inference.action';
import {
  SpotifyReadPaymentsFromZip,
  SpotifyResetPayments,
} from '../features/payments/payments.actions';
import {
  SpotifyReadPlaylistsFromZip,
  SpotifyResetPlaylists,
} from '../features/playlist/playlist.actions';
import {
  SpotifyReadSearchHistoryFromZip,
  SpotifyResetSearchHistory,
} from '../features/search-history/search-history.actions';
import {
  SpotifyReadStreamingHistoryFromZip,
  SpotifyResetStreamingHistory,
} from '../features/streaming-history/streaming-history.actions';
import {
  SpotifyReadUserLibraryFromZip,
  SpotifyResetUserLibrary,
} from '../features/user-library/user-library.actions';
import {
  SpotifyReadUserFromZip,
  SpotifyResetUser,
} from '../features/user/user.actions';
import { SpotifyReadFromZip, SpotifyReset } from './spotify.action';
import { SpotifyStateModel } from './spotify.statemodel';
import {
  SpotifyReadStreamingHistoryPodcastFromZip,
  SpotifyResetStreamingHistoryPodcast,
} from '../features/streaming-history/streaming-history-podcast.actions';

const defaults: SpotifyStateModel = null;

@State<SpotifyStateModel>({
  name: 'spotify',
  defaults: defaults,
})
@Injectable()
export class SpotifyState {
  #store = inject(Store);

  @Action(SpotifyReset)
  reset() {
    this.#store.dispatch([
      new SpotifyResetFollow(),
      new SpotifyResetIdentifiers(),
      new SpotifyResetInferences(),
      new SpotifyResetPayments(),
      new SpotifyResetPlaylists(),
      new SpotifyResetSearchHistory(),
      new SpotifyResetStreamingHistory(),
      new SpotifyResetStreamingHistoryPodcast(),
      new SpotifyResetUser(),
      new SpotifyResetUserLibrary(),
    ]);
  }

  @Action(SpotifyReadFromZip)
  readFile(
    _context: StateContext<SpotifyStateModel>,
    { zip }: SpotifyReadFromZip,
  ) {
    this.#store.dispatch([
      new SpotifyReadFollowFromZip(zip),
      new SpotifyReadIdentifiersFromZip(zip),
      new SpotifyReadInferencesFromZip(zip),
      new SpotifyReadPaymentsFromZip(zip),
      new SpotifyReadPlaylistsFromZip(zip),
      new SpotifyReadSearchHistoryFromZip(zip),
      new SpotifyReadStreamingHistoryFromZip(zip),
      new SpotifyReadStreamingHistoryPodcastFromZip(zip),
      new SpotifyReadUserFromZip(zip),
      new SpotifyReadUserLibraryFromZip(zip),
    ]);
  }
}

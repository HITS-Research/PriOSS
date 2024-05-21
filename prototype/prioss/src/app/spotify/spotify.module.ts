import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SpotifyInferenceState } from './features/inferences/inference.state';
import { SpotifySearchHistoryState } from './features/search-history/search-history.state';
import { SpotifyStreamingHistoryState } from './features/streaming-history/streaming-history.state';
import { SpotifyUserState } from './features/user/user.state';
import { SpotifyUserLibraryState } from './features/user-library/user-library.state';
import { SpotifyPlaylistState } from './features/playlist/playlist.state';
import { SpotifyPaymentState } from './features/payments/payments.state';
import { SpotifyIdentifiersState } from './features/identifier/identifier.state';
import { SpotifyFollowState } from './features/follow/follow.state';
import { SpotifyStreamingHistoryPodcastState } from './features/streaming-history/streaming-history-podcast.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([
      SpotifyFollowState,
      SpotifyIdentifiersState,
      SpotifyInferenceState,
      SpotifyPaymentState,
      SpotifyPlaylistState,
      SpotifySearchHistoryState,
      SpotifyStreamingHistoryState,
      SpotifyStreamingHistoryPodcastState,
      SpotifyUserLibraryState,
      SpotifyUserState,
    ]),
  ],
})
export class SpotifyModule {}

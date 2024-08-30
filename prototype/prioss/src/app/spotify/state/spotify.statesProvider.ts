import { provideStates } from '@ngxs/store';
import { SpotifyFollowState } from '../features/follow/follow.state';
import { SpotifyIdentifiersState } from '../features/identifier/identifier.state';
import { SpotifyInferenceState } from '../features/inferences/inference.state';
import { SpotifyPaymentState } from '../features/payments/payments.state';
import { SpotifyPlaylistState } from '../features/playlist/playlist.state';
import { SpotifySearchHistoryState } from '../features/search-history/search-history.state';
import { SpotifyStreamingHistoryPodcastState } from '../features/streaming-history/streaming-history-podcast.state';
import { SpotifyStreamingHistoryState } from '../features/streaming-history/streaming-history.state';
import { SpotifyUserLibraryState } from '../features/user-library/user-library.state';
import { SpotifyUserState } from '../features/user/user.state';

export function provideSpotifyStates() {
  return provideStates([
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
  ]);
}

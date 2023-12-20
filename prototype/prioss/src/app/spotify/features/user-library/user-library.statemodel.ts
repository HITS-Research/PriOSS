import { SpotifyAlbum } from './album.type';
import { SpotifyArist } from './artist.type';
import { SpotifyEpisodes } from './episodes.type';
import { SpotifyOther } from './other.type';
import { SpotifyShowType } from './shows.type';
import { SpotifyTrack } from './track.type';

/**
 * The Follow-State scheme.
 */
export type SpotifyUserLibraryStateModel = {

  /**
   * The list of album in this user library.
   */
  albums: SpotifyAlbum[];

  /**
   * The list of artists in this user library.
   */
  artists: SpotifyArist[];

  /**
   * The list of banned artists in this user library.
   */
  bannedArtists: SpotifyArist[];

  /**
   * The list of tracks in this user library.
   */
  tracks: SpotifyTrack[];

  /**
   * The list of banned tracks in this user library.
   */
  bannedTracks: SpotifyTrack[];

  /**
   * The list of show types in this user library.
   */
  shows: SpotifyShowType[];

  /**
   * The list of episodes in this user library.
   */
  episodes: SpotifyEpisodes[];

  /**
   * The list of other data in this user library.
   */
  other: SpotifyOther[];

};

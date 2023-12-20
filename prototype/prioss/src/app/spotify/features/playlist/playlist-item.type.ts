import { SpotifyTrack } from '../user-library/track.type';

/**
 * An item inside the playlist.
 */
export type SpotifyPlayListItem = {

  /**
   * The name of the added track.
   */
  track: SpotifyTrack;

  /**
   * Unknown
   */
  episode: unknown;

  /**
   * Unknown
   */
  localTrack: unknown;

  /**
   * The Date when the item was added.
   *
   * Format: YYYY-MM-DD
   */
  addedDate: string; // "2022-04-13";

};

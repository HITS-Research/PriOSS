/**
 * The Streaming-History-State scheme.
 */
export type SpotifyStreamingHistoryStateModel = {

  /**
   * ?.
   */
  endTime: string;

  /**
   * The Names of the artists.
   */
  artistName: string;

  /**
   * The name of the listend song.
   */
  trackName: string;

  /**
   * The time in ms, who long the user played the song.
   */
  msPlayed: string;

};

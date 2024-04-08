/**
 * The Streaming-History-State scheme.
 */
export type SpotifyStreamingHistoryStateModel = {
  /**
   * The time at wich the corresponding track was stopped.
   * Format: "YYYY-MM-DD HH:MM"
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
   * The time in ms, how long the user played the song.
   */
  msPlayed: string;
};

/**
 * The Streaming-History-State scheme.
 */
export type SpotifyStreamingHistoryPodcastStateModel = {
  /**
   * The time at wich the corresponding track was stopped.
   * Format: "YYYY-MM-DD HH:MM"
   */
  endTime: string;

  /**
   * The Names of the artists.
   */
  podcastName: string;

  /**
   * The name of the listend song.
   */
  episodeName: string;

  /**
   * The time in ms, how long the user played the song.
   */
  msPlayed: string;
};

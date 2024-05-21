import JSZip from 'jszip';

/**
 * Resets the Streaming-History-State.
 */
export class SpotifyResetStreamingHistoryPodcast {
  static readonly type = '[Spotify] Reset Streaming History podcast';
}

/**
 * Reads and initializes the Streaming-History-State by the given zip file.
 */
export class SpotifyReadStreamingHistoryPodcastFromZip {
  static readonly type =
    '[Spotify] Read Streaming History podcast data from Zip';
  constructor(public zip: JSZip) {}
}

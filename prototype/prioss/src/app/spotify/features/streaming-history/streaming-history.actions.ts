import JSZip from 'jszip';

/**
 * Resets the Streaming-History-State.
 */
export class SpotifyResetStreamingHistory {
  static readonly type = '[Spotify] Reset Streaming History';
}

/**
 * Reads and initializes the Streaming-History-State by the given zip file.
 */
export class SpotifyReadStreamingHistoryFromZip {
  static readonly type = '[Spotify] Read Streaming History from Zip';
  constructor(public zip: JSZip) { }
}

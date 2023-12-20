import JSZip from 'jszip';

/**
 * Resets the Search-History-State.
 */
export class SpotifyResetSearchHistory {
  static readonly type = '[Spotify] Reset Search History';
}

/**
 * Reads and initializes the Search-History-State by the given zip file.
 */
export class SpotifyReadSearchHistoryFromZip {
  static readonly type = '[Spotify] Read Search History from Zip';
  constructor(public zip: JSZip) { }
}

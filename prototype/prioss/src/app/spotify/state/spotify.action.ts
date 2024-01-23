import JSZip from 'jszip';

/**
 * Resets the complete Spotify-State and
 * all other Spotify-Feature-States
 */
export class SpotifyReset {
  static readonly type = '[Spotify] Reset';
}

/**
 * Delegates the zip-file to all feature-states.
 */
export class SpotifyReadFromZip {
  static readonly type = '[Spotify] Read From Zip File';
  constructor(public zip: JSZip) { }
}

import JSZip from 'jszip';

/**
 * Resets the Follow-State.
 */
export class SpotifyResetFollow {
  static readonly type = '[Spotify] Reset Follow';
}

/**
 * Reads and initializes the Follow-State by the given zip file.
 */
export class SpotifyReadFollowFromZip {
  static readonly type = '[Spotify] Read Follow from Zip';
  constructor(public zip: JSZip) { }
}

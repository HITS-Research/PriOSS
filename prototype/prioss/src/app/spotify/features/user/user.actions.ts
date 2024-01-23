import JSZip from 'jszip';

/**
 * Resets the User-State.
 */
export class SpotifyResetUser {
  static readonly type = '[Spotify] Reset User';
}

/**
 * Reads and initializes the User-State by the given zip file.
 */
export class SpotifyReadUserFromZip {
  static readonly type = '[Spotify] Read User from Zip';
  constructor(public zip: JSZip) { }
}

import JSZip from 'jszip';

/**
 * Resets the User-Library-State.
 */
export class SpotifyResetUserLibrary {
  static readonly type = '[Spotify] Reset User Library';
}

/**
 * Reads and initializes the User-Library-State by the given zip file.
 */
export class SpotifyReadUserLibraryFromZip {
  static readonly type = '[Spotify] Read User Library from Zip';
  constructor(public zip: JSZip) { }
}

import JSZip from 'jszip';

/**
 * Resets the Identifier-State.
 */
export class SpotifyResetIdentifiers {
  static readonly type = '[Spotify] Reset Identifiers';
}

/**
 * Reads and initializes the Identifier-State by the given zip file.
 */
export class SpotifyReadIdentifiersFromZip {
  static readonly type = '[Spotify] Read Identifiers from Zip';
  constructor(public zip: JSZip) { }
}

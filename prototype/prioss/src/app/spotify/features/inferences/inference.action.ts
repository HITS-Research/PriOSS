import JSZip from 'jszip';

/**
 * Resets the Follow-State.
 */
export class SpotifyResetInferences {
  static readonly type = '[Spotify] Reset Inferences';
}

/**
 * Reads and initializes the Follow-State by the given zip file.
 */
export class SpotifyReadInferencesFromZip {
  static readonly type = '[Spotify] Read Inferences from Zip';
  constructor(public zip: JSZip) { }
}

import JSZip from 'jszip';

/**
 * Resets the Follow-State.
 */
export class SpotifyResetPayments {
  static readonly type = '[Spotify] Reset Payments';
}

/**
 * Reads and initializes the Follow-State by the given zip file.
 */
export class SpotifyReadPaymentsFromZip {
  static readonly type = '[Spotify] Read Payments from Zip';
  constructor(public zip: JSZip) { }
}

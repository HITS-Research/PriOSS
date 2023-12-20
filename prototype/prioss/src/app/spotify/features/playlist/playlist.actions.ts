import JSZip from 'jszip';

export class SpotifyResetPlaylists {
  static readonly type = '[Spotify] Reset Playlists';
}

export class SpotifyReadPlaylistsFromZip {
  static readonly type = '[Spotify] Read Playlists from Zip';
  constructor(public zip: JSZip) { }
}

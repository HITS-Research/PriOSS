/**
 * The spotify track-scheme.
 */
export type SpotifyTrack = {

  /**
   * The name of the album, where the track is released.
   */
  album: string;

  /**
   * The name of the artist, who created the track.
   */
  artist: string;

  /**
   * The name of the track.
   */
  track: string;

  /**
   * The unique identifier of this ressource.
   */
  uri: string;

};

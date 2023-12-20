import { SpotifyPlayListItem } from './playlist-item.type';
/**
 * The Playlist-State scheme.
 */
export type SpotifyPlaylistsStateModel = {

  /**
   * The name of the playlist.
   */
  name: string;

  /**
   * The description of the playlist.
   */
  description: string;

  /**
   * The items which has been added to the playlist.
   */
  items: SpotifyPlayListItem[];

  /**
   * The timestamp, when the last modification happend.
   */
  lastModifiedDate: string;

  /**
   * The number of people who follow this playlist.
   */
  numberOfFollowers: number;

};

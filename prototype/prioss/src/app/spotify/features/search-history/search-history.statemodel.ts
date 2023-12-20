/**
 * The Search-History-State scheme.
 */
export type SpotifySearchHistoryStateModel = {

  /**
   * The device-os, where the search has been executed.
   */
  platform: string;

  /**
   * Unknown
   */
  searchInteractionURIs: string[];

  /**
   * The timestamp of the search-execution.
   */
  searchTime: Date;

  /**
   * Which text has been entered for searching.
   */
  searchQuery: string;

};

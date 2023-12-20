/**
 *
 */
export type SpotifySearchHistoryFileFormat = {

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
   * Format: UTC-Time
   */
  searchTime: string;

  /**
   * Which text has been entered for searching.
   */
  searchQuery: string;

};

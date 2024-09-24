import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SpotifyReadSearchHistoryFromZip, SpotifyResetSearchHistory } from './search-history.actions';
import { SpotifySearchHistoryFileFormat } from './search-history.file-format';
import { SpotifySearchHistoryStateModel } from './search-history.statemodel';

const defaults: SpotifySearchHistoryStateModel[] = [];

@State<SpotifySearchHistoryStateModel[]>({
  name: 'spotifySearchHistory',
  defaults: defaults,
})
@Injectable()
export class SpotifySearchHistoryState {

  @Selector()
  static state(state: SpotifySearchHistoryStateModel[]): SpotifySearchHistoryStateModel[] {
    return state;
  }

  /**
   * Resets the Search-History-State.
   */
  @Action(SpotifyResetSearchHistory)
  resetSong(context: StateContext<SpotifySearchHistoryStateModel[]>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Search-History-State by the given zip file.
   */
  @Action(SpotifyReadSearchHistoryFromZip)
  async readSearchHistoryFromZip(
    context: StateContext<SpotifySearchHistoryStateModel[]>,
    { zip }: SpotifyReadSearchHistoryFromZip
  ) {
    const FILE_NAME = 'SearchQueries.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    const fileContent: SpotifySearchHistoryFileFormat = JSON.parse(
      await file.async('string')
    );
    if (Array.isArray(fileContent)) {
      const data = fileContent.map(c => ({
        searchInteractionURIs: c.searchInteractionURIs,
        searchQuery: c.searchQuery,
        platform: c.platform,
        searchTime: new Date(c.searchTime.slice(0, -5))
      } as SpotifySearchHistoryStateModel));
      context.setState(
        data.sort((a, b) => b.searchTime.getTime() - a.searchTime.getTime())
      );
    }
  }

}

import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadStreamingHistoryFromZip, SpotifyResetStreamingHistory } from './streaming-history.actions';
import { SpotifyStreamingHistoryStateModel } from './streaming-history.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyStreamingHistoryStateModel[] = [];

/**
 * The state of follow data of the users zip file.
 */
@State<SpotifyStreamingHistoryStateModel[]>({
  name: 'spotifyStreamingHistory',
  defaults: defaults,
})
@Injectable()
export class SpotifyStreamingHistoryState {

  /**
   * Resets the Streaming-History-State.
   */
  @Action(SpotifyResetStreamingHistory)
  resetStreamingHistory(context: StateContext<SpotifyStreamingHistoryStateModel[]>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Streaming-History-State by the given zip file.
   */
  @Action(SpotifyReadStreamingHistoryFromZip)
  async readStreamingHistoryFromZip(
    context: StateContext<SpotifyStreamingHistoryStateModel[]>,
    { zip }: SpotifyReadStreamingHistoryFromZip
  ) {
    const stateContent: SpotifyStreamingHistoryStateModel[][] = [];
    for (let i = 0;; i++) {
      const FILE_NAME: string = `StreamingHistory${i}.json`;

      const fileName = Object.keys(zip.files)
        .find(f => f.split('/').at(-1) === FILE_NAME);
      if (!fileName) break;

      const file = zip.file(fileName);
      if (!file) break;

      const fileContent: SpotifyStreamingHistoryStateModel[] = JSON.parse(
        await file.async('string')
      );

      if (typeof (fileContent) === 'object')
        stateContent.push(fileContent);
    }
    context.setState(stateContent.flat());
  }

}

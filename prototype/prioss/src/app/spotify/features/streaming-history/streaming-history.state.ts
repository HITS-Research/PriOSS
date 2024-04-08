import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SpotifyReadStreamingHistoryFromZip,
  SpotifyResetStreamingHistory,
} from './streaming-history.actions';
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
  @Selector()
  static state(
    state: SpotifyStreamingHistoryStateModel[],
  ): SpotifyStreamingHistoryStateModel[] {
    return state;
  }

  /**
   * Returns a tuple of the min and max date of all the model-data.
   */
  @Selector()
  static dateRange(state: SpotifyStreamingHistoryStateModel[]): [Date, Date] {
    if (state.length === 0) return [new Date(), new Date()];

    let min: Date = new Date(state[0].endTime);
    let max: Date = new Date(state[0].endTime);

    for (let i = 0; i < state.length; i++) {
      const element = new Date(state[i].endTime);
      if (min > element) min = element;
      if (max < element) max = element;
    }

    return [min, max];
  }

  /**
   * Resets the Streaming-History-State.
   */
  @Action(SpotifyResetStreamingHistory)
  resetStreamingHistory(
    context: StateContext<SpotifyStreamingHistoryStateModel[]>,
  ) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Streaming-History-State by the given zip file.
   */
  @Action(SpotifyReadStreamingHistoryFromZip)
  async readStreamingHistoryFromZip(
    context: StateContext<SpotifyStreamingHistoryStateModel[]>,
    { zip }: SpotifyReadStreamingHistoryFromZip,
  ) {
    const stateContent: SpotifyStreamingHistoryStateModel[][] = [];
    for (let i = 0; ; i++) {
      const FILE_NAME: string = `StreamingHistory${i}.json`;

      const fileName = Object.keys(zip.files).find(
        f => f.split('/').at(-1) === FILE_NAME,
      );
      if (!fileName) break;

      const file = zip.file(fileName);
      if (!file) break;

      const fileContent: SpotifyStreamingHistoryStateModel[] = JSON.parse(
        await file.async('string'),
      );

      if (typeof fileContent === 'object') stateContent.push(fileContent);
    }
    context.setState(stateContent.flat());
  }
}

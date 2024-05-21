import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SpotifyReadStreamingHistoryPodcastFromZip,
  SpotifyResetStreamingHistoryPodcast,
} from './streaming-history-podcast.actions';
import { SpotifyStreamingHistoryPodcastStateModel as SpotifyStreamingHistoryPodcastStateModel } from './streaming-history-podcast.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyStreamingHistoryPodcastStateModel[] = [];

/**
 * The state of follow data of the users zip file.
 */
@State<SpotifyStreamingHistoryPodcastStateModel[]>({
  name: 'spotifyStreamingHistoryPodcast',
  defaults: defaults,
})
@Injectable()
export class SpotifyStreamingHistoryPodcastState {
  @Selector()
  static state(
    state: SpotifyStreamingHistoryPodcastStateModel[],
  ): SpotifyStreamingHistoryPodcastStateModel[] {
    return state;
  }

  /**
   * Returns a tuple of the min and max date of all the model-data.
   */
  @Selector()
  static dateRange(
    state: SpotifyStreamingHistoryPodcastStateModel[],
  ): [Date, Date] {
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
  @Action(SpotifyResetStreamingHistoryPodcast)
  resetStreamingHistory(
    context: StateContext<SpotifyStreamingHistoryPodcastStateModel[]>,
  ) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Streaming-History-State by the given zip file.
   */
  @Action(SpotifyReadStreamingHistoryPodcastFromZip)
  async readStreamingHistoryFromZip(
    context: StateContext<SpotifyStreamingHistoryPodcastStateModel[]>,
    { zip }: SpotifyReadStreamingHistoryPodcastFromZip,
  ) {
    const stateContent: SpotifyStreamingHistoryPodcastStateModel[][] = [];
    for (let i = 0; ; i++) {
      const FILE_NAME: string = `StreamingHistory_podcast_${i}.json`;

      const fileName = Object.keys(zip.files).find(
        f => f.split('/').at(-1) === FILE_NAME,
      );
      if (!fileName) break;

      const file = zip.file(fileName);
      if (!file) break;

      const fileContent: SpotifyStreamingHistoryPodcastStateModel[] =
        JSON.parse(await file.async('string'));

      if (typeof fileContent === 'object') stateContent.push(fileContent);
    }
    context.setState(stateContent.flat());
  }
}

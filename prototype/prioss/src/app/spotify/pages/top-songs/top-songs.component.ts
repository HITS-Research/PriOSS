import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SpotifyStreamingHistoryStateModel } from '../../features/streaming-history/streaming-history.statemodel';
import { EChartsOption } from 'echarts';
import { Observable, combineLatest, map } from 'rxjs';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';

type trackCounter = { trackName: string; counter: number };

type ViewModel = {
  listeningData: SpotifyStreamingHistoryStateModel[];

  topTenTracks: trackCounter[];

  chartPreview: EChartsOption;
};

/**
 * This component visualizes which songs have been listened the most to
 */
@Component({
  selector: 'prioss-spotify-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSongsComponent {
  #store = inject(Store);
  #router = inject(Router);

  @Input()
  previewMode: boolean;

  #listeningData$: Observable<SpotifyStreamingHistoryStateModel[]> =
    this.#store.select(SpotifyStreamingHistoryState);
  //.pipe(tap(x => console.log('listeningData', x)));

  #topTenTracks$ = this.#listeningData$.pipe(
    map((historyItems: SpotifyStreamingHistoryStateModel[]) => {
      const trackCounterMap = historyItems.reduce(
        (
          counterMap: Map<string, number>,
          item: SpotifyStreamingHistoryStateModel,
        ) => {
          const { trackName } = item;
          counterMap.set(trackName, (counterMap.get(trackName) || 0) + 1);
          return counterMap;
        },
        new Map<string, number>(),
      );

      // Convert the map to array of trackCounter objects
      const trackCounterArray: trackCounter[] = Array.from(
        trackCounterMap.entries(),
      ).map(([trackName, counter]) => ({
        trackName,
        counter,
      }));

      // Sort the array by counter in descending order
      trackCounterArray.sort((a, b) => b.counter - a.counter);

      // Take top 10 artists
      const topTenTracks = trackCounterArray.slice(0, 10);

      return topTenTracks;
    }),
  );

  #chartPreview$ = this.#topTenTracks$.pipe(
    map((topTenTracks: { trackName: string; counter: number }[]) => {
      const xAxisData = topTenTracks.map(track => track.trackName);
      const seriesData = topTenTracks.map(track => track.counter);

      return {
        yAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            show: false, // Hide y-axis labels
          },
        },
        xAxis: {
          type: 'value',
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            itemStyle: {
              // Customize bar color
              color: '#1DB954', // Change bar color to gray
            },
            label: {
              show: true,
              position: 'inside', // Display labels inside the bar
              formatter: '{b}', // Display counter value as label
              color: '#fff', // Label color
            },
          },
        ],
      };
    }),
  );

  #testData$ =
    this.#topTenTracks$.pipe(
      //tap(x => console.log('TopTenTracks', x)),
    );

  vm$: Observable<ViewModel> = combineLatest([
    this.#listeningData$,
    this.#testData$,
    this.#chartPreview$,
  ]).pipe(
    map(
      ([ld, ttt, pc]) =>
        ({
          listeningData: ld,
          topTenTracks: ttt,
          chartPreview: pc,
        }) as ViewModel,
    ),
  );

  /**
   * Navigates to the dashboard of the current feature.
   */
  navigateToDashboard() {
    this.#router.navigate(['dashboard']);
  }
}

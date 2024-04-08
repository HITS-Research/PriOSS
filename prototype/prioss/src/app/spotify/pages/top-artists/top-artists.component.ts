/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EChartsOption } from 'echarts';
import { Observable, combineLatest, map } from 'rxjs';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';
import { SpotifyStreamingHistoryStateModel } from '../../features/streaming-history/streaming-history.statemodel';

type artistCounter = { artistName: string; counter: number };

type ViewModel = {
  listeningData: SpotifyStreamingHistoryStateModel[];

  topTenArtists: artistCounter[];

  chartPreview: EChartsOption;
};

/**
 * This component visualizes how many songs from an artist were listened to
 * Because of missing UIDs for artists we cannot distinguish between artists with the same name
 *
 * @author: Jonathan (jvn@mail.upb.de)
 *
 */
@Component({
  selector: 'prioss-spotify-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArtistsComponent {
  #store = inject(Store);
  #router = inject(Router);

  @Input()
  previewMode: boolean;

  #listeningData$: Observable<SpotifyStreamingHistoryStateModel[]> =
    this.#store.select(SpotifyStreamingHistoryState);
  //.pipe(tap(x => console.log('listeningData', x)));

  #topTenArtists$ = this.#listeningData$.pipe(
    map((historyItems: SpotifyStreamingHistoryStateModel[]) => {
      const artistCounterMap = historyItems.reduce(
        (
          counterMap: Map<string, number>,
          item: SpotifyStreamingHistoryStateModel,
        ) => {
          const { artistName } = item;
          counterMap.set(artistName, (counterMap.get(artistName) || 0) + 1);
          return counterMap;
        },
        new Map<string, number>(),
      );

      // Convert the map to array of ArtistCounter objects
      const artistCounterArray: artistCounter[] = Array.from(
        artistCounterMap.entries(),
      ).map(([artistName, counter]) => ({
        artistName,
        counter,
      }));

      // Sort the array by counter in descending order
      artistCounterArray.sort((a, b) => b.counter - a.counter);

      // Take top 10 artists
      const topTenArtists = artistCounterArray.slice(0, 10);

      return topTenArtists;
    }),
  );

  #chartPreview$ = this.#topTenArtists$.pipe(
    map((topTenArtists: { artistName: string; counter: number }[]) => {
      const xAxisData = topTenArtists.map(artist => artist.artistName);
      const seriesData = topTenArtists.map(artist => artist.counter);

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
    this.#topTenArtists$.pipe(
      //tap(x => console.log('TopTen', x))
    );

  vm$: Observable<ViewModel> = combineLatest([
    this.#listeningData$,
    this.#testData$,
    this.#chartPreview$,
  ]).pipe(
    map(
      ([ld, tta, pc]) =>
        ({
          listeningData: ld,
          topTenArtists: tta,
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

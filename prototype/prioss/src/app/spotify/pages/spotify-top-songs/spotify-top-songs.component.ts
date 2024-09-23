import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ECElementEvent, EChartsOption } from 'echarts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxEchartsModule } from 'ngx-echarts';
import { map, switchMap } from 'rxjs';
import { TimePipe } from 'src/app/features/time/time.pipe';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';
import { SpotifyStreamingHistoryStateModel } from '../../features/streaming-history/streaming-history.statemodel';

/**
 * This component visualizes which songs have been listened the most to
 */
@Component({
  selector: 'prioss-spotify-top-songs',
  templateUrl: './spotify-top-songs.component.html',
  styleUrls: ['./spotify-top-songs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgxEchartsModule,
    NzCardModule,
    NzDatePickerModule,
    NzEmptyModule,
    NzTableModule,
    NzTabsModule,
    TimePipe,
    TitleBarComponent,
  ]
})
export class SpotifyTopSongsComponent {

  previewMode = input(false);

  #store = inject(Store);

  #activeRoute = inject(ActivatedRoute);

  #router = inject(Router);

  /**
   * Parses the the raw data, checks what the earliest and latest date for the "endTime" property of each item.
   * Checks what the initial date range should be for the bar chart and ensures no invalid data is inserted.
   */
  dateRange = toSignal<[Date, Date]>(this.#activeRoute.paramMap.pipe(
    map(items => {
      const s = new Date(items.get('start') ?? 'invalidDate');
      const e = new Date(items.get('end') ?? 'invalidDate');
      return [
        s instanceof Date && !isNaN(s.getTime()) ? s : new Date(2006, 3, 23), // Founding date of Spotify (earliest)
        e instanceof Date && !isNaN(e.getTime()) ? e : new Date(), // Current day (latest)
      ] as [Date, Date];
    }),
    switchMap(selectedRange =>
      this.#store.select(SpotifyStreamingHistoryState.dateRange).pipe(
        map(dataRange => {
          // Check that min and max are set properly
          let min =
            selectedRange[0] < dataRange[0] ? dataRange[0] : selectedRange[0];
          const max =
            selectedRange[1] > dataRange[1] ? dataRange[1] : selectedRange[1];
          min = min > max ? max : min;
          max.setHours(23);
          max.setMinutes(59);
          max.setSeconds(59);
          max.setMilliseconds(997);
          return [min, max] as [Date, Date];
        }),
      ),
    ),
  ), { requireSync: true });

  /**
   * The given parameters from the url.
   */
  parameter = toSignal(inject(ActivatedRoute).paramMap.pipe(map(x => ({
    fromDate: x.get('start'),
    toDate: x.get('end')
  }))), { requireSync: true });

  /**
   * Sets the the current selected Date.
   */
  onDateRangeChanged(dateRange: (Date | null)[]) {
    if (dateRange.length !== 2) return;

    this.#router.navigate([
      'spotify',
      'top-songs',
      dateRange[0]?.toISOString().split('T')[0],
      dateRange[1]?.toISOString().split('T')[0],
    ]);
  }

  /**
   * The current State of the Streaming History.
   */
  #streamingHistory = toSignal(
    this.#store.select(SpotifyStreamingHistoryState.state),
    { requireSync: true }
  );

  /**
   * The signal of a list of all songs, sorted by minutes listened.
   */
  topSongs = computed(() => {
    const state = this.#streamingHistory();
    const isPreview = this.previewMode();

    if (state.length <= 0) return [];

    const [minDate, maxDate] = this.dateRange();
    if (!isPreview && !(minDate instanceof Date && maxDate instanceof Date))
      return [];

    let songCounter;
    if (isPreview) {
      songCounter = state;
    } else {
      songCounter = state
        .filter(item => {
          const endTimeDate = new Date(item.endTime);
          return endTimeDate < maxDate && endTimeDate >= minDate;
        });
    }

    songCounter = songCounter.reduce((
      counterMap: Map<string, number>,
      item: SpotifyStreamingHistoryStateModel,
    ) => {
      const { artistName, trackName, msPlayed } = item;
      const minutesPlayed = parseFloat(msPlayed);
      const key = `${artistName};;${trackName}`;
      const minutesSoFar = (counterMap.get(key) ?? 0) + minutesPlayed;
      counterMap.set(key, minutesSoFar);
      return counterMap;
    },
      new Map<string, number>(),
    )
      .entries();

    return [...songCounter]
      .map(x => {
        const [artist, song] = x[0].split(";;");
        return [artist, song, x[1]] as [string, string, number];
      })
      .toSorted((a, b) => b[2] - a[2]);
  });

  /**
   * The chart options for e-charts.
   */
  chartOptions: Signal<EChartsOption> = computed(() => {
    const topTen = this.topSongs().slice(0, 10);
    const xAxisData = topTen.map(songs => `${songs[0]} - ${songs[1]}`).reverse();
    const seriesData = topTen.map(songs => songs[2] / 60000).reverse();

    return {
      yAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: { show: false },
      },
      xAxis: {
        type: 'value',
        name: 'Minutes Played',
        nameLocation: 'middle',
        nameGap: 25,
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          itemStyle: { color: '#1DB954' },
          label: {
            show: true,
            position: 'insideLeft',
            formatter: '{b}',
            color: '#000',
          },
        },
      ],
    } as EChartsOption;
  });

  selectSong(artistName: string, songName: string): void;
  selectSong(event: ECElementEvent): void;
  selectSong(eventOrArtistName: string | ECElementEvent, songName?: string): void {
    if (typeof eventOrArtistName === 'string' && typeof songName === 'string') {
      const artistName = eventOrArtistName;
      this.#router.navigate(['spotify', 'song-history', artistName, songName]);
    } else if (typeof eventOrArtistName !== 'string') {
      const name = eventOrArtistName.name;
      const artistName = name.split(' - ', 1)[0];
      const songName = name.substring(artistName.length + 3);
      this.#router.navigate(['spotify', 'song-history', artistName, songName]);
    }
  }

}

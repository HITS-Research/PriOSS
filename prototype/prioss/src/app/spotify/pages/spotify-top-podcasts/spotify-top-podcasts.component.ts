import {
  ChangeDetectionStrategy,
  Component,
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
import { map } from 'rxjs';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { TimePipe } from '../../../features/time/time.pipe';
import { defaultSpotifyEChartBarOptions } from '../../features/chart/default-options';
import { SpotifyStreamingHistoryPodcastState } from '../../features/streaming-history/streaming-history-podcast.state';

const PODCAST_NAME = 0;

const LISTENED_TIME = 1;

const MIN_DATE = 0;

const MAX_DATE = 1;

@Component({
  selector: 'prioss-spotify-top-podcasts',
  templateUrl: './spotify-top-podcasts.component.html',
  styleUrl: './spotify-top-podcasts.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    NgxEchartsModule,
    NzCardModule,
    NzDatePickerModule,
    NzEmptyModule,
    NzTableModule,
    NzTabsModule,
    TimePipe,
    TitleBarComponent,
  ],
})
export class SpotifyTopPodcastsComponent {
  #store = inject(Store);
  #router = inject(Router);
  previewMode = input<boolean>(false);

  /**
   * Daterange provided by the url.
   */
  #paramDateRange = toSignal(
    inject(ActivatedRoute).paramMap.pipe(
      map(param => [
        new Date(param.get('start') ?? 'invalid'),
        new Date(param.get('end') ?? 'invalid'),
      ]),
      map(
        ([s, e]) =>
          [
            s instanceof Date && !isNaN(s.getTime())
              ? s
              : new Date(2006, 3, 23),
            e instanceof Date && !isNaN(e.getTime()) ? e : new Date(),
          ] as [Date, Date],
      ),
    ),
    { requireSync: true },
  );

  /**
   * Daterange (total) provided by the data.
   */
  #dataDateRange = toSignal(
    this.#store.select(SpotifyStreamingHistoryPodcastState.dateRange),
    { requireSync: true },
  );

  /**
   * The current selected daterange.
   */
  dateRange = computed<[Date, Date]>(() => {
    const paramDateRange = this.#paramDateRange();
    const dataDateRange = this.#dataDateRange();

    let min =
      paramDateRange[MIN_DATE] < dataDateRange[MIN_DATE]
        ? dataDateRange[MIN_DATE]
        : paramDateRange[MIN_DATE];
    const max =
      paramDateRange[MAX_DATE] > dataDateRange[MAX_DATE]
        ? dataDateRange[MAX_DATE]
        : paramDateRange[MAX_DATE];

    min = min > max ? max : min;
    max.setHours(23);
    max.setMinutes(59);
    max.setSeconds(59);
    max.setMilliseconds(997);
    return [min, max] as [Date, Date];
  });

  /**
   * All podcast data.
   */
  #podcastStreamingHistory = toSignal(
    this.#store.select(SpotifyStreamingHistoryPodcastState.state),
    { requireSync: true },
  );

  /**
   * A list of all podcast name to listened time tuple.
   * Results ordered in desc order.
   */
  topPodcasts = computed<[string, number][]>(() => {
    const dateRange = this.dateRange();
    const podcastMap = this.#podcastStreamingHistory()
      .filter(entry => {
        const d = new Date(entry.endTime);
        return dateRange[MIN_DATE] < d && d < dateRange[MAX_DATE];
      })
      .reduce((acc, cur) => {
        const name = cur.podcastName;
        if (parseFloat(cur.msPlayed) < 10000) {
          return acc;
        }
        const time = parseFloat(cur.msPlayed);
        return !acc.has(name)
          ? acc.set(name, time)
          : acc.set(name, acc.get(name)! + time);
      }, new Map<string, number>());

    return Array.from(podcastMap.entries()).sort(
      (a, b) => b[LISTENED_TIME] - a[LISTENED_TIME],
    );
  });

  /**
   * The chart options for e-charts.
   */
  chartOptions = computed<EChartsOption>(() => {
    const topTen = this.topPodcasts().slice(0, 10);
    const xAxisData = topTen.map(podcast => podcast[PODCAST_NAME]).reverse();
    const seriesData = topTen.map(podcast => podcast[LISTENED_TIME] / 60000).reverse();
    return defaultSpotifyEChartBarOptions(xAxisData, seriesData);
  });

  /**
   * Opens the detailed view for the given podcast.
   * @param name Name of the podcast
   */
  selectPodcast(name: string | ECElementEvent): void {
    const parameter = typeof name === 'string' ? name : name.name;
    this.#router.navigate(['spotify', 'podcast', parameter]);
  }

  /**
   * Sets the date-range into the url parameter.
   * @param dateRange The date-range, which should be selected.
   */
  selectDateFilter(dateRange: (Date | null)[]): void {
    if (dateRange.length !== 2) return;

    this.#router.navigate([
      'spotify',
      'top-podcasts',
      dateRange[0]?.toISOString().split('T')[0],
      dateRange[1]?.toISOString().split('T')[0],
    ]);
  }
}

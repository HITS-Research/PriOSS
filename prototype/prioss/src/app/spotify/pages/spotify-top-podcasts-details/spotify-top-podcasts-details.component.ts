import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { EChartsOption } from 'echarts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxEchartsModule } from 'ngx-echarts';
import { map } from 'rxjs';
import { TimePipe } from 'src/app/features/time/time.pipe';
import { defaultSpotifyEChartHeatMapOptions } from '../../features/chart/default-options';
import { SpotifyStreamingHistoryPodcastState } from '../../features/streaming-history/streaming-history-podcast.state';

@Component({
  selector: 'prioss-spotify-top-podcasts-details',
  templateUrl: './spotify-top-podcasts-details.component.html',
  styleUrl: './spotify-top-podcasts-details.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsModule,
    NzEmptyModule,
    NzTableModule,
    NzTabsModule,
    RouterModule,
    TimePipe,
  ],
})
export class SpotifyTopPodcastsDetailsComponent {
  /**
   * The current selected podcast name from the url.
   */
  #podcastName = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map(r => r.get('name') ?? '')),
    { requireSync: true },
  );

  /**
   * All podcast data.
   */
  #podcastStreamingHistory = toSignal(
    inject(Store).select(SpotifyStreamingHistoryPodcastState.state),
    { requireSync: true },
  );

  /**
   * All episodes from a specific podcast with the name given by the url.
   */
  data = computed(() => {
    const podcasts = this.#podcastStreamingHistory();
    const name = this.#podcastName();
    return podcasts.filter(p => p.podcastName === name);
  });

  #heatMapData = computed(() => {
    const podcastData = this.data();
    const dataMap = new Map<string, number>();
    podcastData.forEach(ad => {
      const d = new Date(ad.endTime).toISOString().substring(0, 10);
      dataMap.set(d, (dataMap.get(d) ?? 0) + Number(ad.msPlayed));
    });
    return [...dataMap.entries()];
  });

  chartHeatMapOptions = computed<EChartsOption>(() => {
    const heatMapData = this.#heatMapData();
    let minDate = heatMapData[0][0];
    let maxDate = heatMapData[0][0];
    let maxValue = heatMapData[0][1];

    heatMapData.forEach(([date, value]) => {
      if (date < minDate) {
        minDate = date;
      }
      if (date > maxDate) {
        maxDate = date;
      }
      if (value > maxValue) {
        maxValue = value;
      }
    });

    const podcastName = this.#podcastName();
    return defaultSpotifyEChartHeatMapOptions(
      podcastName,
      0,
      maxValue,
      minDate,
      maxDate,
      heatMapData,
    );
  });
}

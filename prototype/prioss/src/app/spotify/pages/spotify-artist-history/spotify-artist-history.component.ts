import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { EChartsOption } from 'echarts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxEchartsModule } from 'ngx-echarts';
import { map } from 'rxjs';
import { TimePipe } from 'src/app/features/time/time.pipe';
import { defaultSpotifyEChartHeatMapOptions } from '../../features/chart/default-options';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';

@Component({
  selector: 'prioss-spotify-artist-history',
  templateUrl: './spotify-artist-history.component.html',
  styleUrl: './spotify-artist-history.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsModule,
    NzEmptyModule,
    NzIconModule,
    NzTableModule,
    NzTabsModule,
    TimePipe,
    RouterLink,
  ],
})
export class SpotifyArtistHistoryComponent {
  artistName = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map(r => r.get('artistName'))),
    { requireSync: true },
  );

  rawData = toSignal(inject(Store).select(SpotifyStreamingHistoryState.state), {
    requireSync: true,
  });

  data = computed(() => {
    const artistName = this.artistName();
    const rawData = this.rawData();
    return rawData.filter(h => h.artistName === artistName);
  });

  heatMapData = computed(() => {
    const artistData = this.data();
    const dataMap = new Map<string, number>();
    artistData.forEach(ad => {
      const d = new Date(ad.endTime).toISOString().substring(0, 10);
      dataMap.set(d, (dataMap.get(d) ?? 0) + Number(ad.msPlayed));
    });
    return [...dataMap.entries()];
  });

  chartHeatMapOptions: Signal<EChartsOption> = computed(() => {
    const heatMapData = this.heatMapData();
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

    const artistName = this.artistName() ?? '';
    return defaultSpotifyEChartHeatMapOptions(
      artistName,
      0,
      maxValue,
      minDate,
      maxDate,
      heatMapData,
    );
  });
}

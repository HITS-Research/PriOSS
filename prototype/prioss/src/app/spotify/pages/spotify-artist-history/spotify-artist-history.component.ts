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
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';

@Component({
  selector: 'prioss-spotify-artist-history',
  templateUrl: './spotify-artist-history.component.html',
  styleUrl: './spotify-artist-history.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgxEchartsModule,
    NzEmptyModule,
    NzIconModule,
    NzTableModule,
    NzTabsModule,
    RouterLink,
    TimePipe,
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
    console.log(dataMap);
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

    return {
      title: {
        top: 30,
        left: 'center',
        text: '"' + this.artistName() + '"' + ' Year-Heatmap',
      },
      tooltip: {
        formatter: (params: { value: number[] }) => {
          return convertMsToHHMMSS(params.value[1]);
        },
      },
      visualMap: {
        min: 0,
        max: maxValue,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
        formatter: (value: number) => convertMsToHHMMSS(value),
      },
      calendar: {
        top: 140,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: [minDate, maxDate],
        itemStyle: {
          borderWidth: 0.5,
        },
        yearLabel: { show: false },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.heatMapData(),
        label: {
          show: false,
          formatter: (params: { value: number[] }) => {
            return convertMsToHHMMSS(params.value[1]);
          },
        },
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 100,
          style: {
            text: 'Legend: Describes how often an artist heard the user in the given timeline (Format: HH:MM:SS)',
            fill: '#666',
            textAlign: 'center',
            fontSize: 12,
          },
        },
      ],
    } as unknown as EChartsOption;
  });
}

/**
 * Converts milliseconds to the HH:MM:SS time format
 */
function convertMsToHHMMSS(ms: number): string {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  // Format the time string
  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return formattedTime;
}

/**
 * Prepends a number with a zero if it is below 10, used to make the time format consistent
 */
function pad(num: number): string {
  return num.toString().padStart(2, '0');
  //return num < 10 ? '0' + num : num.toString();
}

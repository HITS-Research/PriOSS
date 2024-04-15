import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SpotifyStreamingHistoryStateModel } from '../../features/streaming-history/streaming-history.statemodel';
import { EChartsOption } from 'echarts';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';
import { NzTabSetComponent } from 'ng-zorro-antd/tabs';

type ViewModel = {
  listeningData: SpotifyStreamingHistoryStateModel[];

  listeningDataView: SpotifyStreamingHistoryStateModel[];

  chartView: EChartsOption;

  dateRange: [Date, Date];
};

/**
 * This component visualizes the total listening time in relation to configurable time periods
 */
@Component({
  selector: 'prioss-spotify-listening-time',
  templateUrl: './listening-time.component.html',
  styleUrls: ['./listening-time.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeningTimeComponent {
  #store = inject(Store);
  #router = inject(Router);
  #activeRoute = inject(ActivatedRoute);

  @ViewChild('tabset')
  tabset: NzTabSetComponent;

  /**
   * Parses the the raw data, checks what the earliest and latest date for the "endTime" property of each item.
   * Checks what the initial date range should be for the bar chart and ensures no invalid data is inserted.
   */
  dateRange$: Observable<[Date, Date]> = this.#activeRoute.paramMap.pipe(
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
          return [min, max] as [Date, Date];
        }),
      ),
    ),
  );

  @Input()
  previewMode: boolean;
  /**
   * Filters the data of the streaminghistory for the selected date range
   */
  #listeningData$: Observable<SpotifyStreamingHistoryStateModel[]> = this.#store
    .select(SpotifyStreamingHistoryState.state)
    .pipe(
      switchMap(model =>
        this.dateRange$.pipe(
          map(range =>
            model.filter(i => {
              const start = new Date(i.endTime);
              const end = range[1].getTime() + 86399999;
              return (
                start.getTime() >= range[0].getTime() && start.getTime() <= end
              );
            }),
          ),
        ),
      ),
    );

  /**
   * This observable prepares the data from listeningTime by taking the current date range and
   * only giving this information to the ViewModel.
   * The observable then adds this prepared data to the options of the echart that is to be built and returns it.
   */
  #chartView$: Observable<EChartsOption> = this.#listeningData$.pipe(
    switchMap(listeningTime =>
      this.dateRange$.pipe(
        map(dateRange => {
          const mapValues = new Map<string, number>();
          if (dateRange[0].getFullYear() != dateRange[1].getFullYear()) {
            // If the date range spans multiple years, add the listening time up by their years
            listeningTime.forEach(time => {
              const date = new Date(time.endTime);
              const year = date.getFullYear();
              const listeningTimeOfYear = mapValues.get(year.toString()) || 0;
              mapValues.set(
                year.toString(),
                listeningTimeOfYear + Number(time.msPlayed),
              );
            });
          } else if (dateRange[0].getMonth() != dateRange[1].getMonth()) {
            // If the date range spans multiple months (but not years), add the listening time up by their months
            listeningTime.forEach(time => {
              const date = new Date(time.endTime);
              const month = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
              const listeningTimeOfMonth = mapValues.get(month) || 0;
              mapValues.set(
                month,
                listeningTimeOfMonth + Number(time.msPlayed),
              );
            });
          } else {
            // Else add them up by the day
            listeningTime.forEach(time => {
              const date = new Date(time.endTime);
              const day = `${date.getFullYear()}-${pad(
                date.getMonth() + 1,
              )}-${pad(date.getDate())}`;
              const listeningTimeOfDay = mapValues.get(day) || 0;
              mapValues.set(day, listeningTimeOfDay + Number(time.msPlayed));
            });
          }

          const xAxisData = Array.from(mapValues.keys());
          const seriesData = Array.from(mapValues.values());
          // Generate the options for the echart
          return {
            yAxis: {
              type: 'category',
              data: xAxisData,
              axisLabel: {
                formatter: '{value}',
              },
            },
            xAxis: {
              name: 'Listening time in hours and minutes',
              nameTextStyle: { fontSize: '1.1em' },
              nameLocation: 'middle',
              nameGap: 30,
              type: 'value',
              axisLabel: {
                formatter: convertMsToHHMMSS,
              },
            },
            series: [
              {
                data: seriesData,
                type: 'bar',
                itemStyle: {
                  color: '#1DB954',
                },
                label: {
                  show: false,
                  position: 'insideLeft',
                  formatter: '{c}', // Use {c} to display series value
                  color: '#000',
                },
              },
            ],
            tooltip: {
              // Add tooltip configuration
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
              formatter: (param: any) => {
                const ms = param[0].data;
                const seconds = Math.floor(ms / 1000) % 60;
                const minutes = Math.floor((ms / (1000 * 60)) % 60);
                const hours = Math.floor(ms / (1000 * 60 * 60));
                let res = '';
                res =
                  'Hours: ' +
                  hours +
                  ',<br>Minutes: ' +
                  minutes +
                  ',<br>Seconds: ' +
                  seconds;
                return res;
              },
            },
          } as unknown as EChartsOption;
        }),
      ),
    ),
  );

  #listeningDataView$: Observable<SpotifyStreamingHistoryStateModel[]> =
    this.#listeningData$.pipe(
      map(items => {
        return items.map(item => {
          return {
            ...item,
            msPlayed: convertMsToHHMMSS(Number(item.msPlayed)),
          };
        });
      }),
    );

  vm$: Observable<ViewModel> = combineLatest([
    this.#listeningData$,
    this.#listeningDataView$,
    this.#chartView$,
    this.dateRange$,
  ]).pipe(
    map(
      ([ld, ldv, ec, dr]) =>
        ({
          listeningData: ld,
          listeningDataView: ldv,
          chartView: ec,
          dateRange: dr,
        }) as ViewModel,
    ),
  );

  /**
   * This method is used when the barcharts are clicked. The event.name is the string representing the date.
   * If the year is clicked on, it will zoom into the year, beginning at Jan. 1st and ending Dec. 31st.
   * If the month is clicked on, the chart will zoom into the month in the same fashion.
   */
  changeObservableData(event: any) {
    const end = new Date(event.name);
    if (event.name.length == 4) {
      // If the string is just a date of the YYYY format, zoom into this years months
      end.setMonth(11);
      end.setDate(31);
    } else if (event.name.length == 7) {
      // If the string is a date of the YYYY-MM format, zoom into the months days
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
    } else {
      // Currently, zooming closer than days is not deemed neccessary
      this.tabset?.setSelectedIndex(1);
    }
    const start = new Date(event.name);
    this.#router.navigate([
      'spot',
      'listening-time',
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0],
    ]);
  }
  /**
   * Reset the chart by navigating to the default page (Years),
   * therefore removing all parameters sent.
   */
  resetChart() {
    this.#router.navigateByUrl('/spot/listening-time');
  }

  /**
   * Method for the date range selector. Checks that the start of the range is before the end of the range,
   * then sends the range as a parameter to the component.
   */
  changeDateRange(dateRange: (Date | null)[]) {
    if (dateRange.length <= 0) return;

    const start = dateRange[0];
    const end = dateRange[1];
    if (start == null || end == null) return;

    this.#router.navigate([
      'spot',
      'listening-time',
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0],
    ]);
  }
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

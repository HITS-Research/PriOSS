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
import { SpotifyStreamingHistoryPodcastState } from '../../features/streaming-history/streaming-history-podcast.state';
import { SpotifyStreamingHistoryPodcastStateModel } from '../../features/streaming-history/streaming-history-podcast.statemodel';

type ViewModel = {
  listeningData: SpotifyStreamingHistoryStateModel[];
  listeningDataViewMusic: SpotifyStreamingHistoryStateModel[];
  listeningDataPodcast: SpotifyStreamingHistoryPodcastStateModel[]; // Änderung hier
  chartView: EChartsOption;
  dateRangeCombined: [Date, Date];
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
   * Used for the music data.
   */
  dateRangeMusic$: Observable<[Date, Date]> = this.#activeRoute.paramMap.pipe(
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
          const min =
            selectedRange[0] < dataRange[0] ? dataRange[0] : selectedRange[0];
          const max =
            selectedRange[1] > dataRange[1] ? dataRange[1] : selectedRange[1];
          //min = min > max ? max : min;
          return [min, max] as [Date, Date];
        }),
      ),
    ),
  );

  /**
   * Parses the the raw data, checks what the earliest and latest date for the "endTime" property of each item.
   * Checks what the initial date range should be for the bar chart and ensures no invalid data is inserted.
   * Used for the podcast data.
   */
  dateRangePodcast$: Observable<[Date, Date]> = this.#activeRoute.paramMap.pipe(
    map(items => {
      const s = new Date(items.get('start') ?? 'invalidDate');
      const e = new Date(items.get('end') ?? 'invalidDate');
      return [
        s instanceof Date && !isNaN(s.getTime()) ? s : new Date(2006, 3, 23), // Founding date of Spotify (earliest)
        e instanceof Date && !isNaN(e.getTime()) ? e : new Date(), // Current day (latest)
      ] as [Date, Date];
    }),
    switchMap(selectedRange =>
      this.#store.select(SpotifyStreamingHistoryPodcastState.dateRange).pipe(
        map(dataRange => {
          // Check that min and max are set properly
          const min =
            selectedRange[0] < dataRange[0] ? dataRange[0] : selectedRange[0];
          const max =
            selectedRange[1] > dataRange[1] ? dataRange[1] : selectedRange[1];
          //min = min > max ? max : min;
          return [min, max] as [Date, Date];
        }),
      ),
    ),
  );

  dateRangeCombined$: Observable<[Date, Date]> = combineLatest([
    this.dateRangeMusic$,
    this.dateRangePodcast$,
  ]).pipe(
    map(([musicRange, podcastRange]) => {
      const minDate =
        musicRange[0] < podcastRange[0] ? musicRange[0] : podcastRange[0];
      const maxDate =
        musicRange[1] > podcastRange[1] ? musicRange[1] : podcastRange[1];
      return [minDate, maxDate] as [Date, Date];
    }),
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
        this.dateRangeCombined$.pipe(
          map(range =>
            model.filter(i => {
              const start = new Date(i.endTime);
              const end = range[1].getTime() + 86399999; // Last millisecond of the day, 86399999 = 60 * 60 * 24 * 1000 - 1
              return (
                start.getTime() >= range[0].getTime() && start.getTime() <= end
              );
            }),
          ),
        ),
      ),
    );

  /**
   * Filters the data of the podcast streaminghistory for the selected date range
   */
  #listeningTimePodcasts$: Observable<
    SpotifyStreamingHistoryPodcastStateModel[]
  > = this.#store.select(SpotifyStreamingHistoryPodcastState.state).pipe(
    switchMap(model =>
      this.dateRangeCombined$.pipe(
        map(range =>
          model.filter(i => {
            const start = new Date(i.endTime);
            const end = range[1].getTime() + 86399999; // Last millisecond of the day, 86399999 = 60 * 60 * 24 * 1000 - 1
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
  #chartView$: Observable<EChartsOption> = combineLatest([
    this.#listeningData$,
    this.#listeningTimePodcasts$,
  ]).pipe(
    switchMap(([listeningTime, listeningTimePodcast]) =>
      this.dateRangeCombined$.pipe(
        map(dateRange => {
          const mapValuesMusic = new Map<string, number>();
          const mapValuesPodcast = new Map<string, number>();
          if (dateRange[0].getFullYear() != dateRange[1].getFullYear()) {
            // If the date range spans multiple years, add the listening time up by their years
            listeningTime.forEach(time => {
              const date = new Date(time.endTime);
              const year = date.getFullYear();
              const listeningTimeOfYear =
                mapValuesMusic.get(year.toString()) || 0;
              mapValuesMusic.set(
                year.toString(),
                listeningTimeOfYear + Number(time.msPlayed),
              );
            });
            listeningTimePodcast.forEach(time => {
              const date = new Date(time.endTime);
              const year = date.getFullYear();
              const listeningTimeOfYear =
                mapValuesPodcast.get(year.toString()) || 0;
              mapValuesPodcast.set(
                year.toString(),
                listeningTimeOfYear + Number(time.msPlayed),
              );
            });
          } else if (dateRange[0].getMonth() != dateRange[1].getMonth()) {
            // If the date range spans multiple months (but not years), add the listening time up by their months
            listeningTime.forEach(time => {
              const date = new Date(time.endTime);
              const month = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
              const listeningTimeOfMonth = mapValuesMusic.get(month) || 0;
              mapValuesMusic.set(
                month,
                listeningTimeOfMonth + Number(time.msPlayed),
              );
            });
            listeningTimePodcast.forEach(time => {
              const date = new Date(time.endTime);
              const month = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
              const listeningTimeOfMonth = mapValuesPodcast.get(month) || 0;
              mapValuesPodcast.set(
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
              const listeningTimeOfDay = mapValuesMusic.get(day) || 0;
              mapValuesMusic.set(
                day,
                listeningTimeOfDay + Number(time.msPlayed),
              );
            });
            listeningTimePodcast.forEach(time => {
              const date = new Date(time.endTime);
              const day = `${date.getFullYear()}-${pad(
                date.getMonth() + 1,
              )}-${pad(date.getDate())}`;
              const listeningTimeOfDay = mapValuesPodcast.get(day) || 0;
              mapValuesPodcast.set(
                day,
                listeningTimeOfDay + Number(time.msPlayed),
              );
            });
          }

          const mapValuesCombined = new Map<string, number>();

          // merge music an dpodcast data for echart
          const mergeValues = (
            musicMap: Map<string, number>,
            podcastMap: Map<string, number>,
          ) => {
            for (const [key, value] of musicMap.entries()) {
              if (podcastMap.has(key)) {
                // Merge podcast and music if string value is equal
                const podcastValue = podcastMap.get(key)!;
                mapValuesCombined.set(key, value + podcastValue);
              } else {
                mapValuesCombined.set(key, value);
              }
            }

            for (const [key, value] of podcastMap.entries()) {
              if (!mapValuesCombined.has(key)) {
                mapValuesCombined.set(key, value);
              }
            }
            const sortedMap = new Map(
              Array.from(mapValuesCombined.entries()).sort(([keyA], [keyB]) =>
                keyA.localeCompare(keyB),
              ),
            );

            return sortedMap;
          };

          mergeValues(mapValuesMusic, mapValuesPodcast);

          const xAxisData = Array.from(mapValuesCombined.keys());
          //const seriesData = Array.from(mapValuesCombined.values());
          xAxisData.sort((a, b) => {
            return a.localeCompare(b);
          });
          const seriesDataMusic = [];
          const seriesDataPodcast = [];

          for (const key of xAxisData) {
            if (mapValuesMusic.has(key)) {
              seriesDataMusic.push(mapValuesMusic.get(key)!);
            } else {
              seriesDataMusic.push(0);
            }
            if (mapValuesPodcast.has(key)) {
              seriesDataPodcast.push(mapValuesPodcast.get(key)!);
            } else {
              seriesDataPodcast.push(0);
            }
          }
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
                data: seriesDataMusic,
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
                stack: 'total',
                emphasis: {
                  //focus: 'series',
                },
              },
              {
                data: seriesDataPodcast,
                type: 'bar',
                itemStyle: {
                  color: '#535353',
                },
                label: {
                  show: false,
                  position: 'insideLeft',
                  formatter: '{c}', // Use {c} to display series value
                  color: '#000',
                },
                stack: 'total',
                emphasis: {
                  //focus: 'series',
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
                const ms_music = param[0].data;
                const seconds_music = Math.floor(ms_music / 1000) % 60;
                const minutes_music = Math.floor((ms_music / (1000 * 60)) % 60);
                const hours_music = Math.floor(ms_music / (1000 * 60 * 60));

                let res =
                  '<span style="color:' +
                  param[0].color + // Add the color of the music bar
                  '">Music: Hours: ' +
                  hours_music +
                  ', Minutes: ' +
                  minutes_music +
                  ', Seconds: ' +
                  seconds_music +
                  '</span>';

                // Check if data for the second bar exists
                if (param.length > 1) {
                  const ms_podcast = param[1].data;
                  const seconds_podcast = Math.floor(ms_podcast / 1000) % 60;
                  const minutes_podcast = Math.floor(
                    (ms_podcast / (1000 * 60)) % 60,
                  );
                  const hours_podcast = Math.floor(
                    ms_podcast / (1000 * 60 * 60),
                  );

                  // Extracting color for the second bar
                  const color_podcast = param[1].color;

                  // Append the podcast data to the result
                  res +=
                    '<br>' +
                    '<span style="color:' +
                    color_podcast + // Add the color of the podcast bar
                    '">Podcast: Hours: ' +
                    hours_podcast +
                    ', Minutes: ' +
                    minutes_podcast +
                    ', Seconds: ' +
                    seconds_podcast +
                    '</span>';
                }

                return res;
              },
            },
          } as unknown as EChartsOption;
        }),
      ),
    ),
  );

  #listeningDataViewMusic$: Observable<SpotifyStreamingHistoryStateModel[]> =
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

  #listeningDataViewPodcast$: Observable<
    SpotifyStreamingHistoryPodcastStateModel[]
  > = this.#listeningTimePodcasts$.pipe(
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
    this.#listeningDataViewMusic$,
    this.#listeningDataViewPodcast$,
    this.#chartView$,
    this.dateRangeCombined$,
  ]).pipe(
    map(
      ([ld, ldvm, ldp, ec, dr]) =>
        ({
          listeningData: ld,
          listeningDataViewMusic: ldvm,
          listeningDataPodcast: ldp,
          chartView: ec,
          dateRangeCombined: dr,
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
      'spotify',
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
    this.#router.navigateByUrl('/spotify/listening-time');
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
      'spotify',
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

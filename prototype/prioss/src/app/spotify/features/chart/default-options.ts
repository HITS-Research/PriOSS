import { EChartsOption } from 'echarts';

export function defaultSpotifyEChartBarOptions(
  yAxisData: any[],
  seriesData: any[],
): EChartsOption {
  return {
    yAxis: {
      type: 'category',
      data: yAxisData,
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
        type: 'bar',
        data: seriesData,
        itemStyle: { color: '#1DB954' },
        label: {
          show: true,
          position: 'insideLeft',
          formatter: '{b}',
          color: '#000',
        },
      },
    ],
  };
}

export function defaultSpotifyEChartHeatMapOptions(
  title: string,
  minValue: number = 0,
  maxValue: number,
  minDate: string,
  maxDate: string,
  data: any
) {
  function pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  /**
   * Converts milliseconds to the HH:MM:SS time format
   */
  function convertMsToHHMMSS(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  return {
    title: {
      top: 30,
      left: 'center',
      text: `"${title}" Year-Heatmap`,
    },
    tooltip: {
      formatter: (params: { value: number[] }) => {
        return convertMsToHHMMSS(params.value[1]);
      },
    },
    visualMap: {
      min: minValue,
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
      data: data,
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
}

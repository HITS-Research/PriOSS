import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { ChartEvent, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { PriossChartDataset } from './chart-dataset.type';
import { PriossChartType } from './chart-type.type';

/**
 * Displays a chartjs chart with predefined settings from PriOSS.
 *
 * @example
 * <prioss-chart
 *   [datasource]="datasource"
 *   [labels]="labels"
 *   (chartClick)="click($event)"
 * />
 *
 * const labels: string[] = ['Sven', 'Max', 'Bob', 'Alice', 'Tessa']
 *
 * const datasource: PriossChartDataset[] = [
 *  { label: 'age', data: [30, 20, 23, 25, 19] },
 *  { label: 'weight:', data: [81, 76, 69, 65, 75] }
 * ];
 *
 * click(event: PriossChartEvent) {
 *   console.log(`
 *     The ${event.datasetLabel} of ${event.axisLabel}
 *     is ${event.value}.
 *   `);
 * }
 */
@Component({
  selector: 'prioss-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgChartsModule],
})
export class ChartComponent {
  /**
   * The reference to the chart-element (canvas).
   */
  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;

  /**
   * The Data which will be passed to the Chart.
   */
  data = computed(() => ({
    labels: this.labels(),
    datasets: this.datasource().map(d => ({
      type: d.type,
      label: d.label,
      data: d.data,
    })),
  }));

  /**
   * The options, which will be send to the chart.
   */
  options = computed<ChartOptions>(() => {
    const dataAxis = this.valueAxis();
    const options: ChartOptions = {
      responsive: true,
      indexAxis:
        this.typeIsRadial() || this.typeIsRound() ? undefined : this.mainAxis(),
    };

    if (dataAxis) {
      options.scales = {};
      options.scales[dataAxis] = {
        min: this.valueAxisMin(),
        max: this.valueAxisMax(),
        ticks: {
          stepSize: this.valueAxisStepSize(),
        },
      };
    }

    return options;
  });

  /**
   * The data for the chart to display.
   */
  datasource = input.required<PriossChartDataset[]>();

  /**
   * The labels which will be displayed on the main-axis.
   */
  labels = input.required<string[]>();

  /**
   * The type of the chart.
   */
  chartType = input<PriossChartType>('bar');

  /**
   * The type is either radar or polarArea.
   */
  typeIsRadial = computed(() => {
    const c = this.chartType();
    return 'radar' === c || 'polarArea' === c;
  });

  /**
   * The type is either pie or doughnut.
   */
  typeIsRound = computed(() => {
    const c = this.chartType();
    return 'pie' === c || 'doughnut' === c;
  });

  /**
   * The direction of the chart. In other words, which is the data-given axis.
   * Will be overwritten, when a radial-chart-type will be used.
   * Default: x
   */
  mainAxis = input<'x' | 'y'>('x');

  /**
   * Will be overwritten, when a radial-chart-type will be used.
   * The opposite axis to the main-axis.
   */
  valueAxis = computed<'x' | 'y' | 'r' | undefined>(() => {
    if (this.typeIsRound()) return undefined;
    if (this.typeIsRadial()) return 'r';
    return this.mainAxis() === 'x' ? 'y' : 'x';
  });

  /**
   * The displayed min value on the value-axis.
   */
  valueAxisMin = input<number | undefined, string>(undefined, {
    transform: numberAttribute,
  });

  /**
   * The displayed max value on the value-axis.
   */
  valueAxisMax = input<number | undefined, string>(undefined, {
    transform: numberAttribute,
  });

  /**
   * The step size on the value-axis.
   */
  valueAxisStepSize = input<number | undefined, string>(undefined, {
    transform: numberAttribute,
  });

  /**
   * Emits an event, when the user clicks on the chart.
   */
  @Output()
  chartClick = new EventEmitter<PriossChartEvent>();

  /**
   * Emits an event, when the user moves the mouse over the chart.
   */
  @Output()
  chartHover = new EventEmitter<PriossChartEvent>();

  /**
   * Processes the eventdata to build useable data and emits the
   * data
   * @param event An event, emitted by chartJs
   */
  processEvent(event: ChartJsEvent): void {
    const chart = this.chart;
    if (chart == null) return;

    const active = event.active;
    if (active == null || active.length === 0) return;

    const data = chart.data;
    if (data == null) return;

    const labels = data.labels;
    if (labels == null) return;

    const dataIndex = (active[0] as any).index;
    const datasetIndex = (active[0] as any).datasetIndex;

    const result: PriossChartEvent = {
      axisLabel: labels[dataIndex] as string,
      value: data.datasets[datasetIndex].data[dataIndex],
      datasetLabel: data.datasets[datasetIndex].label ?? '',
      rawEvent: event,
    };

    switch (event.event?.type) {
      case 'click':
        this.chartClick.emit(result);
        break;

      case 'mousemove':
        this.chartHover.emit(result);
        break;
    }
  }
}

/**
 * The processed chartjs event format for PriOSS.
 */
export type PriossChartEvent = {
  /**
   * The label on the main-axis.
   */
  axisLabel: string;

  /**
   * The label of the dataset in which the clicked data is in.
   */
  datasetLabel: string;

  /**
   * The value of the clicked element.
   */
  value: unknown;

  /**
   * The raw chartjs event, which has been emitted.
   */
  rawEvent: ChartJsEvent;
};

/**
 * The chartjs event.
 */
export type ChartJsEvent = {
  event?: ChartEvent | undefined;
  active?: object[] | undefined;
};

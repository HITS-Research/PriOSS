import { PriossChartType } from './chart-type.type';

/**
 * One dataset of the datasource. Multiple can be added to the datasource,
 * to dispalay data in parallel.
 */
export type PriossChartDataset = {
  /**
   * The type of this dataset in the chart.
   * This will override the default chart type.
   */
  type?: PriossChartType;

  /**
   * The label associated with this data.
   */
  label: string;

  /**
   * The data which will be displayed.
   */
  data: number[];
};

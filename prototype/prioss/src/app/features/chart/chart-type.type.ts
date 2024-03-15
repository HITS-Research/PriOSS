import { ChartType } from 'chart.js';

/**
 * The type of chart, which will be supported in prioss.
 *
 * @remarks scatter and bubble is not supported, because the datasource is not
 * specified.
 */
export type PriossChartType = Exclude<ChartType, 'scatter' | 'bubble'>;

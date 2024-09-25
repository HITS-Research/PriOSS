import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { LikesAndReactionsItem } from 'src/app/facebook/models/activityAcrossFacebook/CommentsAndReactions/LikesAndReactions';
import { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

/**
 * ReactionsFrequencyComponent is responsible for displaying the frequency of reactions over time.
 * It uses ECharts to render a stacked bar chart showing different types of reactions per year.
 */
@Component({
  selector: 'prioss-reactions-frequency',
  standalone: true,
  imports: [NgxEchartsDirective, NzEmptyModule, CommonModule],
  providers: [provideEcharts()],
  templateUrl: './reactions-frequency.component.html',
  styleUrl: './reactions-frequency.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionsFrequencyComponent {

  /**
   * Input property for the activity data across Facebook.
   * This data is used to compute reactions and their frequencies.
   */
  activityData = input.required<FbActivityAcrossFacebookModel>();

  /**
   * Computed property that extracts reactions from the activity data.
   * @returns An array of LikesAndReactionsItem or an empty array if no data is available.
   */
  reactions = computed(() => {
    return this.activityData().likesAndReactions?.likes_and_reactions ?? [];
  });

  /**
   * Computed property that determines the date of the first reaction.
   * @returns A Date object representing the first reaction date or January 1, 2004, if no reactions are available.
   */
  firstReactionDate = computed(() => {
    const all = this.reactionsPerYear();
    if (all.length === 0) {
      return new Date('2004-01-01');
    }
    return all[0].name;
  });

  /**
   * Computed property that determines the date of the last reaction.
   * @returns A Date object representing the last reaction date or the current date if no reactions are available.
   */
  lastReactionDate = computed(() => {
    const all = this.reactionsPerYear();
    if (all.length === 0) {
      return new Date();
    }
    return all[all.length - 1].name;
  });

  /**
   * Computed property that creates an array of years between the first and last reaction dates.
   * This is used for the x-axis of the chart.
   * @returns An array of strings representing years.
   */
  createDateRangeForGraph = computed(() => {
    const first = this.firstReactionDate();
    const last = new Date(this.lastReactionDate());
    const result: string[] = [];
    const currentDate = new Date(first);
    while (currentDate <= last) {
      result.push(`${currentDate.getFullYear()}`);
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return result;
  });

  /**
   * Computed property that extracts unique reaction types from the data.
   * @returns An array of strings representing unique reaction types.
   */
  reactionTypes = computed(() => {
    const reactionTypes = new Set<string>();
    for (const reaction of this.reactions()) {
        const capitalizedType = reaction.data[0].reaction.reaction.charAt(0).toUpperCase() + reaction.data[0].reaction.reaction.slice(1).toLowerCase();
        reactionTypes.add(capitalizedType);
    }
    return Array.from(reactionTypes);
  });

  /**
   * Computed property that aggregates reactions by year.
   * @returns An array of objects, each containing a year and the count of reactions for that year.
   */
  reactionsPerYear = computed(() => {
    const reacts = this.getReactionsPerYear(this.reactions());
    reacts.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    return reacts;
  });

  /**
   * Helper method to aggregate reactions by year.
   * @param reactions - An array of LikesAndReactionsItem to be aggregated.
   * @returns An array of objects, each containing a year and the count of reactions for that year.
   */
  getReactionsPerYear(reactions: LikesAndReactionsItem[]) {
    const yearDictionary: Record<string, Record<string,number>> = {};    
    for (const reaction of reactions) {
      let ts = 0;
      if (reaction.timestamp) {
        ts = reaction.timestamp;
      }
      
      const capitalizedReactionType = reaction.data[0].reaction.reaction.charAt(0).toUpperCase() + reaction.data[0].reaction.reaction.slice(1).toLowerCase();
      if(capitalizedReactionType){
        const date = new Date(ts * 1000);
        const year = `${date.getFullYear()}-01-01`;
        yearDictionary[year] = yearDictionary[year] ?? {};
        yearDictionary[year][capitalizedReactionType] = (yearDictionary[year][capitalizedReactionType] ?? 0) + 1;
      }
    }
    const result = Object.entries(yearDictionary).map(([name, value]) => ({ name: name, value: value }));
    return result;
  }

  /**
   * Computed property that creates the series data for the ECharts graph.
   * Each series represents a type of reaction.
   * @returns An array of SeriesOption objects for ECharts.
   */
  createSeries = computed(() => {
    const series: SeriesOption[] = [];
    for (const reactionType of this.reactionTypes()) {
      series.push({
        name: reactionType,
        type: 'bar',
        stack: 'Total',
        data: this.reactionsPerYear().map((r) => ({name: r.name, value: r.value[reactionType] ?? 0}))
      });
    }
    return series;
  });

  /**
   * Computed property that creates the complete options object for the ECharts graph.
   * This includes settings for the tooltip, legend, axes, and series data.
   * @returns An EChartsOption object containing all necessary configurations for the chart.
   */
  options = computed(() => {
    const options: EChartsOption = {
      tooltip: {
        trigger: 'axis'
      },
      aria: {
        enabled: true,
        decal: {
          show: true
        }
      },
      legend: {
        data: this.reactionTypes()
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: this.createDateRangeForGraph(),
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: this.createSeries()
    }
    return options;
  });
}
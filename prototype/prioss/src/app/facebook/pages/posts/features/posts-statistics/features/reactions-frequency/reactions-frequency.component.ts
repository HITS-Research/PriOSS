import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { LikesAndReactionsItem } from 'src/app/facebook/models/activityAcrossFacebook/CommentsAndReactions/LikesAndReactions';
import { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

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



  activityData = input.required<FbActivityAcrossFacebookModel>();

  reactions = computed(() => {
    return this.activityData().likesAndReactions?.likes_and_reactions?? [];
  });


  firstReactionDate = computed(() => {
    const all = this.reactionsPerYear();
    if (all.length === 0) {
      return new Date('2004-01-01');
    }
    return all[0].name;
  });

  lastReactionDate = computed(() => {
    const all = this.reactionsPerYear();
    if (all.length === 0) {
      return new Date();
    }
    return all[all.length - 1].name;
  });

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


  reactionTypes = computed(() => {
    const reactionTypes = new Set<string>();
    for (const reaction of this.reactions()) {
        const capitalizedType = reaction.data[0].reaction.reaction.charAt(0).toUpperCase() + reaction.data[0].reaction.reaction.slice(1).toLowerCase();
        reactionTypes.add(capitalizedType);
    }
    return Array.from(reactionTypes);
  });

  reactionsPerYear = computed(() => {
    const reacts = this.getReactionsPerYear(this.reactions());
    reacts.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    return reacts;
  });


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
   * For each reaction create a Series object and return the array with the series objects
   * example output: [{name: 'Like', type: 'bar', stack: 'Total', data: [{name: '2020-01-01', value: 10}, {name: '2021-01-01', value: 20}]}, ...
   * @returns SeriesOption[]
   */
  createSeries = computed(() => {
    const series: SeriesOption[] = [];
    for (const reactionType of this.reactionTypes()) {
      series.push({
        name: reactionType,
        type: 'bar',
        stack: 'Total',
        data: this.reactionsPerYear().map((r) => ({name: r.name, value: r.value[reactionType]?? 0}))
      });
    }
    return series;
  });

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

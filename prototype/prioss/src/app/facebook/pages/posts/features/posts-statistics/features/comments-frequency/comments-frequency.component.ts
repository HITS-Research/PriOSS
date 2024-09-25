import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

/**
 * Component for displaying the frequency of comments over time.
 */
@Component({
  selector: 'prioss-comments-frequency',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule, NzEmptyModule],
  providers: [provideEcharts()],
  templateUrl: './comments-frequency.component.html',
  styleUrl: './comments-frequency.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsFrequencyComponent {

  /** Input for Facebook activity data */
  activityData = input.required<FbActivityAcrossFacebookModel>();

  /** Computed property for comments data */
  comments = computed(() => {
    return this.activityData().comments?.comments_v2 ?? [];
  });

  /** Computed property for group comments data */
  groupComments = computed(() => {
    return this.activityData().groupComments?.group_comments_v2 ?? [];
  });

  /** Computed property for all comments aggregated by year */
  allCommentsPerYear = computed(() => {
    const all: {name: string, value: number}[] = [];
    all.push(...this.commentsPerYear());
    all.push(...this.groupCommentsPerYear());
    all.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    return all;
  });

  /** Computed property for the date of the first comment */
  firstCommentDate = computed(() => {
    const all = this.allCommentsPerYear();
    if (all.length === 0) {
      return new Date('2004-01-01');
    }
    return all[0].name;
  });

  /** Computed property for the date of the last comment */
  lastCommentDate = computed(() => {
    const all = this.allCommentsPerYear();
    if (all.length === 0) {
      return new Date();
    }
    return all[all.length - 1].name;
  });

  /** Computed property for the date range to be used in the graph */
  dateRangeForGraph = computed(() => {
    const first = this.firstCommentDate();
    const last = new Date(this.lastCommentDate());
    const result: string[] = [];
    const currentDate = new Date(first);
    while (currentDate <= last) {
      result.push(`${currentDate.getFullYear()}`);
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return result;
  });

  /** Computed property for regular comments aggregated by year */
  commentsPerYear = computed(() => {
    return this.getCommentsPerYear(this.comments());
  });

  /** Computed property for group comments aggregated by year */
  groupCommentsPerYear = computed(() => {
    return this.getCommentsPerYear(this.groupComments());
  });

  /**
   * Helper method to aggregate comments by year
   * @param posts Array of comments to aggregate
   * @returns Array of objects with year and comment count
   */
  getCommentsPerYear(posts: any) {
    const yearDictionary: Record<string, number> = {};
    for (const post of posts) {
      let ts = 0;
      if (post.timestamp) {
        ts = post.timestamp;
      } else if (post.last_modified_timestamp) {
        ts = post.last_modified_timestamp;
      } else if (post.creation_timestamp) {
        ts = post.creation_timestamp;
      }
      const date = new Date(ts*1000);
      const year = `${date.getFullYear()}-01-01`;
      yearDictionary[year] = (yearDictionary[year] ?? 0) + 1;
    }
    
    const result = Object.entries(yearDictionary).map(([name, value]) => ({ name: name, value: value }));
   
    return result;
  }

  /** Computed property for ECharts options */
  options = computed(() => {
    const options: EChartsOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Comments', 'Group Comments']
      },
      aria: {
        enabled: true,
        decal: {
          show: true
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: this.dateRangeForGraph(),
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [
        {
          name: 'Comments',
          type: 'bar',
          stack: 'Total',
          data: this.commentsPerYear()
        },
        {
          name: 'Group Comments',
          type: 'bar',
          stack: 'Total',
          data: this.groupCommentsPerYear()
        }
      ]
    }
    return options;
  });
}
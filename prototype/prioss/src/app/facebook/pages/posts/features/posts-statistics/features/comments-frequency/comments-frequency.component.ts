import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

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



  activityData = input.required<FbActivityAcrossFacebookModel>();

  comments = computed(() => {
    return this.activityData().comments?.comments_v2 ?? [];
  });

  groupComments = computed(() => {
    return this.activityData().groupComments?.group_comments_v2 ?? [];
  });

  allCommentsPerYear = computed(() => {
    const all: {name: string, value: number}[] = [];
    all.push(...this.commentsPerYear());
    all.push(...this.groupCommentsPerYear());
    all.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    return all;
  });

  firstCommentDate = computed(() => {
    const all = this.allCommentsPerYear();
    if (all.length === 0) {
      return new Date('2004-01-01');
    }
    return all[0].name;
  });

  lastCommentDate = computed(() => {
    const all = this.allCommentsPerYear();
    if (all.length === 0) {
      return new Date();
    }
    return all[all.length - 1].name;
  });

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




  commentsPerYear = computed(() => {
    return this.getCommentsPerYear(this.comments());
  });



  groupCommentsPerYear = computed(() => {
    return this.getCommentsPerYear(this.groupComments());
  });


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

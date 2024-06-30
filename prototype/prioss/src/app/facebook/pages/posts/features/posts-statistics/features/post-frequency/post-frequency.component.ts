import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import type { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'prioss-post-frequency',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule],
  providers: [provideEcharts()],
  templateUrl: './post-frequency.component.html',
  styleUrl: './post-frequency.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFrequencyComponent {



  activityData = input.required<FbActivityAcrossFacebookModel>();

  allPosts = computed(() => {
    const all: {name: string, value: number}[] = [];
    all.push(...this.postsPerDay());
    all.push(...this.albumPostsPerDay());
    all.push(...this.groupPostsPerDay());
    all.push(...this.uncategorizedPhotosPerDay());
    all.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    return all;
  });

  firstPostDate = computed(() => {
    const all = this.allPosts();
    if (all.length === 0) {
      return new Date('2004-01-01');
    }
    return all[0].name;
  });

  lastPostDate = computed(() => {
    const all = this.allPosts();
    if (all.length === 0) {
      return new Date();
    }
    return all[all.length - 1].name;
  });

  dateRangeForGraph = computed(() => {
    const first = this.firstPostDate();
    const last = (new Date(this.lastPostDate())) > new Date() ? new Date() : new Date(this.lastPostDate());
    const result: string[] = [];
    const currentDate = new Date(first);
    while (currentDate <= last) {
      result.push(`${currentDate.getFullYear()}`);
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return result;
  });

  posts = computed(() => {
    return this.activityData().posts ?? [];
  });
  albumPosts = computed(() => {
    return this.activityData().albums ?? [];
  });
  groupPosts = computed(() => {
    return this.activityData().groupPosts?.group_posts_v2 ?? [];
  });
  uncategorizedPhotos = computed(() => {
    return this.activityData().uncategorizedPhotos?.other_photos_v2 ?? [];
  });

  postsPerDay = computed(() => {
    return this.getPostsPerMonth(this.posts());
  });

  albumPostsPerDay = computed(() => {
    return this.getPostsPerMonth(this.albumPosts());
  });

  groupPostsPerDay = computed(() => {
    return this.getPostsPerMonth(this.groupPosts());
  });

  uncategorizedPhotosPerDay = computed(() => {
    return this.getPostsPerMonth(this.uncategorizedPhotos());
  });

  getPostsPerMonth(posts: any) {
    const dayDictionary: Record<string, number> = {};
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
      const day = `${date.getFullYear()}-01-01`;
      dayDictionary[day] = (dayDictionary[day] ?? 0) + 1;
    }
    
    const result = Object.entries(dayDictionary).map(([name, value]) => ({ name: name, value: value }));
   
    return result;
  }

  options = computed(() => {
    const options: EChartsOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Posts', 'Group Posts', 'Album Posts', 'Uncategorized Photos']
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
        name: "Year",
				nameLocation: "middle",
				nameGap: 30,
        type: 'category',
        data: this.dateRangeForGraph(),
        axisLabel: {
          rotate: 30
        }
      },
      yAxis: {
        name: "Posts",
				nameLocation: "end",
				nameGap: 20,
        type: 'value',
        minInterval: 1
      },
      series: [
        {
          name: 'Posts',
          type: 'bar',
          stack: 'Total',
          data: this.postsPerDay()
        },
        {
          name: 'Album Posts',
          type: 'bar',
          stack: 'Total',
          data: this.albumPostsPerDay()
        },
        {
          name: 'Group Posts',
          type: 'bar',
          stack: 'Total',
          data: this.groupPostsPerDay()
        },
        {
          name: 'Uncategorized Photos',
          type: 'bar',
          stack: 'Total',
          data: this.uncategorizedPhotosPerDay()
        }
      ]

    }
    return options;
  });

}

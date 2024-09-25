import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import type { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';
import type { EChartsOption } from 'echarts';

/**
 * PostFrequencyComponent is responsible for displaying the frequency of posts over time.
 * It uses ECharts to render a stacked bar chart showing different types of posts per year.
 */
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

  /**
   * Input property for the activity data across Facebook.
   * This data is used to compute post frequencies for different types of posts.
   */
  activityData = input.required<FbActivityAcrossFacebookModel>();

  /**
   * Computed property that aggregates all types of posts.
   * @returns An array of objects, each containing a date and the count of posts for that date.
   */
  allPosts = computed(() => {
    const all: {name: string, value: number}[] = [];
    all.push(...this.postsPerDay());
    all.push(...this.albumPostsPerDay());
    all.push(...this.groupPostsPerDay());
    all.push(...this.uncategorizedPhotosPerDay());
    all.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    return all;
  });

  /**
   * Computed property that determines the date of the first post.
   * @returns A Date object representing the first post date or January 1, 2004, if no posts are available.
   */
  firstPostDate = computed(() => {
    const all = this.allPosts();
    if (all.length === 0) {
      return new Date('2004-01-01');
    }
    return all[0].name;
  });

  /**
   * Computed property that determines the date of the last post.
   * @returns A Date object representing the last post date or the current date if no posts are available.
   */
  lastPostDate = computed(() => {
    const all = this.allPosts();
    if (all.length === 0) {
      return new Date();
    }
    return all[all.length - 1].name;
  });

  /**
   * Computed property that creates an array of years between the first and last post dates.
   * This is used for the x-axis of the chart.
   * @returns An array of strings representing years.
   */
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

  /**
   * Computed property that extracts regular posts from the activity data.
   * @returns An array of post objects.
   */
  posts = computed(() => {
    return this.activityData().posts ?? [];
  });

  /**
   * Computed property that extracts album posts from the activity data.
   * @returns An array of album post objects.
   */
  albumPosts = computed(() => {
    return this.activityData().albums ?? [];
  });

  /**
   * Computed property that extracts group posts from the activity data.
   * @returns An array of group post objects.
   */
  groupPosts = computed(() => {
    return this.activityData().groupPosts?.group_posts_v2 ?? [];
  });

  /**
   * Computed property that extracts uncategorized photos from the activity data.
   * @returns An array of uncategorized photo objects.
   */
  uncategorizedPhotos = computed(() => {
    return this.activityData().uncategorizedPhotos?.other_photos_v2 ?? [];
  });

  /**
   * Computed property that aggregates regular posts by year.
   * @returns An array of objects, each containing a year and the count of posts for that year.
   */
  postsPerDay = computed(() => {
    return this.getPostsPerMonth(this.posts());
  });

  /**
   * Computed property that aggregates album posts by year.
   * @returns An array of objects, each containing a year and the count of album posts for that year.
   */
  albumPostsPerDay = computed(() => {
    return this.getPostsPerMonth(this.albumPosts());
  });

  /**
   * Computed property that aggregates group posts by year.
   * @returns An array of objects, each containing a year and the count of group posts for that year.
   */
  groupPostsPerDay = computed(() => {
    return this.getPostsPerMonth(this.groupPosts());
  });

  /**
   * Computed property that aggregates uncategorized photos by year.
   * @returns An array of objects, each containing a year and the count of uncategorized photos for that year.
   */
  uncategorizedPhotosPerDay = computed(() => {
    return this.getPostsPerMonth(this.uncategorizedPhotos());
  });

  /**
   * Helper method to aggregate posts by year.
   * @param posts - An array of post objects to be aggregated.
   * @returns An array of objects, each containing a year and the count of posts for that year.
   */
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
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from "@ngxs/store";
import { YouTubeCommentData } from "../../models";
import { YouTubeState } from "../../state/youtube.state";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTableModule} from "ng-zorro-antd/table";
import {NgxEchartsModule} from "ngx-echarts";
import {NzIconModule} from "ng-zorro-antd/icon";
import {EChartsOption} from "echarts";

@Component({
  selector: 'prioss-youtube-comment',
  templateUrl: './youtube-comment.component.html',
  styleUrls: ['./youtube-comment.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NzGridModule,
    NzStatisticModule,
    TitleBarComponent,
    NgxEchartsModule,
    NzTabsModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NgForOf,
    DatePipe,
  ],
  standalone: true
})
export class YoutubeCommentComponent implements OnInit {
  @Input() previewMode: boolean = false;
  userComments: YouTubeCommentData[];
  filteredComments: YouTubeCommentData[] = [];
  commentTrendOptions: EChartsOption;

  constructor(private store: Store, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchComments();
    this.setupCharts();
    this.filterComments();
  }

  fetchComments() {
    this.userComments = this.store.selectSnapshot(YouTubeState.getUserComments);
    this.changeDetectorRef.markForCheck();
  }

  setupCharts() {
    this.setupCommentTrendChart();
  }

  setupCommentTrendChart() {
    const dateArray = this.userComments.map(comment => new Date(comment.timestamp).toLocaleDateString('default', { month: 'long', year: 'numeric' }));
    const countPerDay = dateArray.reduce((acc: {[key: string]: number}, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    this.commentTrendOptions = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: ["Posted Comments"]
      },
      xAxis: {
        type: 'category',
        data: Object.keys(countPerDay),
        axisLabel: {
          formatter: function(value: string) {
            return value;
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: {
          formatter: function(value: number) {
            return Math.floor(value).toString();
          }
        }
      },
      series: [{
        name: "Posted Comments",
        data: Object.values(countPerDay),
        type: 'line',
        smooth: true
      }]
    };
  }

  filterComments() {
    this.filteredComments = [...this.userComments];
  }
}

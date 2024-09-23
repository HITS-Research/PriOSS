import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {YouTubeChatData} from "../../models";
import {YouTubeState} from "../../state/youtube.state";
import {EChartsOption} from "echarts";
import {DecimalPipe, NgIf} from "@angular/common";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {YoutubeChatViewComponent} from "./youtube-chat-view/youtube-chat-view.component";
import {NgxEchartsDirective} from "ngx-echarts";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTypographyComponent} from "ng-zorro-antd/typography";

@Component({
  selector: 'prioss-youtube-chat',
  templateUrl: './youtube-chat.component.html',
  styleUrl: './youtube-chat.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NzRowDirective,
    NzColDirective,
    NzStatisticComponent,
    TitleBarComponent,
    NzCardComponent,
    NzTabSetComponent,
    NzTabComponent,
    YoutubeChatViewComponent,
    NgxEchartsDirective,
    DecimalPipe,
    NzIconDirective,
    NzTypographyComponent
  ],
  standalone: true
})
export class YoutubeChatComponent implements OnInit{
  @Input() previewMode:boolean = false;
  messages : YouTubeChatData[];
  chatTrendOptions: EChartsOption;
  videoCounts: number

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.messages = this.store.selectSnapshot(YouTubeState.getUserMessages);
    this.videoCounts = this.videoCount().length
    this.setupCharts();
  }

  videoCount(): string[] {
    const videoIds = this.messages
        .map((chat: YouTubeChatData) => chat.videoId);

    return [...new Set(videoIds)];
  }

  setupCharts() {
    this.setupChatTrendChart();
  }


  setupChatTrendChart() {
    const dateArray = this.messages.map(chat => new Date(chat.timestamp).toLocaleDateString('default', { month: 'long', year: 'numeric' }));
    const countPerDay = dateArray.reduce((acc: {[key: string]: number}, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    this.chatTrendOptions = {
      tooltip: { trigger: 'axis' },
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
        data: Object.values(countPerDay),
        type: 'line',
        smooth: true
      }]
    };
  }
}

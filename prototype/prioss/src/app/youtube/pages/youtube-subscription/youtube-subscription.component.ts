import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {YouTubeSubscriptionData} from "../../models";
import {YouTubeState} from "../../state/youtube.state";
import {EChartsOption} from "echarts";
import {NgIf} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzEmptyModule} from "ng-zorro-antd/empty";

@Component({
  selector: 'prioss-youtube-subscription',
  templateUrl: './youtube-subscription.component.html',
  styleUrl: './youtube-subscription.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgxEchartsModule,
    TitleBarComponent,
    NzCardModule,
    NzEmptyModule
  ],
  standalone: true
})
export class YoutubeSubscriptionComponent implements OnInit {
  @Input() previewMode: boolean = false;
  userSubscriptions: YouTubeSubscriptionData[];
  chartOptions: EChartsOption = {};

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.userSubscriptions = this.store.selectSnapshot(YouTubeState.getSubscriptions);
    this.prepareGraph();
  }

  private prepareGraph() {
    const links: { source: string, target: string }[] = [];
    const nodes = [{name: 'you'}, ...this.userSubscriptions.map((subscriptionData) => {
      links.push({source: 'you', target: subscriptionData.channelTitle});
      return {name: subscriptionData.channelTitle}
    })];
    this.chartOptions = {
      title: {
        text: !this.previewMode?'Subscribed '+this.userSubscriptions.length+' Channels':''
      },
      animation:false,
      tooltip: {
        trigger: !this.previewMode?'item':'none',
        formatter: (params: any) => {
          if (params['dataType'] === 'node' && params.data.name !== "you") {
            return 'Channel: ' + params.data.name;
          } else {
            return "";
          }
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        categories: [{name: 'Subscribed Channels'}],
        roam: true,
        label: {
          show: true,
          position: 'right',
          fontSize: !this.previewMode?12:8,
          formatter: '{b}'
        },
        force: {
          repulsion: !this.previewMode?250:100,
          edgeLength: !this.previewMode?[30, 150]:[2,2]
        },
        lineStyle: {
          color: 'source',
          curveness: 0.2
        },
      }],
    };
  }

  clickHandler(nodeValue: string) {
    if (nodeValue !== 'you') {
      window.open("https://www.youtube.com/channel/" + this.userSubscriptions.find((subscriptionData) => subscriptionData.channelTitle === nodeValue)?.channelId.trim(), '_blank');
    }
  }
}

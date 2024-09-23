import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {Store} from "@ngxs/store";
import {YouTubeState} from "../../state/youtube.state";
import {YouTubeUserSearchHistoryData, YouTubeUserWatchHistoryData, YouTubeWatchHistoryPieChartData} from "../../models";
import {EChartsOption} from "echarts";
import YoutubeHistoryGraphData from "../../models/youtube-history-graph-data-model.interface";
import {WordCloudComponent} from "../../../features/word-cloud/word-cloud.component";
import {CustomStorageService} from "../../state/custom-storage/service/custom-storage.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzCollapseModule } from "ng-zorro-antd/collapse";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {EllipsisPipe} from "../../../features/ellipsis/ellipsis.pipe";

@Component({
  selector: 'prioss-youtube-history',
  templateUrl: './youtube-history.component.html',
  styleUrl: './youtube-history.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgxEchartsModule,
    TitleBarComponent,
    NzCardModule,
    NzTabsModule,
    NzTypographyModule,
    WordCloudComponent,
    NzCollapseModule,
    NzTableModule,
    NzIconModule,
    NgForOf,
    DatePipe,
    EllipsisPipe
  ],
  standalone: true
})
export class YoutubeHistoryComponent implements OnInit{
  @Input() previewMode:boolean = false;
  @ViewChild('searchWordCloudRef', { static: false }) searchWordlCloud: WordCloudComponent;
  @ViewChild('watchWordCloudRef', { static: false }) watchWordlCloud: WordCloudComponent;
  searchHistory: YouTubeUserSearchHistoryData[];
  watchHistory: YouTubeUserWatchHistoryData[];
  graphData: YoutubeHistoryGraphData;
  echartOptions: EChartsOption = {} as EChartsOption;
  pieChartOption: EChartsOption = {} as EChartsOption;
  searchData: string[];
  watchData: string[];
  watchHistoryPieData: YouTubeWatchHistoryPieChartData[];
  currentTabIndex=0;

  constructor(private store: Store, private db: CustomStorageService) {
  }

  ngOnInit() {
    this.graphData = this.store.selectSnapshot((YouTubeState.getUserHistoryGraphData));
    this.prepareHistoryStatGraph();
    this.searchData=[...this.store.selectSnapshot(YouTubeState.getUserRecentSearchHistory)];
    this.watchData=[...this.store.selectSnapshot(YouTubeState.getUserRecentWatchHistory)];
    this.watchHistoryPieData=[...this.store.selectSnapshot(YouTubeState.getUserWatchHistoryPieData)];
    this.prepareChannelPieChart();
    this.db.get("searchHistory").subscribe((data)=>{
      this.searchHistory = data?JSON.parse(data) as YouTubeUserSearchHistoryData[] : [];
    })
    this.db.get("watchHistory").subscribe((data)=>{
      this.watchHistory = data?JSON.parse(data) as YouTubeUserWatchHistoryData[] : [];
    })
  }

  prepareHistoryStatGraph(){
    this.echartOptions = {
      aria: {
        enabled: true,
        decal: {
          show: true,
        },
      },
      grid: {
        top: 70,
        bottom: 50
      },
      tooltip: {
        trigger: "axis",
      },
      toolbox: {
        feature: !this.previewMode?{
          saveAsImage: {}
        }:{}
      },
      legend: !this.previewMode?{
        data: ["Search History", "Watch History"]
      }:{data: []},
      xAxis: {
        type: "category",
        data: this.graphData.dateRange,
      },
      yAxis: {
        type: "value",
        minInterval: 1,
      },
      series: [
        {
          name: "Search History",
          data: this.graphData.searchData,
          type: "line",
          smooth: true,
        },
        {
          name: "Watch History",
          data: this.graphData.watchData,
          type: "line",
          smooth: true,
        },
      ],
    };
  }

  prepareChannelPieChart(){
    this.pieChartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'centre'
      },
      series: [
        {
          name: 'Channel',
          type: 'pie',
          radius: '80%',
          data: this.watchHistoryPieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  redrawCloud(){
    if(this.currentTabIndex===1){
      this.searchWordlCloud.reDraw();
    }else if (this.currentTabIndex===2){
      this.watchWordlCloud.reDraw();
    }
  }

  downloadCloud(){
    if(this.currentTabIndex===1){
      this.searchWordlCloud.saveAsImage();
    }else if (this.currentTabIndex===2){
      this.watchWordlCloud.saveAsImage();
    }
  }

  tabChangeHandler(event:any){
    this.currentTabIndex = event['index'];
    if(this.currentTabIndex===1||this.currentTabIndex===2){
      this.redrawCloud();
    }
  }
}

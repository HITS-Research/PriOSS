import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { YouTubeState } from '../../state/youtube.state';
import YouTubeStateModel from '../../state/models/youtube-state.model';
import YouTubeUserVideoMetaData from '../../models/youtube-user-video-meta-data-model.interface';
import { YouTubeUserChannelUrlConfigData } from '../../models';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconDirective} from "ng-zorro-antd/icon";

interface PrivacyCount {
  publicVideos: number;
  privateVideos: number;
}

@Component({
  selector: 'prioss-youtube-channel-video',
  templateUrl: './youtube-channel-video.component.html',
  styleUrl: './youtube-channel-video.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NzGridModule,
    NzStatisticModule,
    TitleBarComponent,
    NzCardModule,
    NzTableModule,
    NzTabsModule,
    NgForOf,
    DatePipe,
    NzIconDirective,
    DecimalPipe
  ],
  standalone: true
})
export class YoutubeChannelVideoComponent implements OnInit{
  @Select(YouTubeState) youtubeState$: Observable<YouTubeStateModel>;
  @Input() previewMode:boolean = false;

  videosMetaData: YouTubeUserVideoMetaData[] = [];
  channelData: YouTubeUserChannelUrlConfigData[] = [];
  privacyCount: PrivacyCount;


  ngOnInit() {
    this.youtubeState$.subscribe(state => {
      if(state?.userData[0]?.videosMetaData.length>0){
        this.privacyCount =  state.userData[0].videosMetaData.reduce((
          (count, video) => {
            if (video.privacy === "Public"){
              count.publicVideos++;
            } else if (video.privacy === "Private"){
              count.privateVideos++
            }
            return count;
          }
        ), {publicVideos: 0, privateVideos:0})
        this.videosMetaData = state.userData[0].videosMetaData;
        this.channelData = state.userData[0].channelsUrlConfig;
      }
    });
  }

}

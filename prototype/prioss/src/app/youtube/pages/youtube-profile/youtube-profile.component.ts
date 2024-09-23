import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {YouTubeProfileData} from "../../models";
import {YouTubeState} from "../../state/youtube.state";
import {NgIf} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTimelineModule} from "ng-zorro-antd/timeline";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";

@Component({
  selector: 'prioss-youtube-profile',
  templateUrl: './youtube-profile.component.html',
  styleUrl: './youtube-profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzImageModule,
    NzSpaceModule,
    NzStatisticModule,
    NzTableModule,
    NzTimelineModule,
    NzToolTipModule,
    TitleBarComponent,
  ],
  standalone: true
})
export class YoutubeProfileComponent implements OnInit{
  @Input() previewMode:boolean = false;
  userProfile : YouTubeProfileData;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.userProfile = this.store.selectSnapshot(YouTubeState.getUserProfile);
  }
}

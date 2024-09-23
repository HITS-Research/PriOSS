import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {YouTubeUserPlaylistData, YouTubeUserPlaylistMetadata} from "../../models";
import {YouTubeState} from "../../state/youtube.state";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {TitleBarComponent} from "../../../features/title-bar/title-bar.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'prioss-youtube-playlist',
  templateUrl: './youtube-playlist.component.html',
  styleUrl: './youtube-playlist.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NzGridModule,
    NzStatisticModule,
    DecimalPipe,
    TitleBarComponent,
    NzTabsModule,
    NzTableModule,
    NgForOf,
    DatePipe
  ],
  standalone: true
})
export class YoutubePlaylistComponent implements OnInit{
  @Input() previewMode:boolean = false;
  playlistMeta:YouTubeUserPlaylistMetadata[];
  playlists:YouTubeUserPlaylistData[];
  videoCount:number = 0;
  playlistDataMap:Map<string, any> = new Map();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.playlists = this.store.selectSnapshot(YouTubeState.getUserPlaylists);
    this.playlistMeta = this.store.selectSnapshot(YouTubeState.getUserPlaylistsMeta);
    this.preparePreviewModeData();
    this.prepareFullModeData();
  }

  preparePreviewModeData() {
    for (const playlist of this.playlists) {
      this.videoCount += playlist.videos.length;
    }
  }

  prepareFullModeData() {
    for (const playlist of this.playlistMeta) {
      this.playlistDataMap.set(playlist.title, {
        title: playlist.title,
        creationTimestamp: playlist.creationTimestamp,
        lastUpdateTimestamp: playlist.lastUpdateTimestamp,
        visibility: playlist.visibility
      })
    }

    for (const playlist of this.playlists) {
      const dataMap = this.playlistDataMap.get(playlist.playlistName);
      dataMap.videos = playlist.videos;
    }
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { FbActivityAcrossFacebookModel, FbUserDataModel } from 'src/app/facebook/state/models';
import { PostFrequencyComponent } from './features/post-frequency/post-frequency.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommentsFrequencyComponent } from './features/comments-frequency/comments-frequency.component';
import { ReactionsFrequencyComponent } from './features/reactions-frequency/reactions-frequency.component';
import { TopLikedPersonsComponent } from './features/top-liked-persons/top-liked-persons.component';
import { FbTopLikedPagesComponent } from './features/fb-top-liked-pages/fb-top-liked-pages.component';

@Component({
  selector: 'prioss-posts-statistics',
  standalone: true,
  imports: [
    PostFrequencyComponent,
    CommentsFrequencyComponent,
    ReactionsFrequencyComponent,
    TopLikedPersonsComponent,
    FbTopLikedPagesComponent,
    NzGridModule,
    CommonModule,
    NzCardModule
  ],
  templateUrl: './posts-statistics.component.html',
  styleUrl: './posts-statistics.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsStatisticsComponent {
  userData = input.required<FbUserDataModel>();
  postData = computed(() => {
    return this.userData()?.activity_across_facebook??{} as FbActivityAcrossFacebookModel;
  });


}

import { Store } from '@ngxs/store';
import { Component, type OnInit, ChangeDetectionStrategy, signal, computed, type Signal, Input } from '@angular/core';
import type { FbActivityAcrossFacebookModel, FbUserDataModel } from '../../state/models';
import type { AlbumModel, PostModel, PostPhotoModel, UncategorizedPhotos } from '../../models';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { PostsOverviewComponent } from './features/posts-overview/posts-overview.component';
import { PostsStatisticsComponent } from './features/posts-statistics/posts-statistics.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommentsComponent } from './features/comments/comments.component';
import { CommentsInGroupsComponent } from './features/comments-in-groups/comments-in-groups.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { PostFrequencyComponent } from './features/posts-statistics/features/post-frequency/post-frequency.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    NzTabsModule,
    NzGridModule,
    NzIconModule, 
    NzCardModule,
    CommentsComponent,
    NzStatisticModule, 
    NzSkeletonModule,
    CommonModule, 
    TitleBarComponent,
    CommentsInGroupsComponent,
    PostFrequencyComponent,
    PostsOverviewComponent,
    PostsStatisticsComponent],
  providers: [],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  loading = signal<boolean>(true);
  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  activityData = computed(() => this.userData().activity_across_facebook ?? {} as FbActivityAcrossFacebookModel);
  posts: Signal<PostModel[]> = computed(() => this.userData().activity_across_facebook?.posts ?? []);
  groupPosts: Signal<PostModel[]> = computed(() => this.userData().activity_across_facebook?.groupPosts?.group_posts_v2 ?? []);
  albumPosts: Signal<AlbumModel[]> = computed(() => this.userData().activity_across_facebook?.albums ?? []);
  photoPosts: Signal<PostPhotoModel> = computed(() => this.userData().activity_across_facebook?.postPhotos ?? {} as PostPhotoModel);
  uncategorizedPhotos: Signal<UncategorizedPhotos> = computed(() => this.userData().activity_across_facebook?.uncategorizedPhotos ?? {} as UncategorizedPhotos);
  postCountPreview: Signal<number> = computed(() => this.posts().length +this.groupPosts().length + this.albumPosts().length);
  albumsCountPreview: Signal<number> = computed(() => this.albumPosts().length ?? 0);
  photosCountPreview: Signal<number> = computed(() => {
    let photoCount = 0;
    for(const album of this.albumPosts()){
      photoCount += album.photos.length;
    }
    if(this.uncategorizedPhotos().other_photos_v2){
      photoCount += this.uncategorizedPhotos().other_photos_v2.length;
    }
    return photoCount;
  });
  comments = computed(() => this.userData().activity_across_facebook?.comments?.comments_v2 ?? []);
  commentsCountPreview: Signal<number> = computed(() => {
    return this.comments().length;
  });
  groupComments = computed(() => this.userData().activity_across_facebook?.groupComments?.group_comments_v2 ?? []);
  groupCommentsCountPreview: Signal<number> = computed(() => {
    return this.groupComments().length;
  });
  reactions = computed(() => this.userData().activity_across_facebook?.likesAndReactions?.likes_and_reactions ?? []);
  reactionsCountPreview: Signal<number> = computed(() => {
    return this.reactions().length;
  });

  @Input()
  previewMode = false;


  constructor(private store: Store,
    private indexedDbService: IndexedDbService
  ) { 
  }


  async ngOnInit() {
    await this.indexedDbService.getSelectedFacebookDataStore()
    .then((data) => {
      if(data.facebookData){
        this.userData.set(data.facebookData);
      }else{
        this.userData.set({} as FbUserDataModel);
      }
    }).finally(() => {
      this.loading.set(false);
    });
  }




}

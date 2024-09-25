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

/**
 * PostsComponent is responsible for displaying and managing posts-related data.
 * It provides an overview of user posts, albums, photos, comments, and reactions.
 */
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
  /** Signal indicating whether data is being loaded */
  loading = signal<boolean>(true);

  /** Signal containing the user data */
  userData = signal<FbUserDataModel>({} as FbUserDataModel);

  /** Computed signal for activity data across Facebook */
  activityData = computed(() => this.userData().activity_across_facebook ?? {} as FbActivityAcrossFacebookModel);

  /** Signal for posts data */
  posts: Signal<PostModel[]> = computed(() => this.userData().activity_across_facebook?.posts ?? []);

  /** Signal for group posts data */
  groupPosts: Signal<PostModel[]> = computed(() => this.userData().activity_across_facebook?.groupPosts?.group_posts_v2 ?? []);

  /** Signal for album posts data */
  albumPosts: Signal<AlbumModel[]> = computed(() => this.userData().activity_across_facebook?.albums ?? []);

  /** Signal for photo posts data */
  photoPosts: Signal<PostPhotoModel> = computed(() => this.userData().activity_across_facebook?.postPhotos ?? {} as PostPhotoModel);

  /** Signal for uncategorized photos data */
  uncategorizedPhotos: Signal<UncategorizedPhotos> = computed(() => this.userData().activity_across_facebook?.uncategorizedPhotos ?? {} as UncategorizedPhotos);

  /** Computed signal for total post count preview */
  postCountPreview: Signal<number> = computed(() => this.posts().length +this.groupPosts().length + this.albumPosts().length);

  /** Computed signal for albums count preview */
  albumsCountPreview: Signal<number> = computed(() => this.albumPosts().length ?? 0);

  /** Computed signal for total photos count preview */
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

  /** Computed signal for comments data */
  comments = computed(() => this.userData().activity_across_facebook?.comments?.comments_v2 ?? []);

  /** Computed signal for comments count preview */
  commentsCountPreview: Signal<number> = computed(() => {
    return this.comments().length;
  });

  /** Computed signal for group comments data */
  groupComments = computed(() => this.userData().activity_across_facebook?.groupComments?.group_comments_v2 ?? []);

  /** Computed signal for group comments count preview */
  groupCommentsCountPreview: Signal<number> = computed(() => {
    return this.groupComments().length;
  });

  /** Computed signal for reactions data */
  reactions = computed(() => this.userData().activity_across_facebook?.likesAndReactions?.likes_and_reactions ?? []);

  /** Computed signal for reactions count preview */
  reactionsCountPreview: Signal<number> = computed(() => {
    return this.reactions().length;
  });

  /** Input property to determine if the component is in preview mode */
  @Input()
  previewMode = false;

  /**
   * Constructor for PostsComponent
   * @param store - The NgRx store service
   * @param indexedDbService - The IndexedDB service for data storage
   */
  constructor(private store: Store,
    private indexedDbService: IndexedDbService
  ) { 
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized
   */
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
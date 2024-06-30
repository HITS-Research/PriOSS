import { CommonModule, DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, type OnInit, computed, input, type Signal, inject, signal } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import type { AlbumModel, GroupPostsModel, PostModel, PostPhotoModel, UncategorizedPhotos } from "src/app/facebook/models";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import type { FbActivityAcrossFacebookModel } from "src/app/facebook/state/models";
import { IndexedDbService } from "src/app/state/indexed-db.state";
import { FacebookIndexedDBMedia } from "src/app/facebook/models/FacebookIndexDBMedia.interface";
import { AppType } from "src/app/framework/pages/service-selection/app-type";

@Component({
  selector: "prioss-posts-overview",
  standalone: true,
  imports: [
    NzBackTopModule,
    ScrollingModule,
    NzTableModule,
    CommonModule,
    NzCardModule,
    DatePipe
  ],
  templateUrl: "./posts-overview.component.html",
  styleUrl: "./posts-overview.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsOverviewComponent implements OnInit {
  #indexedDbService = inject(IndexedDbService);
  mediaFiles = signal<FacebookIndexedDBMedia[]>([]);
  activityData = input.required<FbActivityAcrossFacebookModel>();
  postData = computed(() => {
    const allPosts: PostModel[] = [];
    if (this.activityData().posts) {
      allPosts.push(...this.activityData().posts ?? []);
    }
    if (this.activityData().groupPosts) {
      allPosts.push(...this.activityData().groupPosts?.group_posts_v2 ?? []);
    }
    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    return allPosts;
  });
  groupPosts: Signal<GroupPostsModel> = computed(() => this.activityData()?.groupPosts ?? {} as GroupPostsModel);
  albumPosts: Signal<AlbumModel[]> = computed(() => this.activityData()?.albums ?? []);
  photoPosts: Signal<PostPhotoModel> = computed(() => this.activityData()?.postPhotos ?? {} as PostPhotoModel);
  uncategorizedPhotos: Signal<UncategorizedPhotos> = computed(() => this.activityData()?.uncategorizedPhotos ?? {} as UncategorizedPhotos);
  sortPostsByDate = (a: SimplifiedPostModel, b: SimplifiedPostModel) => {
    return b.timestamp - a.timestamp;
  }
  simplifiedPostData = computed(() => {
    return this.postData().map(post => {
      const simplifiedPost: SimplifiedPostModel = {
        timestamp: post.timestamp * 1000,
        lastUpdatedTimeStamp: (post.data.findLast((datum) => datum.update_timestamp !== undefined)?.update_timestamp ?? 0) * 1000,
        postType: PostType.TEXT,
        attachment: {}
      };
      if (post.attachments) {
        simplifiedPost.attachment = post.attachments.map(attachment => {
          const simplifiedAttachment: SimplifiedAttachment = {};
          if (attachment.data) {
            if (attachment.data.length > 0) {
              if (attachment.data[0].media) {
                simplifiedPost.postType = PostType.PHOTO;
                simplifiedAttachment.media = {
                  uri: attachment?.data[0].media?.uri ?? '',
                  creationTimeStamp: attachment?.data[0].media.creation_timestamp ?? 0,
                  title: attachment?.data[0].media?.title ?? '',
                  exif_upload_ip: attachment?.data[0].media.media_metadata?.photo_metadata.exif_data[0]?.upload_ip ?? '',
                  exif_takenTimeStamp: attachment?.data[0].media.media_metadata?.photo_metadata.exif_data[0]?.taken_timestamp ?? 0,
                  description: attachment?.data[0].media?.description ?? '',
                };
              }
              if (attachment.data[0].place) {
                simplifiedPost.postType = PostType.PLACE;
                simplifiedAttachment.place = {
                  name: attachment.data[0].place.name,
                  coordinate: [attachment.data[0].place.coordinate?.latitude ?? '', attachment.data[0].place.coordinate?.longitude ?? ''],
                  address: attachment.data[0].place?.address ?? '',
                  url: attachment.data[0].place?.url ?? '',
                };
              }
              if (attachment.data[0].external_context) {
                simplifiedPost.postType = PostType.LINK;
                simplifiedAttachment.externalContext = {
                  url: attachment.data[0].external_context?.url ?? '',
                  name: attachment.data[0].external_context?.name ?? '',
                };
              }
            }
          }
          return simplifiedAttachment;
        })[0];
      }
      if (post.title) {
        simplifiedPost.title = post.title;
      }
      if (post.tags) {
        simplifiedPost.taggedPeople = post.tags.map(tag => tag.name);
      }
      if (post.data) {
        simplifiedPost.postContent = post.data[0]?.post ?? '';
        simplifiedPost.lastUpdatedTimeStamp = post.data.map(datum => datum.update_timestamp).findLast((timestamp) => timestamp !== undefined) ?? 0;
      }
      return simplifiedPost;
    });
  });

  async ngOnInit() {
    this.simplifiedPostData();
    let selectedService: { service: string, filename: string } = {} as { service: string, filename: string };
    await this.#indexedDbService.getSelectedService(AppType.Facebook).then((service) => selectedService = service).then(() => {
      console.log(`Selected service: ${selectedService.service} with filename: ${selectedService.filename}`);
      this.#indexedDbService.getAllFacebookMediaFiles(selectedService.filename)
        .then((mediaFiles) => {
          mediaFiles.forEach((mediaFile) => {
            mediaFile.blobURL = URL.createObjectURL(mediaFile.file);
          });
          this.mediaFiles.set(mediaFiles)
        });
    });
  }
  getMediaBlobURL(path: string) {
    console.log(`Path: ${path}`);
    const blobURLs = this.mediaFiles().forEach(mediaFile => console.log(`Media file: ${mediaFile.blobURL}`));
    console.log(`Blob URLs: ${blobURLs}`);
    const blobUrl: string = this.mediaFiles().find(mediaFile => mediaFile.thread_path.includes(path) || path.includes(mediaFile.thread_path))?.blobURL ?? '';
    console.log(`Blob URL: ${blobUrl}`);
    return blobUrl;
  }
}



interface SimplifiedPostModel {
  timestamp: number;
  postType: PostType;
  lastUpdatedTimeStamp: number;
  attachment: SimplifiedAttachment;
  postContent?: string;
  title?: string;
  taggedPeople?: string[];
}
enum PostType {
  PHOTO = "photo",
  PLACE = "place",
  VIDEO = "video",
  TEXT = "text",
  LINK = "link",
  SHARE = "share",
  STATUS = "status",
  ALBUM = "album",
  GROUP = "group",

}
interface SimplifiedAttachment {
  media?: SimplifiedMedia;
  place?: SimplifiedPlace;
  externalContext?: SimplifiedExternalContext;
}
interface SimplifiedExternalContext {
  url: string;
  name?: string;
}
interface SimplifiedMedia {
  uri: string;
  creationTimeStamp: number;
  title: string;
  exif_upload_ip: string;
  exif_takenTimeStamp: number;
  description: string;
}
interface SimplifiedPlace {
  name: string;
  coordinate?: [number, number];
  address?: string;
  url?: string;
}
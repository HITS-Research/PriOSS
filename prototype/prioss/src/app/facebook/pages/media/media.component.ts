import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { FbUserDataModel } from '../../state/models';
import { FacebookIndexedDBMedia } from '../../models/FacebookIndexDBMedia.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';



@Component({
  selector: 'prioss-facebook-media',
  standalone: true,
  imports: [CommonModule,
    TitleBarComponent,
    NzResultModule,
    NzGridModule,
    NzCardModule,
    NzStatisticModule,
    NzCheckboxModule,
    NzSelectModule,
    NzImageModule,
    FormsModule,
    NzListModule,
    NzSkeletonModule,
    NzTableModule,
    NzTabsModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookMediaComponent implements OnInit {
  window = window;
  videoListLayout = computed(() => {
    return this.window.innerWidth > 768 ? 'vertical' : 'horizontal';
  });
  previewMode = input<boolean>(false);
  fallback = 'data:image/png;base64,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';
  firstPhoto = computed(() => {
    return this.photos()[0]?.blobURL?? this.fallback;
  });
  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  mediaFiles: FacebookIndexedDBMedia[] = [];
  userDataLoaded = signal<boolean>(false);
  mediaFilesLoaded = signal<boolean>(false);
  loading = computed(() => !(this.userDataLoaded() && this.mediaFilesLoaded()));
  selectedChatInput = signal<string>('');
  selectedChat = computed(() => {
    return this.selectedChatInput()?.toLowerCase() ?? '';
  });
  showOnlyUploadsInput = signal<boolean>(false);
  showOnlyUploads = computed(() => {
    return this.showOnlyUploadsInput();
  });
  filteredImages = computed(() => {
    let filteredImgs: FacebookIndexedDBMedia[] = [];
    if (!this.mediaFilesLoaded()) {
      return filteredImgs;
    }
    if (this.showOnlyUploads()) {
      filteredImgs = this.photos().filter(file => file.thread_path.includes('posts/media'));
    } else {
      if (this.selectedChat() === '') {
        filteredImgs = this.photos();
      }
      filteredImgs = this.photos().filter(file => file.thread_path.toLowerCase().includes(this.selectedChat()));
    }
    return filteredImgs;

  });

  chats = computed(() => {
    const chats: Record<string, string> = {};
    if (this.userDataLoaded()) {
      const inBoxMessages = this.userData().activity_across_facebook?.inboxMessages ?? [];
      for (const chat of inBoxMessages) {
        if (this.photos().some(file => file.thread_path.includes(chat.thread_path))) {
          chats[chat.thread_path] = chat.title;
        }
      }

    }
    return Object.entries(chats);
  });

  photos = computed(() => {
    if (!this.mediaFilesLoaded()) {
      return [];
    } else {
      return this.mediaFiles.filter(file => (file.thread_path.endsWith('.jpg')
        || file.thread_path.endsWith('.jpeg')
        || file.thread_path.endsWith('.png')
        || file.thread_path.endsWith('.gif')
        || file.thread_path.endsWith('.webp')
        || file.thread_path.endsWith('.bmp')) && !file.thread_path.includes('stickers_used')
      );
    }
  }
  );
  videos = computed(() => {
    let mediaFiles: FacebookIndexedDBMedia[] = [];
    if (this.mediaFilesLoaded()) {

      mediaFiles = this.mediaFiles.filter(file => file.thread_path.endsWith('.mp4')
        || file.thread_path.endsWith('.mov')
        || file.thread_path.endsWith('.avi')
        || file.thread_path.endsWith('.mkv')
        || file.thread_path.endsWith('.webm')
      )
    }
    return mediaFiles;
  });

  selectedVideo = signal<FacebookIndexedDBMedia>({ blobURL: '', file_type: '', id: 0, thread_path: '', file: new Blob() } as FacebookIndexedDBMedia);

  pdfs = computed(() => {
    if (this.mediaFilesLoaded()) {

      return this.mediaFiles.filter(file => file.thread_path.endsWith('.pdf'));
    } else {
      return [];
    }
  });
  ms_office_docs = computed(() => {
    if (this.mediaFilesLoaded()) {
      return this.mediaFiles.filter(file => file.thread_path.endsWith('.doc')
        || file.thread_path.endsWith('.docx')
        || file.thread_path.endsWith('.xls')
        || file.thread_path.endsWith('.xlsx')
        || file.thread_path.endsWith('.ppt')
        || file.thread_path.endsWith('.pptx')
      );
    } else {
      return [];
    }
  });
  zipfiles = computed(() => {
    if (this.mediaFilesLoaded()) {
      return this.mediaFiles.filter(file => file.thread_path.endsWith('.zip')
        || file.thread_path.endsWith('.rar')
        || file.thread_path.endsWith('.7z')
      );
    } else {
      return [];
    }
  });
  stickers = computed(() => {
    if (this.mediaFilesLoaded()) {
      return this.mediaFiles.filter(file => file.thread_path.includes('stickers_used'));
    } else {
      return [];
    }
  });
  support_files = computed(() => {
    if (this.mediaFilesLoaded()) {
      return this.mediaFiles.filter(file => file.thread_path.includes('support_files'));
    } else {
      return [];
    }
  });

  otherFiles = computed(() => {
    if (this.mediaFilesLoaded()) {
      return this.mediaFiles.filter(file =>
        !file.thread_path.endsWith('.zip')
        && !file.thread_path.endsWith('.rar')
        && !file.thread_path.endsWith('.7z')
        && !file.thread_path.endsWith('.doc')
        && !file.thread_path.endsWith('.docx')
        && !file.thread_path.endsWith('.xls')
        && !file.thread_path.endsWith('.xlsx')
        && !file.thread_path.endsWith('.ppt')
        && !file.thread_path.endsWith('.pptx')
        && !file.thread_path.endsWith('.pdf')
        && !file.thread_path.endsWith('.mp4')
        && !file.thread_path.endsWith('.mov')
        && !file.thread_path.endsWith('.avi')
        && !file.thread_path.endsWith('.mkv')
        && !file.thread_path.endsWith('.webm')
        && !file.thread_path.endsWith('.jpg')
        && !file.thread_path.endsWith('.jpeg')
        && !file.thread_path.endsWith('.png')
        && !file.thread_path.endsWith('.gif')
        && !file.thread_path.endsWith('.webp')
        && !file.thread_path.endsWith('.bmp')
        && !file.thread_path.endsWith('no-data.txt')
      );
    } else {
      return [];
    }
  });

  constructor(private indexedDb: IndexedDbService) {
  }

  async ngOnInit() {
    await this.indexedDb.getSelectedFacebookDataStore()
      .then(data => 
        {
          if(data.facebookData){
            this.userData.set(data.facebookData);
          }else{
            this.userData.set({} as FbUserDataModel);
        }
      })
      .finally(() => this.userDataLoaded.set(true));
    const dataExportName = await this.indexedDb.getSelectedFacebookDataStore().then(data => {
      return data.filename;
    });
    this.mediaFiles = await this.indexedDb.getAllFacebookMediaFiles(dataExportName)
      .then((data) => data.map(file => ({ ...file, blobURL: URL.createObjectURL(file.file) })))
      .finally(() => this.mediaFilesLoaded.set(true));

    this.selectedVideo.set(this.videos()[0]);
  }


}

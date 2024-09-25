import { Component, Input, type OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import * as utilities from 'src/app/features/utils/generalUtilities.functions';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { FbUserDataModel } from '../../state/models';
import { FacebookIndexedDBMedia } from '../../models/FacebookIndexDBMedia.interface';
import { MessagesPerDayChartComponent } from './chatview/chat-statistics/features/messages-per-day-chart/messages-per-day-chart.component';
import { NgClass, NgIf } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ChatStatisticsComponent } from './chatview/chat-statistics/chat-statistics.component';
import { ChatviewComponent } from './chatview/chatview.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

/**
 * Component for displaying and managing Facebook messages.
 * This component serves as the main container for the messages feature,
 * including chat view, statistics, and data management.
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ChatStatisticsComponent,
    ChatviewComponent,
    MessagesPerDayChartComponent,
    NgClass,
    NgIf,
    NzGridModule,
    NzResultModule,
    NzTabsModule,
    TitleBarComponent,
  ]
})
export class MessagesComponent implements OnInit {
  /** Signal for storing user data */
  userData = signal<FbUserDataModel>({} as FbUserDataModel);

  /** Computed property for messages data */
  messagesData = computed(() => this.userData().activity_across_facebook?.inboxMessages ?? []);

  /** Computed property for the total number of chats */
  amountOfChats = computed(() => this.messagesData().length);

  /** Computed property for group chat data */
  groupChatData = computed(() => this.userData().activity_across_facebook?.groupMessages ?? []);

  /** Computed property for the total number of group chats */
  amountOfGroupChats = computed(() => this.groupChatData().length);

  /** Computed property for archived messages */
  archivedMessages = computed(() => this.userData().activity_across_facebook?.archivedThreads ?? []);

  /**
   * Computed property that combines all chat data (inbox, group, and archived)
   * and processes it into a unified format.
   */
  allChatData = computed(() => {
    let currID = 0;
    let tmpAllChatData = [];
    const msgData = this.messagesData().map((message) => {
      currID++;
      return {
        id: currID.toString(),
        participants: message.participants.map(
          (participant) => participant.name,
        ),
        messages: message.messages.map((message) => {
          return {
            timestamp: message.timestamp_ms,
            sender: message.sender_name === '' ? 'Deleted User' : message.sender_name,
            content: message.content,
          };
        }),
        name: message.title === '' ? 'Deleted User' : message.title,
        is_groupchat: false,
        is_archived: false
      };
    });
    const groupData = this.groupChatData().map((group) => {
      currID++;
      return {
        id: currID.toString(),
        participants: group.participants.map((participant) => participant.name),
        messages: group.messages.map((message) => {
          return {
            timestamp: message.timestamp_ms,
            sender: message.sender_name === '' ? 'Deleted User' : message.sender_name,
            content: message.content,
            share: { link: message.share?.link ?? '' },
            photos: message.photos ?? [],
            files: message.files ?? [],
            sticker: {
              uri: message.sticker?.uri ?? '',
              ai_stickers: message.sticker?.ai_stickers ?? []
            },
          };

        }),
        name: group.title === '' ? 'Deleted Group' : group.title,
        is_groupchat: true,
        is_archived: false
      };
    });
    const archivedChats = this.archivedMessages().map((message) => {
      currID++;
      return {
        id: currID.toString(),
        participants: message.participants.map(
          (participant) => participant.name,
        ),
        messages: message.messages.map((message) => {
          return {
            timestamp: message.timestamp_ms,
            sender: message.sender_name === '' ? 'Deleted User' : message.sender_name,
            content: message.content,
          };
        }),
        name: message.title === '' ? 'Archived Thread' : message.title,
        is_groupchat: true,
        is_archived: true
      };
    });
    tmpAllChatData = [...msgData, ...groupData, ...archivedChats];
    return tmpAllChatData;
  });

  /** Computed property for the user's full name */
  username = computed(() => this.userData().personal_information?.profile_information.profile_v2.name.full_name ?? "");

  /** Utility function for converting timestamps */
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;

  /** Input property to indicate if the component is in preview mode */
  @Input()
  previewMode = false;

  /** Computed property for the total number of group chats */
  totalGroupChats = computed(() => this.groupChatData().length);

  /** Computed property to check if group chat data is available */
  dataAvailableGroup = computed(() => this.groupChatData().length !== 0);

  /** Signal for the search text input */
  searchTextInput = signal<string>("");

  /** Computed property for the current search text */
  searchText = computed(() => {
    return this.searchTextInput();
  });

  /** Signal to indicate if data is still loading */
  loading = signal<boolean>(true);

  /** Computed property for filtered group chats based on search text */
  filteredGroupChats = computed(() => {
    const freshData = this.groupChatData().slice();
    return freshData.filter(
      (item) =>
        item.title.toLowerCase().includes(this.searchText().toLowerCase()) ||
        item.participants.some((participant) => participant.name.toLowerCase().includes(this.searchText().toLowerCase()))
    );
  });

  /** Computed property for filtered chats based on search text */
  filteredChats = computed(() => {
    this.messagesData().filter(chat =>
      chat.participants.some(participant =>
        participant.name.toLowerCase().includes(this.searchText().toLowerCase()))
    );
  });

  /** Signal for storing media files */
  mediaFiles = signal<FacebookIndexedDBMedia[]>([]);

  constructor(
    private indexedDb: IndexedDbService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getData();
  }

  /**
   * Fetches the required data for messages from IndexedDB.
   * This includes Facebook data and media files.
   */
  async getData() {
    await this.indexedDb.getSelectedFacebookDataStore()
      .then((data) => {
        this.indexedDb.getAllFacebookMediaFiles(data.filename).then((data) => {
          if (data) {
            data.forEach((mediaFile) => {
              mediaFile.blobURL = URL.createObjectURL(mediaFile.file);
            });
            this.mediaFiles.set(data);
          }
        })
      });
    await this.indexedDb.getSelectedFacebookDataStore()
      .then((data) => {
        if (!data.facebookData) {
          this.userData.set({} as FbUserDataModel);
        } else {
          this.userData.set(data.facebookData);
        }
      }).finally(() => {
        this.loading.set(false)
      });
  }
}

/**
 * Interface for message data used in charts or other visualizations
 */
export interface MessagesData {
  timestamp: number;
  name: string;
  color: string;
}
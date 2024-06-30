import { Component, Input, type OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import * as utilities from 'src/app/features/utils/generalUtilities.functions';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { FbUserDataModel } from '../../state/models';
import { FacebookIndexedDBMedia } from '../../models/FacebookIndexDBMedia.interface';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  messagesData = computed(() => this.userData().activity_across_facebook?.inboxMessages ?? []);
  amountOfChats = computed(() => this.messagesData().length);
  groupChatData = computed(() => this.userData().activity_across_facebook?.groupMessages ?? []);
  amountOfGroupChats = computed(() => this.groupChatData().length);
  archivedMessages = computed(() => this.userData().activity_across_facebook?.archivedThreads ?? []);
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
  username = computed(() => this.userData().personal_information?.profile_information.profile_v2.name.full_name ?? "");
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  @Input()
  previewMode = false;
  totalGroupChats = computed(() => this.groupChatData().length)
  dataAvailableGroup = computed(() => this.groupChatData().length !== 0);
  searchTextInput = signal<string>("");
  searchText = computed(() => {
    return this.searchTextInput();
  });
  loading = signal<boolean>(true);
  filteredGroupChats = computed(() => {
    const freshData = this.groupChatData().slice();
    return freshData.filter(
      (item) =>
        item.title.toLowerCase().includes(this.searchText().toLowerCase()) ||
        item.participants.some((participant) => participant.name.toLowerCase().includes(this.searchText().toLowerCase()))
    );
  });
  filteredChats = computed(() => {
    this.messagesData().filter(chat =>
      chat.participants.some(participant =>
        participant.name.toLowerCase().includes(this.searchText().toLowerCase()))
    );
  });
  mediaFiles = signal<FacebookIndexedDBMedia[]>([]);


  constructor(
    private indexedDb: IndexedDbService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getData();
  }

  /**
   * This method is responsible to get the required data for messages.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
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

export interface MessagesData {
  timestamp: number;
  name: string;
  color: string;
}

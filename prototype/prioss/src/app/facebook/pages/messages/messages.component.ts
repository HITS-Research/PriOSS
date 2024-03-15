import { Component, Input, OnInit } from '@angular/core';
import * as utilities from 'src/app/features/utils/generalUtilities.functions';
import { Store } from '@ngxs/store';
import { FacebookState } from '../../state/fb.state';
import { GroupMessageModel, InboxMessageModel } from '../../models';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
})
export class MessagesComponent implements OnInit {
  messagesData: InboxMessageModel[] = []
  groupChatData: GroupMessageModel[] = [];
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  @Input()
  previewMode = false;
  totalGroupChats = 0;
  data: { label: string; value: any }[];
  dataAvailableGroup = false;
  searchText: string = '';
  filteredGroupChats: GroupMessageModel[] = [];
  filteredChats: InboxMessageModel[] = [];
  totalContactNumbers = 0;
  contactNumbers: any = [];
  cellSize: number;
  pageSize = 10;
  groupCurrentPage = 1;
  groupTotalPages = 1;

  constructor(
    private store: Store,
  ) {}

  async ngOnInit(): Promise<void> {
    this.getData();
  }

  /**
   * This method is responsible to get the required data for messages.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
   */
  async getData() {
    const userData = this.store.selectSnapshot(FacebookState.getFacebookUserData);
    // Get all messages info
    this.messagesData = userData.activity_across_facebook.inboxMessages || [];
    console.debug('--- Messages Data: ', this.messagesData);
    this.filterChatsItems();

    // Get all face group chats info
    this.groupChatData = userData.activity_across_facebook.groupMessages || [];
    
    this.dataAvailableGroup = this.groupChatData.length !== 0;
    this.totalGroupChats = this.groupChatData.length;
    this.groupTotalPages = Math.ceil(
      this.groupChatData.length / this.pageSize,
    );
    this.filterGroupChatsItems();

  }

  /**
   * This method is responsible for filtering group messages based on the search text.
   * @param searchText The text to filter group messages by.
   * @author: Ugur (ugurye@mail.uni-paderborn.de)
   */

  filterGroupChatsItems(): void {
    const freshData = this.groupChatData.slice();
    this.filteredGroupChats = freshData.filter(
      (item) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.participants.some((participant) => participant.name.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  /**
   * This method is responsible for filtering messages based on the search text.
   */
  filterChatsItems(): void {
    this.filteredChats = this.messagesData.filter(chat => 
      chat.participants.some(participant => 
        participant.name.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  /**
   * This method returns the visible group messages based on the current page and page size.
   * @returns An array of visible group messages.
   * @author: Ugur (ugurye@mail.uni-paderborn.de)
   */

  getVisibleData(): GroupMessageModel[] {
    const startIndex = (this.groupCurrentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredGroupChats.slice(startIndex, endIndex);
  }

  /**
   * This method is responsible for navigating to a specific page within the group messages.
   * @param page The page number to navigate to.
   *  @author: Ugur (ugurye@mail.uni-paderborn.de)
   */

  goToGroupPage(page: number): void {
    if (page >= 1 && page <= this.groupTotalPages) {
      this.groupCurrentPage = page;
    }
  }

  /**
   * This method clears the filter for messages.
   * @author: Ugur (ugurye@mail.uni-paderborn.de)
   */

  clearFilterChats() {
    this.searchText = '';
    this.filterChatsItems();
  }

  /**
   * This method clears the filter for group messages.
   *  @author: Ugur (ugurye@mail.uni-paderborn.de)
   */

  clearFilterGroupMessages() {
    this.searchText = '';
    this.filterGroupChatsItems();
  }

  /**
   * This method is responsible load the barchart on click of the tab.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
   */
  onTabSelected(event: any) {
    if (event.index === 2) {
      this.createBarChart('chart');
    }
  }

  /**
   * This method is responsible to create a bar chart for the data.
   *  @author: Rishma (rishmamn@mail.uni-paderborn.de)
   */
  createBarChart(chartId: string) {
   //TODO: add chart with new chart component for group chats
   chartId.length;
  }
}

export interface MessagesData {
  timestamp: number;
  name: string;
  color: string;
}

import { Component, Input, OnInit} from '@angular/core';
import { MessagesModel } from 'src/app/models/Facebook/friendsMessages';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { FaceBookMessagesInfoRepository } from 'src/app/db/data-repositories/facebook/fb-messages-data/fb-messages-friends.repo';
import { GroupMessagesModel } from 'src/app/models/Facebook/groupsMessages';
import * as d3 from 'd3';
import { FaceBookGroupMessagesInfoRepository } from 'src/app/db/data-repositories/facebook/fb-messages-data/fb-messages-groups.repo';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {
  messagesData: MessagesModel[] = [];
  groupMessagesData: GroupMessagesModel[] = [];
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  @Input()
  previewMode: boolean = false;
  totalPeopleMessages = 0;
  totalGroupMessages = 0;
  constructor(
    private faceMessagesRepo: FaceBookMessagesInfoRepository,private facegroupMessagesRepo: FaceBookGroupMessagesInfoRepository
  ) { }

  ngOnInit(): void {
    this.getData();
   
  }
   /**
      * This method is responsible to  get the required data for messages.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
   */
async  getData() {
  // Get all face messages info
  this.faceMessagesRepo.getAllFaceMessagesInfo().then((messages) => {
    this.messagesData = messages;
    
    // Calculate total people messages
    this.totalPeopleMessages = this.messagesData.length;
  
  });
  
  // Get all face group messages info
  this.facegroupMessagesRepo.getAllFaceGroupMessagesInfo().then((group_messages_data) => {
    this.groupMessagesData = group_messages_data;
    
    // Calculate total group messages
    this.totalGroupMessages = this.groupMessagesData.length;
  });
}


}




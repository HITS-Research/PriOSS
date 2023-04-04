import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-friend-and-followers',
  templateUrl: './friend-and-followers.component.html',
  styleUrls: ['./friend-and-followers.component.less']
})
export class FriendAndFollowersComponent {
  friends: any[] = [];
  removedFriends: any[] = [];
  friendRequestRecieved: any[] = [];
  friendRequestSent: any[] = [];
  rejectedFriendRequests: any[] = [];
  whoYouFollow: any[] = [];

  constructor(private dbService: NgxIndexedDBService){}

  ngOnInit() {
    this.getData();
  }

   /**
  * This methods gets all friends and followers related data from PriossDb
  * 
  *
  * @author: rbharmal@mail.upb.de
  *
  */
  private getData()
  {
    this.dbService.getAll('face/friends').subscribe((friends) => {
      this.friends= friends;
    });
    this.dbService.getAll('face/removed_friends').subscribe((friends) => {
      this.removedFriends = friends; 
    });
    this.dbService.getAll('face/friend_requests_received').subscribe((friends) => {
      this.friendRequestRecieved= friends;     
    });
    this.dbService.getAll('face/friend_requests_sent').subscribe((friends) => {
      this.friendRequestSent= friends;
    });
    this.dbService.getAll('face/rejected_friend_requests').subscribe((friends) => {
      this.rejectedFriendRequests= friends;
    });
    this.dbService.getAll('face/who_you_follow').subscribe((friends) => {
      this.whoYouFollow= friends;
    });
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import type { FbConnectionsDataModel } from 'src/app/facebook/state/models';

@Component({
  selector: 'prioss-facebook-friends-general-info',
  standalone: true,
  imports: [NzStatisticModule, NzGridModule, CommonModule, NzSkeletonModule, FormsModule, NzIconModule],
  templateUrl: './facebook-friends-general-info.component.html',
  styleUrl: './facebook-friends-general-info.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookFriendsGeneralInfoComponent {

  connectionsData = input.required<FbConnectionsDataModel>();
  loading = input.required<boolean>();
  //preview statistics
  friendsCount = computed(() => {
    return this.connectionsData().yourFriends?.friends_v2.length??0;
  });
  sentFriendRequestsCount = computed(() => {
    return this.connectionsData().sentFriendRequests?.sent_requests_v2.length??0;
  });
  receivedFriendsCount = computed(() => {
    return this.connectionsData().receivedFriendRequests?.received_requests_v2.length??0;
  });
  rejectedFriendsCount = computed(() => {
    return this.connectionsData().rejectedFriendRequests?.rejected_requests_v2.length??0;
  });
  removedFriendsCount = computed(() => {
    return this.connectionsData().removedFriends?.deleted_friends_v2.length??0;
  });
  followingCount = computed(() => {
    return this.connectionsData().followed?.following_v3.length??0;
  });
  peopleyouMayKnowCount = computed(() => {
    return this.connectionsData().peopleYouMayKnow?.label_values[0].vec.length??0;
  });

}

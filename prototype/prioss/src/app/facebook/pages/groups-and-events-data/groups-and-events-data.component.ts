
import { Component, Input, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngxs/store';
import { FacebookState } from '../../state/fb.state';
import { EventsInvitedItem } from '../../models/activityAcrossFacebook/Events/EventInvitations';
import { GroupsJoinedItem } from '../../models/activityAcrossFacebook/Groups/GroupMembershipActivity';

@Component({
  selector: 'app-groups-and-events-data',
  templateUrl: './groups-and-events-data.component.html',
  styleUrls: ['./groups-and-events-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsAndEventsDataComponent implements OnInit {
  groupsData: GroupsJoinedItem[] = [];
  total_groups = 0;

  eventsData: EventsInvitedItem[] = [];
  total_event_invites = 0;
  total_events_interested = 0;
  dataAvailable = false;
  dataAvailableGroup = false;

  @Input()
  previewMode = false;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.prepareData();
  }

  /**
   *
   * This method is responsible to get all data for
   * tables face_groups and face_events.
   *
   * @author: Deepa (dbelvi@mail.upb.de)
   *
   */

  async prepareData() {
    const userData = this.store.selectSnapshot(FacebookState.getFacebookUserData);

    const allEventsInfo = userData.activity_across_facebook.eventsInvited?.events_invited_v2;
    this.eventsData = allEventsInfo ?? [];
    this.total_event_invites = this.eventsData.length;
    this.dataAvailable = this.eventsData.length !== 0;

    const allGroupsInfo = userData.activity_across_facebook.groupsJoined?.groups_joined_v2;
    this.groupsData = allGroupsInfo ?? [];
    this.total_groups = this.groupsData.length;
    this.dataAvailableGroup = this.groupsData.length !== 0;
  }

  /**
   * Converts unix date to string format, with optional fallback.
   * Created to handle cases where unix date is 0 or invalid like 14049123456789.
   * @param unix_date unix date from model
   * @param fallback fallback string in case of invalid date
   * @returns date in string format
   */
  formatDate(unix_date: number, fallback = 'Invalid Date') {
    const date = new Date(unix_date * 1000);

    if (!date.getTime()) {
      return fallback;
    }
    
    return date.toDateString();
  }


}

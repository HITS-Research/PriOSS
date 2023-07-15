import { Component, Input, OnInit} from '@angular/core';
import { FacebookEventsRepository } from '../../../db/data-repositories/facebook/fb-groups-events-info/face_events.repo';
import { FacebookGroupsRepository } from '../../../db/data-repositories/facebook/fb-groups-events-info/face_groups.repo';
import { GroupsModel } from '../../../models/Facebook/groups';
import { EventsModel } from '../../../models/Facebook/events';

@Component({
  selector: 'app-groups-and-events-data',
  templateUrl: './groups-and-events-data.component.html',
  styleUrls: ['./groups-and-events-data.component.less'] 
})
export class GroupsAndEventsDataComponent {
  groupsData: GroupsModel[] = [];
  total_groups: number = 0;


  eventsData: EventsModel [] = [];
  total_event_invites: number = 0;
  total_events_interested: number = 0;

  @Input()
  previewMode: boolean = false;

  constructor(
    private faceEventsRepo: FacebookEventsRepository,
    private faceGroupsRepo: FacebookGroupsRepository
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

    await this.faceEventsRepo.getAllEvents().then((allEventsInfo) => {
      this.eventsData = allEventsInfo;
      this.total_event_invites = this.eventsData.length; 
      for (let i = 0; i < this.eventsData.length; i++) {
        const unixTimeStart: number  = +this.eventsData[i].start_timestamp;
        const unixTimeEnd: number  = +this.eventsData[i].end_timestamp;

        this.eventsData[i].start_timestamp = new Date(unixTimeStart * 1000).toDateString();
        if (unixTimeEnd == 0) {
          this.eventsData[i].end_timestamp = "No End Time";
        } else {
          this.eventsData[i].end_timestamp = new Date(unixTimeEnd * 1000).toDateString();
        }
      }
    });


  }

}

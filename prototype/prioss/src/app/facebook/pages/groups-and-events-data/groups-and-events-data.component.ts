
import { Component, Input, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { FbUserDataModel } from '../../state/models';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-groups-and-events-data',
  templateUrl: './groups-and-events-data.component.html',
  styleUrls: ['./groups-and-events-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass,
    NgFor,
    NgIf,
    NzGridModule,
    NzResultModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    TitleBarComponent,
  ]
})
export class GroupsAndEventsDataComponent implements OnInit {
  groupsJoinedData = computed(() => this.userData().activity_across_facebook?.groupsJoined?.groups_joined_v2 ?? []);
  total_groups_joined = computed(() => this.groupsJoinedData().length);
  groupsAdministratedData = computed(() => this.userData().activity_across_facebook?.groupsAdmined?.groups_admined_v2 ?? []);
  total_groups_administrated = computed(() => this.groupsAdministratedData().length);
  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  loading = signal<boolean>(true);
  eventsInvitedData = computed(() => this.userData().activity_across_facebook?.eventsInvited?.events_invited_v2 ?? []);
  total_event_invites = computed(() => this.eventsInvitedData().length);
  eventsJoinedData = computed(() => this.userData().activity_across_facebook?.eventResponses?.event_responses_v2.events_joined?? []);
  total_events_joined = computed(() => this.eventsJoinedData().length);
  eventsHiddenData = computed(() => this.userData().activity_across_facebook?.eventsHidden?.events_hidden_v2 ?? []);
  total_events_hidden = computed(() => this.eventsHiddenData().length);
  dataAvailable = computed(() => this.eventsInvitedData().length !== 0);
  dataAvailableGroup = computed(() => this.groupsJoinedData().length !== 0);

  @Input()
  previewMode = false;

  constructor(
    private indexedDbService: IndexedDbService,
  ) { }

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
    await this.indexedDbService.getSelectedFacebookDataStore().then((data) => {
      if(data.facebookData){
        this.userData.set(data.facebookData);
      }else{
        this.userData.set({} as FbUserDataModel);
      }
    }).finally(() => {
      this.loading.set(false);
    }
    );
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

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

/**
 * Component for displaying groups and events data.
 */
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
  /** Computed property for groups joined data */
  groupsJoinedData = computed(() => this.userData().activity_across_facebook?.groupsJoined?.groups_joined_v2 ?? []);
  
  /** Computed property for total number of groups joined */
  total_groups_joined = computed(() => this.groupsJoinedData().length);
  
  /** Computed property for groups administrated data */
  groupsAdministratedData = computed(() => this.userData().activity_across_facebook?.groupsAdmined?.groups_admined_v2 ?? []);
  
  /** Computed property for total number of groups administrated */
  total_groups_administrated = computed(() => this.groupsAdministratedData().length);
  
  /** Signal for user data */
  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  
  /** Signal for loading state */
  loading = signal<boolean>(true);
  
  /** Computed property for events invited data */
  eventsInvitedData = computed(() => this.userData().activity_across_facebook?.eventsInvited?.events_invited_v2 ?? []);
  
  /** Computed property for total number of event invites */
  total_event_invites = computed(() => this.eventsInvitedData().length);
  
  /** Computed property for events joined data */
  eventsJoinedData = computed(() => this.userData().activity_across_facebook?.eventResponses?.event_responses_v2.events_joined ?? []);
  
  /** Computed property for total number of events joined */
  total_events_joined = computed(() => this.eventsJoinedData().length);
  
  /** Computed property for events hidden data */
  eventsHiddenData = computed(() => this.userData().activity_across_facebook?.eventsHidden?.events_hidden_v2 ?? []);
  
  /** Computed property for total number of events hidden */
  total_events_hidden = computed(() => this.eventsHiddenData().length);
  
  /** Computed property to check if event data is available */
  dataAvailable = computed(() => this.eventsInvitedData().length !== 0);
  
  /** Computed property to check if group data is available */
  dataAvailableGroup = computed(() => this.groupsJoinedData().length !== 0);
  
  /** Input property for preview mode */
  @Input() previewMode = false;

  /**
   * Constructor for GroupsAndEventsDataComponent
   * @param indexedDbService - Service for interacting with IndexedDB
   */
  constructor(
    private indexedDbService: IndexedDbService,
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized
   */
  ngOnInit(): void {
    this.prepareData();
  }

  /**
   * Loads the userdata from indexeddb
   */
  async prepareData() {
    await this.indexedDbService.getSelectedFacebookDataStore().then((data) => {
      if (data.facebookData) {
        this.userData.set(data.facebookData);
      } else {
        this.userData.set({} as FbUserDataModel);
      }
    }).finally(() => {
      this.loading.set(false);
    });
  }

  /**
   * Converts unix date to string format, with optional fallback
   * @param unix_date - Unix date from model
   * @param fallback - Fallback string in case of invalid date
   * @returns Date in string format
   */
  formatDate(unix_date: number, fallback = 'Invalid Date') {
    const date = new Date(unix_date * 1000);
    if (!date.getTime()) {
      return fallback;
    }
    return date.toDateString();
  }
}
import { Component, Input, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FbSecurityLoginInformationDataModel } from '../../state/models';
import {
  ActiveSessionsModel, LoginsAndLogoutsModel, AccountStatusChangesModel,
  AccountActivityModel
} from '../../models';
import { GeolocationService } from 'src/app/features/world-map/geolocation.service';
import type { EChartsOption } from 'echarts';
import { GeoLocationData } from 'src/app/features/world-map/geolocation.type';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { WorldMapComponent } from 'src/app/features/world-map/world-map.component';

/**
 * @description
 * SecurityLoginDataComponent is responsible for displaying and managing security and login data.
 * It handles various aspects of user account activity, including login locations, login/logout events,
 * account status changes, and general account activities.
 */
@Component({
  selector: 'app-security-login-data',
  templateUrl: './security-login-data.component.html',
  styleUrls: ['./security-login-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    NgClass,
    NgFor,
    NgIf,
    NzGridModule,
    NzIconModule,
    NzResultModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    NzTimelineModule,
    TitleBarComponent,
    WorldMapComponent,
  ]
})
export class SecurityLoginDataComponent implements OnInit {
  /** Flag to indicate if the component is in preview mode */
  @Input()
  previewMode = false;

  /** Computed property for login locations data */
  loginLocationsData = computed(() => this.fbLoginLocationsData().active_sessions_v2 ?? []);
  /** Computed property for locations */
  locations = computed(() => this.loginLocationsData().map((location) => location.location));

  /** Computed property for login/logout data */
  loginlogoutData = computed(() => this.fbLoginLogoutsData().account_accesses_v2 ?? []);
  /** Computed property for login count */
  login_count = computed(() => this.loginlogoutData().filter((item) => (item.action === 'Login') || (item.action === 'Anmelden')).length);
  /** Computed property for logout count */
  logout_count = computed(() => this.loginlogoutData().filter((item) => (item.action === 'Log out') || (item.action === 'Abmelden')).length);
  /** Computed property for total login and logout count */
  login_logouts = computed(() => this.login_count() + this.logout_count());

  /** Computed property for account status change data */
  accStatusChangeData = computed(() => this.fbAccStatusChangesData().account_status_changes_v2 ?? []);
  /** Computed property for account deactivation count */
  account_deactivated = computed(() => this.accStatusChangeData().filter((item) => item.status === 'Account deactivated').length);
  /** Computed property for account reactivation count */
  account_reactivated = computed(() => this.accStatusChangeData().filter((item) => item.status !== 'Account deactivated').length);
  /** Computed property for account statuses */
  status = computed(() => this.accStatusChangeData().map((status) => status.status));
  /** Computed property for status change timestamps */
  timestamp = computed(() => this.accStatusChangeData().map((status) => status.timestamp));
  /** Flag to indicate if account status data is empty */
  accstatus_empty = false;

  /** Computed property for account activities data */
  accActivitiesData = computed(() => this.fbAccActivitiesData().account_activity_v2 ?? []);
  /** Computed property for password change count */
  PasswordChange = computed(() => this.recordDeatils().filter((item) => item.event === 'Password Change').length);
  /** Computed property for login count from account activities */
  Login = computed(() => this.accActivitiesData().filter((item) => (item.action === 'Login') || (item.action === 'Anmelden')).length);
  /** Computed property for session update count */
  SessionUpdated = computed(() => this.accActivitiesData().filter((item) => item.action === 'Session updated').length);
  /** Computed property for web session termination count */
  WebSessionTerminated = computed(() => this.accActivitiesData().filter((item) => item.action === 'Web Session Terminated').length);
  /** Computed property for mobile session termination count */
  MobileSessionTerminated = computed(() => this.accActivitiesData().filter((item) => item.action === 'Mobile Session Terminated').length);
  /** Computed property for total terminated sessions count */
  terminatedSessions = computed(() => this.WebSessionTerminated() + this.MobileSessionTerminated());
  /** Flag to indicate if account activity data is empty */
  accactivity_empty = false;
  /** Computed property to check if login location data is available */
  dataAvailableLoc = computed(() => this.loginLocationsData().length !== 0);
  /** Computed property to check if login/logout data is available */
  dataAvailableLogOuts = computed(() => this.loginlogoutData().length !== 0);
  /** Computed property to check if status change data is available */
  dataAvailableStatusChange = computed(() => this.accStatusChangeData().length !== 0);
  /** Computed property to check if account activities data is available */
  dataAvailableActivities = computed(() => this.accActivitiesData().length !== 0);

  /** Signal for storing security login data */
  securityLoginDataStore = signal<FbSecurityLoginInformationDataModel>({} as FbSecurityLoginInformationDataModel);
  /** Computed property for record details */
  recordDeatils = computed(() => this.securityLoginDataStore().record_details?.admin_records_v2 ?? []);
  /** Computed property for Facebook login locations data */
  fbLoginLocationsData = computed(() => this.securityLoginDataStore().login_location ?? {} as ActiveSessionsModel);
  /** Computed property for Facebook login/logout data */
  fbLoginLogoutsData = computed(() => this.securityLoginDataStore().logins_and_logouts ?? {} as LoginsAndLogoutsModel);
  /** Computed property for Facebook account status changes data */
  fbAccStatusChangesData = computed(() => this.securityLoginDataStore().account_status_changes ?? {} as AccountStatusChangesModel);
  /** Computed property for Facebook account activities data */
  fbAccActivitiesData = computed(() => this.securityLoginDataStore().account_activity ?? {} as AccountActivityModel);
  /** Signal for loading state */
  loading = signal<boolean>(true);

  /** Computed property for login map options */
  loginMapOptions = computed(() => {
    let options = {} as EChartsOption;
    if (this.previewMode === true) {
      return options;
    }

    let geoLocationData: GeoLocationData[] = [];
    const mapLocationData: Set<object> = new Set();

    for (const loc of this.locations()) {
      let city = loc.split(',')[0];
      city = city.trim();
      let country = loc.split(',')[1];
      country = country.trim();
      geoLocationData.push({ city: city, country: country });
    }

    geoLocationData = this.geolocationService.getGeoData(geoLocationData);

    for (const loc of geoLocationData) {
      if (loc.lat && loc.lon) {
        mapLocationData.add({ name: loc.city, value: [loc.lon, loc.lat] });
      }
    }

    options = {
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: Array.from(mapLocationData),
          color: '#007FFF',
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            scale: 3
          },
          tooltip: {
            trigger: 'item',
            show: true,
            formatter: (params: any) => {
              return params.name;
            }
          },
        },
      ]
    };
    return options;

  });

  /** Computed property for account activity map options */
  accActivityMapOptions = computed(() => {
    let options = {} as EChartsOption;
    if (this.previewMode === true) {
      return options;
    }

    let geoLocationData: GeoLocationData[] = [];
    const mapLocationData: Set<object> = new Set();

    for (const loc of this.accActivitiesData()) {
      let city = loc.city;
      city = city.trim();
      let country = loc.country;
      country = country.trim();
      geoLocationData.push({ city: city, country_code: country });
    }

    geoLocationData = this.geolocationService.getGeoData(geoLocationData);

    for (const loc of geoLocationData) {
      if (loc.lat && loc.lon) {
        mapLocationData.add({ name: loc.city, value: [loc.lon, loc.lat] });
      }
    }

    options = {
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: Array.from(mapLocationData),
          color: '#007FFF',
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            scale: 3
          },
          tooltip: {
            trigger: 'item',
            show: true,
            formatter: (params: any) => {
              return params.name;
            }
          },
        },
      ]
    }
    return options;
  });

  /**
   * @constructor
   * @param {IndexedDbService} indexedDb - The IndexedDB service for data storage
   * @param {GeolocationService} geolocationService - The geolocation service for mapping
   */
  constructor(
    private indexedDb: IndexedDbService,
    private geolocationService: GeolocationService
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  ngOnInit() {
    this.prepareData();
  }

  /**
   * Fetches all login locations related data from PriossDB
   * @method prepareData
   * @author Deepa(dbelvi@mail.upb.de)
   */
  async prepareData() {
    await this.indexedDb.getSelectedFacebookDataStore()
      .then((data) => {
        if (data.facebookData) {
          this.securityLoginDataStore.set(data.facebookData.security_and_login_information);
        } else {
          this.securityLoginDataStore.set({} as FbSecurityLoginInformationDataModel);
        }
      }).finally(() => {
        this.loading.set(false)
      });
  }

}
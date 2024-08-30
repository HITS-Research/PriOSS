import { Component, Input, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { Store } from '@ngxs/store';
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
  @Input()
  previewMode = false;

  loginLocationsData = computed(() => this.fbLoginLocationsData().active_sessions_v2 ?? []);
  locations = computed(() => this.loginLocationsData().map((location) => location.location));

  loginlogoutData = computed(() => this.fbLoginLogoutsData().account_accesses_v2 ?? []);
  login_count = computed(() => this.loginlogoutData().filter((item) => (item.action === 'Login') || (item.action === 'Anmelden')).length);
  logout_count = computed(() => this.loginlogoutData().filter((item) => (item.action === 'Log out') || (item.action === 'Abmelden')).length);
  login_logouts = computed(() => this.login_count() + this.logout_count());

  accStatusChangeData = computed(() => this.fbAccStatusChangesData().account_status_changes_v2 ?? []);
  account_deactivated = computed(() => this.accStatusChangeData().filter((item) => item.status === 'Account deactivated').length);
  account_reactivated = computed(() => this.accStatusChangeData().filter((item) => item.status !== 'Account deactivated').length);
  status = computed(() => this.accStatusChangeData().map((status) => status.status));
  timestamp = computed(() => this.accStatusChangeData().map((status) => status.timestamp));
  accstatus_empty = false;

  accActivitiesData = computed(() => this.fbAccActivitiesData().account_activity_v2 ?? []);
  PasswordChange = computed(() => this.recordDeatils().filter((item) => item.event === 'Password Change').length);
  Login = computed(() => this.accActivitiesData().filter((item) => (item.action === 'Login') || (item.action === 'Anmelden')).length);
  SessionUpdated = computed(() => this.accActivitiesData().filter((item) => item.action === 'Session updated').length);
  WebSessionTerminated = computed(() => this.accActivitiesData().filter((item) => item.action === 'Web Session Terminated').length);
  MobileSessionTerminated = computed(() => this.accActivitiesData().filter((item) => item.action === 'Mobile Session Terminated').length);
  terminatedSessions = computed(() => this.WebSessionTerminated() + this.MobileSessionTerminated());
  accactivity_empty = false;
  dataAvailableLoc = computed(() => this.loginLocationsData().length !== 0);
  dataAvailableLogOuts = computed(() => this.loginlogoutData().length !== 0);
  dataAvailableStatusChange = computed(() => this.accStatusChangeData().length !== 0);
  dataAvailableActivities = computed(() => this.accActivitiesData().length !== 0);

  securityLoginDataStore = signal<FbSecurityLoginInformationDataModel>({} as FbSecurityLoginInformationDataModel);
  recordDeatils = computed(() => this.securityLoginDataStore().record_details?.admin_records_v2 ?? []);
  fbLoginLocationsData = computed(() => this.securityLoginDataStore().login_location ?? {} as ActiveSessionsModel);
  fbLoginLogoutsData = computed(() => this.securityLoginDataStore().logins_and_logouts ?? {} as LoginsAndLogoutsModel);
  fbAccStatusChangesData = computed(() => this.securityLoginDataStore().account_status_changes ?? {} as AccountStatusChangesModel);
  fbAccActivitiesData = computed(() => this.securityLoginDataStore().account_activity ?? {} as AccountActivityModel);
  loading = signal<boolean>(true);
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

  constructor(
    private store: Store,
    private indexedDb: IndexedDbService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.prepareData();
  }

  /**
   * This methods fetches all login locations related data from PriossDB
   *
   * @author: Deepa(dbelvi@mail.upb.de)
   *
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

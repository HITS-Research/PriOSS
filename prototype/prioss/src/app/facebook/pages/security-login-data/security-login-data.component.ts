import { Component, Input, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngxs/store';
import { FacebookState } from '../../state/fb.state';
import { FbSecurityLoginInformationDataModel } from '../../state/models';
import { ActiveSessionsModel, LoginsAndLogoutsModel, AccountStatusChangesModel,
        AccountActivityModel, ActiveSessionItem, AccountAccessesItem, AccountStatusChangeItem,
        AccountActivityItem  } from '../../models';

@Component({
  selector: 'app-security-login-data',
  templateUrl: './security-login-data.component.html',
  styleUrls: ['./security-login-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityLoginDataComponent implements OnInit {
  @Input()
  previewMode = false;

  loginLocationsData: ActiveSessionItem[] = [];

  locations: string[] = [];
  devices: any[] = [];
  timestamps: any[] = [];
  locations_num = 0;
  logloc_empty = false;

  loginlogoutData: AccountAccessesItem[] = [];
  login_count = 0;
  logout_count = 0;
  login_logouts = 0;
  loginlogout_empty = false;

  accStatusChangeData: AccountStatusChangeItem[] = [];
  account_deactivated = 0;
  account_reactivated = 0;
  status: any[] = [];
  timestamp: any[] = [];
  accstatus_empty = false;

  accActivitiesData: AccountActivityItem[] = [];
  PasswordChange = 0;
  Login = 0;
  SessionUpdated = 0;
  WebSessionTerminated = 0;
  MobileSessionTerminated = 0;
  terminatedSessions = 0;
  accactivity_empty = false;
  dataAvailableLoc = false;
  dataAvailableLogOuts = false;
  dataAvailableStatusChange = false;
  dataAvailableActivities = false;

  securityLoginDataStore: FbSecurityLoginInformationDataModel = {} as FbSecurityLoginInformationDataModel
  fbLoginLocationsData: ActiveSessionsModel = {} as ActiveSessionsModel;
  fbLoginLogoutsData: LoginsAndLogoutsModel = {} as LoginsAndLogoutsModel;
  fbAccStatusChangesData: AccountStatusChangesModel = {} as AccountStatusChangesModel;
  fbAccActivitiesData: AccountActivityModel = {} as AccountActivityModel;

  constructor(
    private store: Store
  ) {}

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
    this.securityLoginDataStore = this.store.selectSnapshot(
      FacebookState.getFacebookSecurityLoginInformationData,
    );
    this.fbLoginLocationsData = this.securityLoginDataStore.login_location;
    this.fbLoginLogoutsData = this.securityLoginDataStore.logins_and_logouts;
    this.fbAccStatusChangesData = this.securityLoginDataStore.account_status_changes;
    this.fbAccActivitiesData = this.securityLoginDataStore.account_activity;
    
    // Login Locations Data
    if (this.fbLoginLocationsData !== undefined) {
      this.loginLocationsData = this.fbLoginLocationsData.active_sessions_v2;
      if (Array.isArray(this.loginLocationsData) === true) {
        this.dataAvailableLoc = this.loginLocationsData.length !== 0;
        this.locations = this.loginLocationsData.map((loc) => loc.location);
      }
    }

    // Login Logout Data
    if (this.fbLoginLogoutsData !== undefined) {
      this.loginlogoutData = this.fbLoginLogoutsData.account_accesses_v2;
      if (Array.isArray(this.loginlogoutData) === true) {
        this.dataAvailableLogOuts = this.loginlogoutData.length !== 0;
        for (let i = 0; i < this.loginlogoutData.length; i++) {
          if (this.loginlogoutData[i].action === 'Login') {
            this.login_count++;
          } else if (this.loginlogoutData[i].action === 'Log out') {
            this.logout_count++;
          }
        }
        this.login_logouts = this.login_count + this.logout_count;
      }
    }

    // Account Status Changes Data
    if (this.fbAccStatusChangesData !== undefined) {
      this.accStatusChangeData = this.fbAccStatusChangesData.account_status_changes_v2;
      if (Array.isArray(this.accStatusChangeData) === true) {
        this.dataAvailableStatusChange = this.accStatusChangeData.length !== 0;
        for (let i = 0; i < this.accStatusChangeData.length; i++) {
          if (this.accStatusChangeData[i].status === 'Account deactivated') {
            this.account_deactivated++;
          } else {
            this.account_reactivated++;
          }
          this.status.push(this.accStatusChangeData[i].status);
          this.timestamp.push(this.accStatusChangeData[i].timestamp);
        }
      }
    }

    // Account Activities Data
    if (this.fbAccActivitiesData !== undefined) {
      this.accActivitiesData = this.fbAccActivitiesData.account_activity_v2;
      if (Array.isArray(this.accActivitiesData) === true) {
        this.dataAvailableActivities = this.accActivitiesData.length !== 0;
        for (let i = 0; i < this.accActivitiesData.length; i++) {
          if (this.accActivitiesData[i].action === 'Password Change') {
            this.PasswordChange++;
          } else if (this.accActivitiesData[i].action === 'Login') {
            this.Login++;
          } else if (this.accActivitiesData[i].action === 'Session updated') {
            this.SessionUpdated++;
          } else if (this.accActivitiesData[i].action === 'Web Session Terminated') {
            this.WebSessionTerminated++;
          } else if (this.accActivitiesData[i].action === 'Mobile Session Terminated') {
            this.MobileSessionTerminated++;
          }
          this.terminatedSessions = this.MobileSessionTerminated + this.WebSessionTerminated;
        }
      }
    }
  }
}

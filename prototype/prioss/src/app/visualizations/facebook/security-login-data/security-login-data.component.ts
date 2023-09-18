import { Component, Input, OnInit} from '@angular/core';
import { FacebookLoginLocationsRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_locations.repo';
import { LoginLocationsModel } from "../../../models/Facebook/loginLocations";
import { FacebookLoginLogoutsRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_logouts.repo';
import { LoginLogoutsModel } from '../../../models/Facebook/loginlogouts';
import { FacebookAccountStatusChangesRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_account_status_changes.repo';
import { AccountStatusChangesModel } from '../../../models/Facebook/accountStatusChanges';
import { FacebookAccountActivityRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_account_activity.repo';
import { AccountActivitiesModel } from '../../../models/Facebook/accountActivities';

@Component({
  selector: 'app-security-login-data',
  templateUrl: './security-login-data.component.html',
  styleUrls: ['./security-login-data.component.less']
})

export class SecurityLoginDataComponent implements OnInit{

  @Input()
  previewMode = false;

  loginLocationsData: LoginLocationsModel[] = [];
  locations: string[] = [];
  devices: any[] = [];
  timestamps: any [] = [];
  locations_num = 0
  logloc_empty = false;

  loginlogoutData: LoginLogoutsModel[] = [];
  login_count = 0;
  logout_count = 0;
  login_logouts = 0;
  loginlogout_empty = false;

  accStatusChangeData: AccountStatusChangesModel[] = [];
  account_deactivated = 0;
  account_reactivated = 0;
  status: any[] = [];
  timestamp: any[] = [];
  accstatus_empty = false;

  accActivitiesData: AccountActivitiesModel[] = [];
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


  constructor(private faceLoginLocationsRepo: FacebookLoginLocationsRepository,
              private faceLoginLogoutsRepo: FacebookLoginLogoutsRepository,
              private faceAccStatusChangesRepo: FacebookAccountStatusChangesRepository,
              private faceAccActivitiesRepo: FacebookAccountActivityRepository,
              ){}

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
    this.faceLoginLocationsRepo.getAllLoginLocations().then((allLoginLocations) => {
      this.loginLocationsData = allLoginLocations;
      this.dataAvailableLoc = this.loginLocationsData.length !== 0;
      if (this.loginLocationsData.length == 0) { this.logloc_empty = true}
      console.log("this.loginLocationsData", this.loginLocationsData);
      console.log("type of this.loginLocationsData", typeof(this.loginLocationsData));

      for(let i = 0; i < this.loginLocationsData.length; i++) {
        const loc = this.loginLocationsData[i].location;

        this.locations.push(loc);
        this.locations_num = this.locations.length;

        const unixTime: number  = +this.loginLocationsData[i].timestamp;
        this.loginLocationsData[i].timestamp = new Date(unixTime * 1000).toDateString();
      } 
    });

    this.faceLoginLogoutsRepo.getAllLoginLogouts().then((allLoginLogouts) => {
      this.loginlogoutData = allLoginLogouts;
      this.dataAvailableLogOuts = this.loginlogoutData.length !== 0;
      if (this.loginlogoutData.length == 0) {this.loginlogout_empty = true}
      for(let i = 0; i < this.loginlogoutData.length; i++) {
        const unixTime: number  = +this.loginlogoutData[i].timestamp;
        this.loginlogoutData[i].timestamp = new Date(unixTime * 1000).toDateString();

        if(this.loginlogoutData[i].action === 'Login') {
          this.login_count++;
        }
        else if(this.loginlogoutData[i].action === 'Log out') {
          this.logout_count++;
        }

        this.login_logouts = this.login_count + this.logout_count;
      }  
    });

    this.faceAccStatusChangesRepo.getAllAccStatusChanges().then((allAccStatusChanges) => {
      this.accStatusChangeData = allAccStatusChanges;
      this.dataAvailableStatusChange = this.accStatusChangeData.length !== 0;
      if (this.accStatusChangeData.length == 0) {this.accstatus_empty = true}
      console.log("this.accStatusChangeData" + this.accStatusChangeData);
      for(let i = 0; i < this.accStatusChangeData.length; i++) {
        const unixTime: number  = +this.accStatusChangeData[i].timestamp;
        this.accStatusChangeData[i].timestamp = new Date(unixTime * 1000).toDateString();

        if (this.accStatusChangeData[i].status === 'Account deactivated') {
          this.account_deactivated++;
        }
        else {
          this.account_reactivated++;
        }

        this.status.push(this.accStatusChangeData[i].status);
        this.timestamp.push(this.accStatusChangeData[i].timestamp);
      }
    });

    this.faceAccActivitiesRepo.getAllAccountActivities().then((collectData) => {
      this.accActivitiesData = collectData;
      this.dataAvailableActivities = this.accActivitiesData.length !== 0;
      if (this.accActivitiesData.length == 0) {this.accactivity_empty = true}
      for (let i = 0; i < this.accActivitiesData.length; i++) {
        const unixTime: number  = +this.accActivitiesData[i].timestamp;
        this.accActivitiesData[i].timestamp = new Date(unixTime * 1000).toDateString();
        if (this.accActivitiesData[i].action === "Password Change") {
          this.PasswordChange++;
        } else if (this.accActivitiesData[i].action === "Login") {
          this.Login++;
        } else if (this.accActivitiesData[i].action === "Session updated") {
          this.SessionUpdated++;
        } else if (this.accActivitiesData[i].action === "Web Session Terminated") {
          this.WebSessionTerminated++;
        } else if (this.accActivitiesData[i].action === "Mobile Session Terminated") {
          this.MobileSessionTerminated++;
        }
        this.terminatedSessions = this.MobileSessionTerminated + this.WebSessionTerminated;

      }
    });
  }
}

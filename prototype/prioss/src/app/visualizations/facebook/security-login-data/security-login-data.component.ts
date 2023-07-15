import { Component, Input, OnInit} from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as d3 from 'd3';
import { Router } from '@angular/router';
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

export class SecurityLoginDataComponent {

  @Input()
  previewMode: boolean = false;

  loginLocationsData: LoginLocationsModel[] = [];
  locations: string[] = [];
  devices: any[] = [];
  timestamps: any [] = [];
  locations_num: number = 0
  logloc_empty: boolean = false;

  loginlogoutData: LoginLogoutsModel[] = [];
  login_count: number = 0;
  logout_count: number = 0;
  login_logouts: number = 0;
  loginlogout_empty: boolean = false;

  accStatusChangeData: AccountStatusChangesModel[] = [];
  account_deactivated: number = 0;
  account_reactivated: number = 0;
  status: any[] = [];
  timestamp: any[] = [];
  accstatus_empty: boolean = false;

  accActivitiesData: AccountActivitiesModel[] = [];
  PasswordChange: number = 0;
  Login: number = 0;
  SessionUpdated: number = 0;
  WebSessionTerminated: number = 0;
  MobileSessionTerminated: number = 0;
  terminatedSessions: number = 0;
  accactivity_empty: boolean = false;


  constructor(private dbService: NgxIndexedDBService,
              private faceLoginLocationsRepo: FacebookLoginLocationsRepository,
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
      if (this.loginLocationsData.length == 0) { this.logloc_empty = true}
      console.log("this.loginLocationsData", this.loginLocationsData);
      console.log("type of this.loginLocationsData", typeof(this.loginLocationsData));

      for(let i = 0; i < this.loginLocationsData.length; i++) {
        const loc = this.loginLocationsData[i].location;
        const device = this.loginLocationsData[i].device;
        const time = this.loginLocationsData[i].timestamp;

        this.locations.push(loc);
        this.locations_num = this.locations.length;

        const unixTime: number  = +this.loginLocationsData[i].timestamp;
        this.loginLocationsData[i].timestamp = new Date(unixTime * 1000).toDateString();
      } 
    });

    this.faceLoginLogoutsRepo.getAllLoginLogouts().then((allLoginLogouts) => {
      this.loginlogoutData = allLoginLogouts;
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

  async visualizeData(locations: string[], devices: string[], timestamps: string[]) {
    console.log("In visualizeData");

  }



}

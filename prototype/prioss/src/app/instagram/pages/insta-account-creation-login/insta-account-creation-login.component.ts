import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaSignUpInfo } from 'src/app/instagram/models/InstaAccountCreationAndLoginInfo/InstaSignUpInfo';
import { InstaLoginInfo } from 'src/app/instagram/models/InstaAccountCreationAndLoginInfo/InstaLoginInfo';
import { InstaLogoutInfo } from 'src/app/instagram/models/InstaAccountCreationAndLoginInfo/InstaLogoutInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";

/**
 * This component is for instagram's account creation and login page.
 * This page is shown once a user visits the account creation tab in instagram dashboard
 *
 * @author: Mayank (mayank@mail.upb.de)
 *
 */
@Component({
  selector: 'app-insta-account-creation-login',
  templateUrl: './insta-account-creation-login.component.html',
  styleUrls: ['./insta-account-creation-login.component.less']
})
export class InstaAccountCreationLoginComponent extends SequenceComponentInit implements AfterViewInit, OnInit{
  @Input()
  previewMode = false;

  login_logout_activities: Login_Logout_Actvity_Output[] = [];
  signup_information: InstaSignUpInfo[] = [];
  login_activities: InstaLoginInfo[] = [];
  logout_activities: InstaLogoutInfo[] = [];

  login_amount=0;
  logout_amount=0;
  most_used_device_amount=0;
  most_used_device="";

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    const {
      signUpInfo,
      loginInfo,
      logoutInfo
    } = this.store.selectSnapshot(InstaState.getAuthenticationData);
    this.signup_information = [signUpInfo];
    this.login_activities = loginInfo;
    this.logout_activities = logoutInfo
    this.login_amount = this.login_activities.length;
    this.logout_amount = this.logout_activities.length;
    this.login_logout_activities = [...this.login_activities, ...this.logout_activities];
    this.sortLoginLogoutData();
    this.mostUsedDevice();
  }

  /**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Paul (pasch@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

  /**
  * @see-super-class
  * @author Paul (pasch@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 2: AccountCreationAndLogin");
  }

  /**
   *
   * This method is used to sort login and logout activities based on their timestamp
   *
   * @author: Mayank (mayank@mail.upb.de)
   */
  sortLoginLogoutData() {
    if(this.login_logout_activities && this.login_logout_activities.length > 0) {
      this.login_logout_activities = this.login_logout_activities.sort((a, b) => a.timestamp - b.timestamp);
    }
  }

  /**
  * Returns the most used device.
  * @returns the string of the most used device and the amout of time it appears
  *
  * @author: Melina (kleber@mail.uni-paderborn.de )
  */
  mostUsedDevice() {
    const activityAmounts: { [id: string] : number; } = {};
    let mostUsedDevice = '';
    let mostUsedAmount = 0;
    this.login_logout_activities.forEach((login_logout_activity)=>{
      if( activityAmounts[login_logout_activity.device] > 0){
        activityAmounts[login_logout_activity.device] = activityAmounts[login_logout_activity.device] + 1;
      }else{
        activityAmounts[login_logout_activity.device] = 1;
      }

      if(activityAmounts[login_logout_activity.device] > mostUsedAmount){
        mostUsedAmount = activityAmounts[login_logout_activity.device];
        mostUsedDevice = login_logout_activity.device;
      }
    });
    this.most_used_device = mostUsedDevice;
    this.most_used_device_amount = mostUsedAmount;
  }
}

/** Created interface for fetching value in HTML for User Login Activity */
export interface Login_Logout_Actvity_Output {
  ip_address: string;
  timestamp: number;
  user_agent: string;
  device: string,
  type: string,
  color: string
}

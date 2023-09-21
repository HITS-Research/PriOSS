import { AfterViewInit, Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { InstaSignUpInfo } from 'src/app/models/Instagram/InstaAccountCreationAndLoginInfo/InstaSignUpInfo';
import { InstaSignUpRepository } from 'src/app/db/data-repositories/instagram/insta-accountcreation-login/insta-signup.repository';
import { InstaLoginRepository } from 'src/app/db/data-repositories/instagram/insta-accountcreation-login/insta-login.repository';
import { InstaLogoutRepository } from 'src/app/db/data-repositories/instagram/insta-accountcreation-login/insta-logout.repository';
import { InstaLoginInfo } from 'src/app/models/Instagram/InstaAccountCreationAndLoginInfo/InstaLoginInfo';
import { InstaLogoutInfo } from 'src/app/models/Instagram/InstaAccountCreationAndLoginInfo/InstaLogoutInfo';

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
export class InstaAccountCreationLoginComponent extends SequenceComponentInit implements AfterViewInit{
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

  constructor(private instaSignUpRepo: InstaSignUpRepository,
              private instaLoginRepo: InstaLoginRepository,
              private instaLogoutRepo: InstaLogoutRepository) {
    super();
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
    // SignUp Information fetched from SQLite
    const signup_information = await this.instaSignUpRepo.getSignUpInfo();
    if(signup_information.length > 0) {
      this.signup_information = signup_information
    }

    // Login Activities fetched from SQLite
    const login_activities = await this.instaLoginRepo.getLoginInfo();
    this.login_amount = login_activities.length;
    if(login_activities.length > 0) {
      this.login_activities = login_activities;
    }

    // Logout Activities fetched from SQLite
    const logout_activities = await this.instaLogoutRepo.getLogoutInfo();
    this.logout_amount = logout_activities.length;
    if(logout_activities.length > 0) {
      this.logout_activities = logout_activities;
    }

    // Merging Login and Logout Activities into one array
    this.login_logout_activities = [...this.login_activities, ...this.logout_activities]

    // Sorting array of login and logout activities
    this.sortLoginLogoutData();

    // Finding the most used device
    this.mostUsedDevice();
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

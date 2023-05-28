import { Component, Input } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map } from 'rxjs/operators';

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
export class InstaAccountCreationLoginComponent{
  @Input()
  previewMode: boolean = false;

  login_logout_activities: Login_Logout_Actvity_Output[] = [];
  signup_information: SignUp_Information;

  login_amount: number=0;
  logout_amount: number=0;
  most_used_device_amount: number=0;
  most_used_device: string="";

  constructor(private dbService: NgxIndexedDBService)
  {

    this.dbService.getAll('insta/signup_information').subscribe({
      next: (signup_information: any) => {
        if(signup_information.length > 0) {
              const item = {
                ip_address: signup_information[0].ip_address,
                time: signup_information[0].time,
                device: signup_information[0].device,
                color: "blue"
              }
              this.signup_information = item;
            }
      },
      error: (error: any) => {
        console.log("Error occurred while fetching signup information data")
        console.log(error)
      }
    });

    

    // Variable for promise functionality
    const promises = [];

    // Reading the login data from indexeddb with promise for the asynchronous operation
    promises.push(new Promise((resolve, reject) => {
      this.dbService.getAll('insta/login_activity').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    }));

    // Reading the logout data from indexeddb with promise for the asynchronous operation
    promises.push(new Promise((resolve, reject) => {
      this.dbService.getAll('insta/logout_activity').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    }));


    // Combining data after both asynchronous operations are completed
    Promise.all(promises).then(results => {

      // Assigning login data values to local variable 
      let login_data = results[0] as Login_Logout_Actvity_Fetch[];
      this.login_amount = login_data.length;

      // Assigning logout data values to local variable 
      let logout_data = results[1] as Login_Logout_Actvity_Fetch[];
      this.logout_amount = logout_data.length;
      
      // Checking if login and logout data is present or not
      if(this.login_amount > 0 || this.logout_amount > 0) {

        // Fetching each row value and assigning it to new variable with additional parameters
        login_data.forEach((record: Login_Logout_Actvity_Fetch) => {
          const item = {
            ip_address: record.ip_address,
            time: record.time,
            user_agent: record.user_agent,
            device: this.getDeviceNameBasedOnUserAgent(record.user_agent),
            type: "Login",
            color: "green"
          }
          this.login_logout_activities.push(item)
        });

        // Fetching each row value and assigning it to new variable with additional parameters
        
        logout_data.forEach((record: Login_Logout_Actvity_Fetch) => {
          const item = {
            ip_address: record.ip_address,
            time: record.time,
            user_agent: record.user_agent,
            device: this.getDeviceNameBasedOnUserAgent(record.user_agent),
            type: "Logout",
            color: "red"
          };
          this.login_logout_activities.push(item);
        });
        this.sortLoginLogoutData();
        this.mostUsedDevice();
      }
    }).catch(error => {
        console.log("Error occurred while fetching login and logout data")
        console.log(error)
    });    
  }

  // Sorting login and logout data based on timestamp
  sortLoginLogoutData() {
    if(this.login_logout_activities && this.login_logout_activities.length > 0) {
      this.login_logout_activities = this.login_logout_activities.sort((a, b) => a.time - b.time);
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
    let mostUsedDevice: string = '';
    let mostUsedAmount: number = 0;
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

  // Returning device type value based on user agent value
  getDeviceNameBasedOnUserAgent(user_agent: string): string {
    if(user_agent.includes("Mac OS")) {
      return "Macbook"
    } else if (user_agent.includes("iPhone")) {
      return "iPhone"
    } else if (user_agent.includes("Android")) {
      return "Android"
    } else if (user_agent.match(/(Chrome)|(Safari)/g)) {
      return "Webbrowser"
    }
    return "Unknown Device"
  }

}

/** Created interface for fetching value in HTML for User Last Known Locations */
interface SignUp_Information {
  ip_address: string;
  time: number;
  device: string;
  color: string;
}

/** Created interface for fetching value from Indexed DB for User Login Activity */
interface Login_Logout_Actvity_Fetch {
  title: string;
  ip_address: string;
  time: number;
  user_agent: string;
}

/** Created interface for fetching value in HTML for User Login Activity */
export interface Login_Logout_Actvity_Output {
  ip_address: string;
  time: number;
  user_agent: string;
  device: string,
  type: string,
  color: string
}



import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.component';
import { AppType } from '../enum/app-type';

//service identifier filenames
const instaIDFilename = "TODO";
const spotIDFilename = "MyData/Read_Me_First.pdf";
const faceIDFilename = "index.html";

/**
  * This component is responsible for offering the user a way to select a service, show the respective download instructions
  * and offer a field where the user can upload the data-download. With uploaded data, the user can press a button to 
  * parse the data and go to the dashboard of the respective service
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de ) 
  *
  */
@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.less']
})
export class ServiceSelectionComponent {
  
  //Icon properties
  faCircleRight = faCircleRight;
  faArrowRotateRight = faArrowRotateRight;
  isProcessingFile = false;

  //file upload
  uploadedFiles : File[] = [];
  selectedFileName : string = "";
  
  appType: typeof AppType = AppType;

  selectedServiceName: AppType;
  constructor(private dbService: NgxIndexedDBService, private router: Router, private notifyService: NotificationService)
  {
    //clear the database when this component gets created
    this.dbService.clear("all/userdata").subscribe((deleted) => {
      console.log("Cleared all/userdata: " + deleted);
    });
    this.dbService.clear("spot/userdata").subscribe((deleted) => {
      console.log("Cleared spot/userdata: " + deleted);
    });
    this.dbService.clear("spot/inferences").subscribe((deleted) => {
      console.log("Cleared spot/inferences: " + deleted);
    });
    this.dbService.clear("spot/history").subscribe((deleted) => {
      console.log("Cleared spot/history: " + deleted);
    });
    this.dbService.clear("insta/ads_interests").subscribe((deleted) => {
      console.log("Cleared insta/ads_interests: " + deleted);
    });
    this.dbService.clear("insta/advertisers_using_your_activity_or_information").subscribe((deleted) => {
      console.log("Cleared insta/advertisers_using_your_activity_or_information: " + deleted);
    });
    this.dbService.clear("insta/ads_viewed").subscribe((deleted) => {
      console.log("Cleared insta/ads_viewed: " + deleted);
    });
    this.dbService.clear("insta/ads_clicked").subscribe((deleted) => {
      console.log("Cleared insta/ads_clicked: " + deleted);
    });
    this.dbService.clear("insta/last_known_location").subscribe((deleted) => {
      console.log("Cleared insta/last_known_location: " + deleted);
    });
    this.dbService.clear("insta/login_activity").subscribe((deleted) => {
      console.log("Cleared insta/login_activity: " + deleted);
    });
    this.dbService.clear("insta/logout_activity").subscribe((deleted) => {
      console.log("Cleared insta/logout_activity: " + deleted);
    });
    this.dbService.clear("insta/password_change_activity").subscribe((deleted) => {
      console.log("Cleared insta/password_change_activity: " + deleted);
    });
    this.dbService.clear("insta/signup_information").subscribe((deleted) => {
      console.log("Cleared insta/signup_information: " + deleted);
    });
    this.dbService.clear("insta/account_information").subscribe((deleted) => {
      console.log("Cleared insta/account_information: " + deleted);
    });
    this.dbService.clear("insta/professional_information").subscribe((deleted) => {
      console.log("Cleared insta/professional_information: " + deleted);
    });
    this.dbService.clear("insta/profile_changes").subscribe((deleted) => {
      console.log("Cleared insta/profile_changes: " + deleted);
    });
    this.dbService.clear("face/ads_information").subscribe((deleted) => {
      console.log("Cleared face/ads_information: " + deleted);
    });
    this.dbService.clear("face/ads_interacted").subscribe((deleted) => {
      console.log("Cleared face/ads_interacted: " + deleted);
    });
    this.dbService.clear("face/inferred_topics").subscribe((deleted) => {
      console.log("Cleared face/inferred_topics: " + deleted);
      });
    this.dbService.clear("face/apps_websites").subscribe((deleted) => {
      console.log("Cleared face/apps_websites: " + deleted);
    });
    this.dbService.clear("face/off_facebook_activity").subscribe((deleted) => {
      console.log("Cleared face/off_facebook_activity: " + deleted);
    });
    this.dbService.clear("face/friend_requests_received").subscribe((deleted) => {
    console.log("Cleared face/friend_requests_received: " + deleted);
    });
    this.dbService.clear("face/friend_requests_sent").subscribe((deleted) => {
      console.log("Cleared face/friend_requests_sent: " + deleted);
    });
    this.dbService.clear("face/friends").subscribe((deleted) => {
      console.log("Cleared face/friends: " + deleted);
    });
    this.dbService.clear("face/rejected_friend_requests").subscribe((deleted) => {
      console.log("Cleared face/rejected_friend_requests: " + deleted);
    });
    this.dbService.clear("face/removed_friends").subscribe((deleted) => {
      console.log("Cleared face/removed_friends: " + deleted);
    });
    this.dbService.clear("face/who_you_follow").subscribe((deleted) => {
      console.log("Cleared face/who_you_follow: " + deleted);
    });
  
  }

/*
 * File Selection Workflow
 */

/**
  * Event callback that is called when the user puts a file in the upload field
  * Todo: This callback checks if the file is a zip file and contains the signature file
  * for the selected service, to make sure it is a valid data-download from the correct service
  * It displays an error if not.
  *
  *
  * @param event - The change file event that holds the newly uploaded file
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  onFileSelected(event:any) 
  {
    console.log('onFileSelected');
    this.uploadedFiles = event.target.files;

    this.validateFiles(this.selectedServiceName);//TODO: Pass selected File
  }

  /**
  * Selects the clicked app and show instructions based on the selection
  *
  * @param appType - The enum for appType is expected 
  *
  * @author: rbharmal (rbharmal@mail.upb.de)
  *
  */
  selectApp(appType: AppType)
  {
    this.selectedServiceName = appType;
  }

 /**
  * Checks if the first file in the uploadedFiles array contains the identifying file of the service with the given serviceName
  *
  * @param serviceName - The serviceName constant for which a data-download zip is expected 
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  validateFiles(selectedApp: AppType)
  {
    let file = this.uploadedFiles[0]; 

    this.loadZipFile(file).then((zip: any) => 
    {
        if (selectedApp == this.appType.Instagram)
        {
          let foundFile = zip.files[instaIDFilename];

          if(typeof(foundFile) == undefined)
          {
            this.notifyService.showNotification("Please select a valid zip-file that you downloaded from Instagram!");
          }
          else
          {
            this.setSelectedFileName(file.name);
          }
        }
        else if (selectedApp == this.appType.Spotify)
        {
          let foundFile = zip.files[spotIDFilename];//TODO: this file check does not work yet, look at jszip docs
          //console.log(foundFile);

          if(typeof(foundFile) == undefined)
          {
            this.notifyService.showNotification("Please select a valid zip-file that you downloaded from Spotify!");
          }
          else
          {
            this.setSelectedFileName(file.name);
          }
        }
        else if(selectedApp == this.appType.Facebook)
        {
          let foundFile = zip.files[faceIDFilename];

          if(typeof(foundFile) == undefined)
          {
            this.notifyService.showNotification("Please select a valid zip-file that you downloaded from Facebook!");
          }
          else
          {
            this.setSelectedFileName(file.name);
          }
        }
      });
    
  }

/**
  * Sets the uploadedFileName to the given filename 
  *
  * @param filename - a string containing the name of the file that selected for uploaded
  * @author: Simon (scg@mail.upb.de)
  *
  */
  setSelectedFileName(filename: string)
  {
    console.log("enabling file selection prompt: " + filename);
    this.selectedFileName = filename;
  }

/*
 * File Parsing Workflow
 */

/**
  * Event callback that is called when the user clicks the explore data button
  * This callback starts the process of parsing the datadownload by calling the parseFile method for the selected service
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  onClickedExploreData() 
  {
    console.log("Clicked explore data");
    this.isProcessingFile = true;
    this.parseFile(this.selectedServiceName);//TODO: get selected service's name
  }

/**
  * Start of the file parsing procedure. Hands over the file parsing duty to the correct parsing method of the respective service.
  * Any steps that can be made before the service specific parsing can be added into this method
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  parseFile(selectedApp: AppType)
  {
    //Put service independent parsing operations here

    //Handing over parsing to service specific parsing methods
    if (selectedApp == this.appType.Instagram)
    {
      console.log("Parsing Instagram file...");
      this.parseInstagramFile();
    }
    else if (selectedApp == this.appType.Spotify)
    {
      console.log("Parsing Spotify file...");
      this.parseSpotifyFile();
    }
    else if(selectedApp == this.appType.Facebook)
    {
      console.log("Parsing Facebook file...");
      this.parseFacebookFile();
    }
  }

/*
 * Service Specific File Parsing Methods
 */

/**
  * Parses the uploaded Instagram data-download-zip file into the indexedDB
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
  parseInstagramFile()
  {
    let file = this.uploadedFiles[0];

    this.loadZipFile(file).then((zip: any) =>
    {
      this.isProcessingFile = true;//shows the processing icon on the button

      Object.keys(zip.files).forEach((filename: any) => 
      {
        zip.files[filename].async("string").then((content:any) => 
        {
            //data regarding general personal infomation
            if (filename == "personal_information/personal_information.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              let personal_data = jsonData.profile_user[0].string_map_data;//the data is nested in some objects
              
              this.dbService.add("all/userdata",
              {
                username: personal_data.Username.value,
                email: personal_data.Email.value,
                birthdate: personal_data["Date of birth"].value,
                gender: personal_data.Gender.value,
              }).subscribe();
            }
            //data regarding ads
            else if(filename == "information_about_you/ads_interests.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.inferred_data_ig_interest.forEach((interest:any) => 
              {
                this.dbService.add('insta/ads_interests',
                {
                  interest: interest.string_map_data.Interest.value
                }).subscribe();
              });
            }
            else if(filename == "ads_and_businesses/advertisers_using_your_activity_or_information.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.ig_custom_audiences_all_types.forEach((advertiser:any) =>
              {
                this.dbService.add('insta/advertisers_using_your_activity_or_information',
                {
                  advertiser_name: advertiser.advertiser_name,
                  has_data_file_custom_audience: advertiser.has_data_file_custom_audience,
                  has_remarketing_custom_audience: advertiser.has_remarketing_custom_audience,
                  has_in_person_store_visit: advertiser.has_in_person_store_visit
                }).subscribe();
              });
            }
            else if(filename == "ads_and_topics/ads_clicked.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.impressions_history_ads_clicked.forEach((ad:any) =>
              {
                this.dbService.add('insta/ads_clicked', 
                {
                  title: ad.title,
                  timestamp: ad.string_list_data.timestamp
                }).subscribe();
              });
            }
            else if(filename == "ads_and_topics/ads_viewed.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.impressions_history_ads_seen.forEach((ad:any) =>
              {
                if (ad.string_map_data.Author != undefined) {
                  this.dbService.add('insta/ads_viewed', 
                  {
                    title: ad.string_map_data["Author"].value,
                    timestamp: ad.string_map_data["Time"].timestamp
                  }).subscribe();
                }
              });
            }
            //data regarding login and account creation
            else if(filename == "login_and_account_creation/last_known_location.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              let last_location_data = jsonData.account_history_imprecise_last_known_location[0].string_map_data;

              this.dbService.add('insta/last_known_location',
              {
                imprecise_latitude: last_location_data["Imprecise Latitude"].value,
                imprecise_longitude: last_location_data["Imprecise Longitude"].value,
                time_uploaded: last_location_data["Time Uploaded"].timestamp
              }).subscribe();
            }
            else if(filename == "login_and_account_creation/login_activity.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.account_history_login_history.forEach((activity:any) =>
              {
                this.dbService.add('insta/login_activity',
                {
                  title: activity.title,
                  ip_address: activity.string_map_data["IP Address"].value,
                  time: activity.string_map_data.Time.timestamp,
                  user_agent: activity.string_map_data["User Agent"].value
                }).subscribe();
              });
            }
            else if(filename == "login_and_account_creation/logout_activity.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.account_history_logout_history.forEach((activity:any) =>
              {
                this.dbService.add('insta/logout_activity',
                {
                  title: activity.title,
                  ip_address: activity.string_map_data["IP Address"].value,
                  time: activity.string_map_data.Time.timestamp,
                  user_agent: activity.string_map_data["User Agent"].value
                }).subscribe();
              });
            }
            else if(filename == "login_and_account_creation/password_change_activity.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.account_history_password_change_history.forEach((activity:any) =>
              {
                this.dbService.add('insta/password_change_activity',
                {
                  time: activity.string_map_data.Time.timestamp
                }).subscribe();
              });
            }
            else if(filename == "login_and_account_creation/signup_information.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              let signup_data = jsonData.account_history_registration_info[0].string_map_data;

              this.dbService.add('insta/signup_information',
              {
                username: signup_data.Username.value,
                ip_address: signup_data["IP Address"].value,
                time: signup_data.Time.timestamp,
                email: signup_data.Email.value,
                phone_number: signup_data["Phone Number"].value,
                device: signup_data.Device.value
              }).subscribe();
            }
            //data regarding instagram personal information
            else if(filename == "personal_information/account_information.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              let account_data = jsonData.profile_account_insights[0].string_map_data;

              this.dbService.add('insta/account_information',
              {
                contact_syncing: account_data["Contact Syncing"].value,
                first_country_code: account_data["First Country Code"].value,
                has_shared_live_video: account_data["Has Shared Live Video"].value,
                last_login: account_data["Last Login"].timestamp,
                last_logout: account_data["Last Logout"].timestamp,
                first_story_time: account_data["First Story Time"].timestamp,
                last_story_time: account_data["Last Story Time"].timestamp,
                first_close_friends_story_time: account_data["First Close Friends Story Time"].timestamp
              }).subscribe();
            }
            else if(filename == "personal_information/professional_information.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              let prof_data = jsonData.profile_business[0];

              this.dbService.add('insta/professional_information',
              {
                title: prof_data.title
              }).subscribe();
            }
            else if(filename == "personal_information/profile_changes.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.profile_profile_change.forEach((change:any) => 
              {
                this.dbService.add('insta/profile_changes', {
                  title: change.title,
                  changed: change.string_map_data.Changed.value,
                  previous_value: change.string_map_data["Previous Value"].value,
                  new_value: change.string_map_data["New Value"].value,
                  change_date: change.string_map_data["Change Date"].timestamp
                }).subscribe();
              });
            }
        });
        return true;
      });

      console.log("navigating...");
      setTimeout(() => {
        //TODO: properly wait for data to be available in DB
        this.router.navigate(['insta/dashboard']);
      }, 3000);
    });
  }

/**
  * Parses the uploaded Spotify data-download-zip file into the indexedDB
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  parseSpotifyFile()
  {
    let file = this.uploadedFiles[0];
    
    this.loadZipFile(file).then((zip: any) => 
    {
      this.isProcessingFile = true;//shows the processing icon on the button

      Object.keys(zip.files).forEach((filepath: any) => 
      {
        zip.files[filepath].async("string").then((content:any) => 
        {
          let filename: string = filepath.split('\\').pop().split('/').pop();
          console.log('Opening: ' + filename);

          if(filename == "Userdata.json")
          {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);

            this.dbService.add("all/userdata",
            {
              username: jsonData.username,
              email: jsonData.email,
              //firstname: jsonData.firstname,
              //lastname: jsonData.lastname,
              country: jsonData.country,
              birthdate: jsonData.birthdate,
              gender: jsonData.gender,
              postalCode: jsonData.postalCode,
              mobileNumber: jsonData.mobileNumber,
              mobileOperator: jsonData.mobileOperator,
              mobileBrand: jsonData.mobileBrand,
              creationTime: jsonData.creationTime,
            }).subscribe((key) => 
            { 
              //console.log("Userdata:")
              //console.log(key); 
            });
          }
          else if(filename == "Inferences.json")
          {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);

            console.log("Json Data inferences: ");
            console.log(jsonData);

            jsonData.inferences.forEach((inference: any) => {
              //console.log("Saving inference: " + inference);
              this.dbService.add("spot/inferences",
              {
                inference: inference,
              }).subscribe((key) => 
              {
                //console.log("inference: ");
                //console.log(key); 
              });
            });
          }
          //Scan all streaming history files (multiple numbered files may exist in a download)
          if(filename.startsWith("StreamingHistory"))
          {
            //console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);

            //console.log("Json Data history: ");
            //console.log(jsonData);

            jsonData.forEach((historyItem: any) => {
              console.log(historyItem);
              this.dbService.add("spot/history",
              {
                endTime: historyItem.endTime,
                artistName: historyItem.artistName,
                trackName: historyItem.trackName,
                msPlayed: historyItem.msPlayed,
              }).subscribe((key) => 
              {
                //console.log("inference: ");
                //console.log(key); 
              });
            });
          }
        });
        return true;
      });

      setTimeout(() => {
        //TODO: properly wait for data to be available in DB
        this.router.navigate(['spot/dashboard']);
      }, 3000);
      
    });
  }

/**
  * Parses the uploaded Facebook data-download-zip file into the indexedDB
  *
  * @author: rishmamn@campus.uni-paderborn.de
  *
  */
  parseFacebookFile()
  {
    let file = this.uploadedFiles[0];
    
    this.loadZipFile(file).then((zip: any) => 
    {
      this.isProcessingFile = true;//shows the processing icon on the button

      Object.keys(zip.files).forEach((filename: any) => 
      {
        zip.files[filename].async("string").then((content:any) => 
        {
          if(filename == "profile_information/profile_information.json")
          {
            let jsonData = JSON.parse(content);
            let personal_data = jsonData.profile_v2;
            const birthdate = personal_data.birthday;
            const formattedBirthdate = `${birthdate.day.toString().padStart(2, '0')}
            -${birthdate.month.toString().padStart(2, '0')}-${birthdate.year}`;
             this.dbService.add("all/userdata",
             {
              username: personal_data.name.full_name,
              email: personal_data.emails.emails,
              birthdate: formattedBirthdate,
              gender: personal_data.gender.gender_option
              }).subscribe((key) => 
              {
              });
            }
            else if(filename == "ads_information/advertisers_using_your_activity_or_information.json") {
              console.log('Parsing: ' + filename);
              let jsonData = JSON.parse(content);
              jsonData.custom_audiences_all_types_v2.forEach((advertisers_info: any) => {
              this.dbService.add('face/ads_information',
                {
                  advertiser_name:advertisers_info.advertiser_name,
                  has_data_file_custom_audience: advertisers_info.has_data_file_custom_audience,
                  has_remarketing_custom_audience:advertisers_info.has_remarketing_custom_audience,
                  has_in_person_store_visit:advertisers_info.has_in_person_store_visit,
                }).subscribe((key) => 
                {
                });
              });
              }
              else if(filename == "ads_information/advertisers_you've_interacted_with.json") {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.history_v2.forEach((ads_interacted_with_info: any) => {
                this.dbService.add('face/ads_interacted',
                  {
                    title: ads_interacted_with_info.title,
                    action: ads_interacted_with_info.action,
                    timestamp : ads_interacted_with_info.timestamp,
                  }).subscribe((key) => 
                  {
                    console.log("interact",key , this.dbService.getAll('face/ads_interacted'))
                  });
                });
                }
                else if(filename == "your_topics/your_topics.json") {
                  console.log('Parsing: ' + filename);
                  let jsonData = JSON.parse(content);
                  jsonData.inferred_topics_v2.forEach((topic: any) => {
                  this.dbService.add('face/inferred_topics',
                    {
                      topic: topic
                    }).subscribe((key) => 
                    {
                      console.log("inferred",key , this.dbService.getAll('face/inferred_topics'))
                    });
                  });
                  }
                else if(filename == "apps_and_websites_off_of_facebook/apps_and_websites.json") {
                  console.log('Parsing: ' + filename);
                  let jsonData = JSON.parse(content);
                  jsonData.installed_apps_v2.forEach((apps_websites_info: any) => {
                  this.dbService.add('face/apps_websites',
                    {
                      name: apps_websites_info.name,
                      added_timestamp: apps_websites_info.added_timestamp,
                      user_app_scoped_id : apps_websites_info.user_app_scoped_id,
                      category: apps_websites_info.category,
                      removed_timestamp :apps_websites_info.removed_timestamp
                    }).subscribe((key) => 
                    {
                     
                    });
                  });
                  }
                else if(filename == "apps_and_websites_off_of_facebook/your_off-facebook_activity.json") {
                  console.log('Parsing: ' + filename);
                  let jsonData = JSON.parse(content);
                  jsonData.off_facebook_activity_v2.forEach((off_facebook_activity_info: any) => {
                  this.dbService.add('face/off_facebook_activity',
                    {
                      name: off_facebook_activity_info.name,
                      events: off_facebook_activity_info.events,
                      id: off_facebook_activity_info.events[0].id,
                      type: off_facebook_activity_info.events[0].type,
                      timestamp :off_facebook_activity_info.events[0].timestamp
                    }).subscribe((key) => 
                    {
                      
                    });
                  });
                  }
                  else if(filename == "friends_and_followers/friend_requests_received.json") 
              {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.received_requests_v2.forEach((friends: any) => {
                this.dbService.add('face/friend_requests_received',
                  {
                    name: friends.name,
                    timestamp : new Date(friends.timestamp*1000),
                  }).subscribe((key) => 
                  {
                    console.log("requests",key , this.dbService.getAll('face/friend_requests_received'))
                  });
                });
              }
              else if(filename == "friends_and_followers/friend_requests_sent.json") 
              {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.sent_requests_v2.forEach((friends: any) => {
                this.dbService.add('face/friend_requests_sent',
                  {
                    name: friends.name,
                    timestamp : new Date(friends.timestamp*1000),
                  }).subscribe((key) => 
                  {
                    console.log("request_sent",key , this.dbService.getAll('face/friend_requests_sent'))
                  });
                });
              }
              else if(filename == "friends_and_followers/friends.json") 
              {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.friends_v2.forEach((friends: any) => {
                this.dbService.add('face/friends',
                  {
                    name: friends.name,
                    timestamp : new Date(friends.timestamp*1000),
                  }).subscribe((key) => 
                  {
                    console.log("friends",key , this.dbService.getAll('face/friends'))
                  });
                });
              }
              else if(filename == "friends_and_followers/rejected_friend_requests.json") 
              {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.rejected_requests_v2.forEach((friends: any) => {
                this.dbService.add('face/rejected_friend_requests',
                  {
                    name: friends.name,
                    timestamp : new Date(friends.timestamp*1000),
                  }).subscribe((key) => 
                  {
                    console.log("rejected_friend_request",key , this.dbService.getAll('face/rejected_friend_requests'))
                  });
                });
              }
              else if(filename == "friends_and_followers/removed_friends.json") 
              {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.deleted_friends_v2.forEach((friends: any) => {
                this.dbService.add('face/removed_friends',
                  {
                    name: friends.name,
                    timestamp : new Date(friends.timestamp*1000),
                  }).subscribe((key) => 
                  {
                    console.log("removed_friends",key , this.dbService.getAll('face/removed_friends'))
                  });
                });
              }
              else if(filename == "friends_and_followers/who_you_follow.json") 
              {
                console.log('Parsing: ' + filename);
                let jsonData = JSON.parse(content);
                jsonData.following_v2.forEach((friends: any) => {
                this.dbService.add('face/who_you_follow',
                  {
                    name: friends.name,
                    timestamp : new Date(friends.timestamp*1000),
                  }).subscribe((key) => 
                  {
                    console.log("who_you_follow",key , this.dbService.getAll('friends_and_followers/who_you_follow'))
                  });
                });
              }
              });
        });
        return true;
      });

      console.log("navigating...");
      setTimeout(() => {
        //TODO: properly wait for data to be available in DB
        this.router.navigate(['face/dashboard']);
      }, 3000);
  }

/*
 * Utility Methods
 */

/**
  * takes the first file in the uploadedFiles array and tries to load it as a zip-file.
  *
  * @returns the Promise of a zip file loaded by jszip
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
loadZipFile(file: File) : any
{
  if(typeof(file) == "undefined")
  {
    //TODO: Show error: you didn't upload a zip file
    this.notifyService.showNotification("Please select a data-download zip-file first!");
    this.isProcessingFile = false;
    return;
  }

  if(file.type == "application/zip" || file.type == "application/x-zip-compressed") 
  {
    const jsZip = require('jszip');
    return jsZip.loadAsync(file)
  }
  else
  {
    //TODO: Show error: you didn't upload a zip file
    this.notifyService.showNotification("The file you selected is not a zip-file. Please select the zip file you downloaded from " + this.selectedServiceName, 10000);
    this.isProcessingFile = false;
  }
}

}
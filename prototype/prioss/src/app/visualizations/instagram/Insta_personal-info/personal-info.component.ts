import { Component, Input } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as utilities from 'src/app/utilities/generalUtilities.functions'


//this interface serves as container for the profile change data.
interface ProfileChange{
  change_date: string;
  changed: string;
  new_value: string;
  previous_value: string;
  title: string;
}

/**
  * This component is the visualization component on instagram's dashboard page.
  * This page is shown when the user clicks on the personal information card on instagram's dashboard.
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.less']
})

export class Insta_PersonalInfoComponent {
  @Input()
  previewMode: boolean = false;

  userData: object = {};
  personalInfo: object = {};
  accountInfo: object = {};
  professionalInfo: object = {};
  profileChanges: ProfileChange[] = [];
  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;


  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.getAll('all/userdata').subscribe((userdata: any) => {
      this.personalInfo = userdata[0];
      console.log(this.personalInfo);
    });

    this.dbService.getAll('insta/account_information').subscribe((accountInfo: any) => {
      this.accountInfo = accountInfo[0];
      console.log(this.accountInfo);
    });

    this.dbService.getAll('insta/professional_information').subscribe((profInfo: any) => {
      this.professionalInfo = profInfo[0];
      console.log(this.professionalInfo);
    });

    this.dbService.getAll('insta/profile_changes').subscribe((profileChanges: any) => {
      this.profileChanges = profileChanges;
      console.log(this.profileChanges);
    });
  }

  /**
  * This method capitalizes the first letter of a word and removes '_' from strings.
  * used to capitalize the (non-capitalized) database entries (e.g. email -> Email, email_accound -> Email Account) 
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */ 
  capitalizeAndPrettify(str: string) {
    let result: string = "";
    str.split('_').forEach(function (splitted) {
      result = result + ' ' + splitted.charAt(0).toUpperCase() + splitted.slice(1);
    });

    return result;
  }

  /**
   * This method converts a string to a timestamp if it is feasable.
   * used to convert a string with the format YYYY-MM-DD (e.g. 1676140269 -> 2023-01-06)
   * 
   * @param str: the string to convert
   * @returns: a timestamp if feasable
   * 
   * @author: Paul (pasch@mail.upb.de)
   * 
   */
  convertTimestamp(str: string): any {
    //returns the given string if it is not convertible to a number.
    if (isNaN(parseInt(str))) {
      return str;
    }
    //returns 'na' if the timestamp is 0.
    if (str == '0') {
      return 'na';
    }

    let number: number = parseInt(str) * 1000;
    let date: Date = new Date(number);

    //returns a date in the format YYYY-MM-DD.
    return date.getFullYear() + '-' 
           + ('0' + date.getMonth()).slice(-2) + '-' 
           + ('0' + date.getDay()).slice(-2);
  }
}
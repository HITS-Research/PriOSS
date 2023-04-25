import { Component, Input } from '@angular/core';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { InstaPersonalRepository } from 'src/app/db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import { InstaPersonalInfo } from 'src/app/models/Instagram/PersonalInfo/InstaPersonalInfo';
import { InstaAccountInfo } from 'src/app/models/Instagram/PersonalInfo/InstaAccountInfo';
import { InstaProfessionalInfo } from 'src/app/models/Instagram/PersonalInfo/InstaProfessionalInfo';
import { InstaProfileChange } from 'src/app/models/Instagram/PersonalInfo/InstaProfileChange';



/**
  * This component is the visualization component on instagram's dashboard page.
  * This page is shown when the user clicks on the personal information card on instagram's dashboard.
  *
  * @author: Paul (pasch@mail.upb.de)
  */
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.less']
})

export class Insta_PersonalInfoComponent {
  @Input()
  previewMode: boolean = false;

  personalInfo: InstaPersonalInfo[];
  accountInfo: InstaAccountInfo[];
  professionalInfo: InstaProfessionalInfo[];
  profileChanges: InstaProfileChange[] = [];
  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;


  constructor(private instaPersonalRepo: InstaPersonalRepository) {
    this.collectData();
  }

  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   * 
   * @author: Paul (pasch@mail.upb.de)
   */
  async collectData() {
    this.personalInfo = await this.instaPersonalRepo.getPersonalInfo();
    this.accountInfo = await this.instaPersonalRepo.getAccountInfo();
    this.professionalInfo = await this.instaPersonalRepo.getProfessionalInfo();
    this.profileChanges = await this.instaPersonalRepo.getProfileChanges();
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
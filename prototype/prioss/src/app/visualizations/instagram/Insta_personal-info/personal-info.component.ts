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

  personalInfo: InstaPersonalInfo;
  accountInfo: InstaAccountInfo;
  professionalInfo: InstaProfessionalInfo;
  profileChanges: InstaProfileChange[] = [];
  listOfProfileChanges: InstaProfileChange[] = [];
  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  capitalizeAndPrettify: (str: string) => string = utilities.capitalizeAndPrettify;


  constructor(private instaPersonalRepo: InstaPersonalRepository) {
    this.collectData();
  }

  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   * 
   * @author: Paul (pasch@mail.upb.de)
   */
  async collectData() {
    await this.instaPersonalRepo.getPersonalInfo().then((pInfo) => {
      this.personalInfo = pInfo[0];
    });
    await this.instaPersonalRepo.getAccountInfo().then((accInfo) => {
      this.accountInfo = accInfo[0];
    });
    await this.instaPersonalRepo.getProfessionalInfo().then((proInfo) => {
      this.professionalInfo = proInfo[0];
    });
    await this.instaPersonalRepo.getProfileChanges().then((changes) => {
      this.profileChanges = changes;
      this.listOfProfileChanges = [...this.profileChanges];
      console.log(this.listOfProfileChanges);
    });
  }
}
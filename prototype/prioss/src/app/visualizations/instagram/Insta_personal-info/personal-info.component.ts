import { AfterViewInit, Component, Input, } from '@angular/core';
import { Router } from '@angular/router';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { InstaPersonalRepository } from 'src/app/db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import { InstaPersonalInfo } from 'src/app/models/Instagram/PersonalInfo/InstaPersonalInfo';
import { InstaAccountInfo } from 'src/app/models/Instagram/PersonalInfo/InstaAccountInfo';
import { InstaProfessionalInfo } from 'src/app/models/Instagram/PersonalInfo/InstaProfessionalInfo';
import { InstaProfileChange } from 'src/app/models/Instagram/PersonalInfo/InstaProfileChange';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';



/**
  * This component is the visualization component on instagram's dashboard page.
  * This page is shown when the user clicks on the personal information card on instagram's dashboard.
  *
  * @author: Aayushma & Paul (aayushma@uni-paderborn.de & pasch@mail.upb.de)
  */
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.less']
})

export class Insta_PersonalInfoComponent extends SequenceComponentInit implements AfterViewInit{
  @Input()
  previewMode = false;

  personalInfo: InstaPersonalInfo;
  accountInfo: InstaAccountInfo;
  professionalInfo: InstaProfessionalInfo;
  profileChanges: InstaProfileChange[] = [];

  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  capitalizeAndPrettify: (str: string) => string = utilities.capitalizeAndPrettify;

  constructor(private router: Router, private instaPersonalRepo: InstaPersonalRepository) {
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
  * @author: Paul (pasch@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 0: PersonalInfo");

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
    });
  }

 /** 
  * This method is responsible to navigate to guidelines to make Instagram Account Private.
  *
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */

 handleButtonClick1(){
  this.router.navigate(['insta/account-private']);
}

 /** 
  * This method is responsible to navigate to guidelines to make Instagram account's profile information private.
  *
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */

handleButtonClick2(){
  this.router.navigate(['insta/profile-info-private']);
}

}


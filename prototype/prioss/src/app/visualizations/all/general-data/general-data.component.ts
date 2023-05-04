import {Component, Input} from '@angular/core';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { UserdataRepository } from 'src/app/db/data-repositories/general/userdata/userdata.repository';
import { UserdataEntry } from 'src/app/models/General/userdata/userdataEntry';

/**
  * This component visualizes the general data of the user.
  * The data is displayed in a table format that is automatically generated based on the available data
  *
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */
@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.less']
})
export class GeneralDataComponent {

  // userdata: object = {}
  userdata: readonly UserdataEntry[] = [];
  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
  getObjectPairsNotNull: (obj: object) => [string, any][] = utilities.getObjectPairsNotNull
  capitalize: (str: string) => string = utilities.capitalize
  isSpotify = false;
  @Input()
  previewMode: boolean = false;

  constructor(private userdataRepo: UserdataRepository) {
    if (window.location.href.includes('/spot/')) {
      this.isSpotify = true;
    }
    
    this.userdataRepo.getAllUserdata().then((userdata) => {
      this.userdata = userdata;
    });
  }
  
}

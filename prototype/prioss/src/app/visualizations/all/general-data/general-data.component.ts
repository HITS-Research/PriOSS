import {Component, Input} from '@angular/core';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { UserdataRepository } from 'src/app/db/data-repositories/general/userdata/userdata.repository';
import { UserdataEntry } from 'src/app/models/General/userdata/userdataEntry';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';

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
export class GeneralDataComponent extends SequenceComponentInit {


  // userdata: object = {}
  userdata: readonly UserdataEntry[] = [];
  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
  getObjectPairsNotNull: (obj: object) => [string, any][] = utilities.getObjectPairsNotNull
  capitalize: (str: string) => string = utilities.capitalize
  isSpotify = false;
  @Input()
  previewMode: boolean = false;

  constructor(private userdataRepo: UserdataRepository) {
    super();

    if (window.location.href.includes('/spot/')) {
      this.isSpotify = true;
    }    
  }

/**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  ngAfterViewInit()
  {
    console.log("--- Preview Mode: " + this.previewMode);
    if(!this.previewMode) {
      
      this.initComponent();
    }
  }

/**
  * @see-super-class
  * @author: Simon (scg@mail.upb.de) 
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 0: GeneralData");
    let userdata = await this.userdataRepo.getAllUserdata()
    this.userdata = userdata;
  }
}

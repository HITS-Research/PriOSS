import {AfterViewInit, Component, Input} from '@angular/core';
import * as utilities from 'src/app/features/utils/generalUtilities.functions'
import { UserdataRepository } from 'src/app/db/data-repositories/general/userdata/userdata.repository';
import { UserdataEntry } from 'src/app/framework/models/userdata/userdataEntry';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';

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
export class GeneralDataComponent extends SequenceComponentInit implements AfterViewInit{
  userdata: UserdataEntry;
  getObjectPairsNotNull: (obj: object) => [string, any][] = utilities.getObjectPairsNotNull
  capitalize: (str: string) => string = utilities.capitalize
  @Input()
  previewMode = false;

  constructor(private userdataRepo: UserdataRepository) {
    super();
    this.initComponent();
  }

/**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  ngAfterViewInit()
  {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

/**
  * @see-super-class
  * @author: Simon (scg@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    const userdata = await this.userdataRepo.getAllUserdata()
    this.userdata = userdata[0];
  }
}

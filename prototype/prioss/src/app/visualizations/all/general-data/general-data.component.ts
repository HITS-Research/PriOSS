import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as utilities from 'src/app/utilities/generalUtilities.functions'

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

  userdata: object = {}
  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;

  constructor(private dbService: NgxIndexedDBService)
  {

    this.dbService.getAll('all/userdata').subscribe((userdata: any) =>
    {
        this.userdata = userdata[0];
        console.log(this.userdata)
    });
  }

  /**
   * This method returns a database object (key-value pair) as two entries in an array.
   * Pairs with null values are excluded
   *
   *
   * @author: Jonathan (jvn@mail.upb.de)
   *
   */
  getObjectPairsNotNull(obj: object): [string, any][] {
    return this.getObjectPairs(obj).filter( ([_, v]) => v != null );
  }

  /**
  * This method capitalizes the first letter of a string.
  * used to capitalize the (non-capitalized) database entries (e.g. email -> Email)
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

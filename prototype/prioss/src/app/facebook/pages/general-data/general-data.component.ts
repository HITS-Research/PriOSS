import { AfterViewInit, Component, Input } from '@angular/core';
import * as utilities from 'src/app/features/utils/generalUtilities.functions';
import { UserdataEntry } from 'src/app/framework/models/userdata/userdataEntry';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { Store } from '@ngxs/store';
import { FacebookState } from '../../state/fb.state';
import { FbUserDataModel } from '../../state/models';
import { PrimaryLocationModel, PrimaryPublicLocationModel, ProfileInformationModel } from '../../models';

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
  styleUrls: ['./general-data.component.less'],
})
export class GeneralDataComponent
  extends SequenceComponentInit
  implements AfterViewInit
{
  userdata: UserdataEntry;
  getObjectPairsNotNull: (obj: object) => [string, any][] =
    utilities.getObjectPairsNotNull;
  capitalize: (str: string) => string = utilities.capitalize;
  @Input()
  previewMode = false;

  constructor(private store: Store) {
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
    console.debug('--- Initializing Component 0: GeneralData');
    const userdata: FbUserDataModel = await this.store.selectSnapshot(FacebookState.getFacebookUserData);
    const profileInfo: ProfileInformationModel = userdata.personal_information.profile_information;
    const locationInfo: PrimaryLocationModel = userdata.logged_information.primary_location;
    const primary_public_location: PrimaryPublicLocationModel = userdata.logged_information.primary_public_location;
    const creation_date = new Date(profileInfo?.profile_v2.registration_timestamp);
    const bdate: string = profileInfo?.profile_v2.birthday.year.toString()??'0000' + '-' + profileInfo?.profile_v2.birthday.month.toString()??'00' + '-' + profileInfo?.profile_v2.birthday.day.toString()??'00';
    this.userdata = {
      email: profileInfo?.profile_v2.emails.emails.join(' ')??'Not available',
      username: profileInfo.profile_v2.name.full_name??'Not available',
      gender: profileInfo?.profile_v2.gender.gender_option??'Not available',
      mobileNumber: profileInfo?.profile_v2.phone_numbers.at(0)?.phone_number??'Not available',
      birthdate: bdate??'Not available',
      country: primary_public_location?.primary_public_location_v2.country??'Not available',
      postalCode: locationInfo?.primary_location_v2.zipcode.at(0)??'Not available',
      mobileOperator: userdata.logged_information.device_location?.phone_number_location_v2.at(0)?.spn??'Not available',
      mobileBrand: userdata.security_and_login_information?.mobile_devices?.devices_v2.at(0)?.type.replace(/,[0-9]+/, '')??'Not available',
      creationTime: creation_date.toDateString()
    }
}
}

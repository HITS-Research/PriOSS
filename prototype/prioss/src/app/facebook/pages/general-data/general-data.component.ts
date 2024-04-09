import { AfterViewInit, Component, Input, ChangeDetectionStrategy} from '@angular/core';
import * as utilities from 'src/app/features/utils/generalUtilities.functions';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralDataComponent extends SequenceComponentInit implements AfterViewInit
{
  profileInfoAvailable = false;
  educationInfoAvailable = false;
  workInfoAvailable = false;
  relationshipInfoAvailable = false;
  familyInfoAvailable = false;
  userdata: FbUserDataModel;
  profileInfo: ProfileInformationModel;
  locationInfo: PrimaryLocationModel;
  primary_public_location: PrimaryPublicLocationModel;
  creation_date: Date;
  birthdate: string;
  name: string;
  emails: string;
  previous_emails: string;
  ad_account_emails: string;
  gender: string;
  pronoun: string;
  phone_numbers: string;
  current_relationship_since: number;
  current_relationship_status: string;
  current_relationship_partner: string;
  previous_relationships: string[];
  family_members: {
    name: string;
    relation: string;
    timestamp: number;
  }[];



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

    this.userdata = await this.store.selectSnapshot(FacebookState.getFacebookUserData);
    
    this.profileInfoAvailable = this.userdata.personal_information.profile_information !== undefined;
    this.profileInfo = this.userdata.personal_information.profile_information;
    this.locationInfo = this.userdata.logged_information.primary_location;
    this.primary_public_location = this.userdata.logged_information.primary_public_location;
    this.creation_date = new Date(this.profileInfo?.profile_v2.registration_timestamp);
    this.birthdate = this.profileInfo?.profile_v2.birthday.year.toString()??'0000' + '-' + this.profileInfo?.profile_v2.birthday.month.toString()??'00' + '-' + this.profileInfo?.profile_v2.birthday.day.toString()??'00';
    
    
    // this.userdata = {
    //   email: profileInfo?.profile_v2.emails.emails.join(' ')??'Not available',
    //   username: profileInfo.profile_v2.name.full_name??'Not available',
    //   gender: profileInfo?.profile_v2.gender.gender_option??'Not available',
    //   mobileNumber: profileInfo?.profile_v2.phone_numbers.at(0)?.phone_number??'Not available',
    //   birthdate: bdate??'Not available',
    //   country: primary_public_location?.primary_public_location_v2.country??'Not available',
    //   postalCode: locationInfo?.primary_location_v2.zipcode.at(0)??'Not available',
    //   mobileOperator: userdata.logged_information.device_location?.phone_number_location_v2.at(0)?.spn??'Not available',
    //   mobileBrand: userdata.security_and_login_information?.mobile_devices?.devices_v2.at(0)?.type.replace(/,[0-9]+/, '')??'Not available',
    //   creationTime: creation_date.toDateString()
    // }
}
}

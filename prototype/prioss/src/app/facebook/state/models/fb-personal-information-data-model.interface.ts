import {
  AccountsCenterModel,
  AddressBookModel,
  AvatarModel,
  MetaAvatarPostBackgroundModel,
  ProfileInformationModel,
  ProfileUpdateModel,
  ProfileInformationTimezoneModel,
} from '../../models';
export default interface FbPersonalInformationDataModelInterface {
  facebook_accounts_center: AccountsCenterModel;
  address_books: AddressBookModel;
  avatar: AvatarModel;
  meta_avatar_post_backgrounds: MetaAvatarPostBackgroundModel;
  profile_information: ProfileInformationModel;
  profile_update_history: ProfileUpdateModel;
  timezone: ProfileInformationTimezoneModel;
}

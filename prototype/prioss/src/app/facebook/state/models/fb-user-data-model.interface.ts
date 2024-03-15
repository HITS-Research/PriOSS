import {
  FbSecurityLoginInformationDataModel,
  FbPreferencesDataModel,
  FbPersonalInformationDataModel,
  FbAppsAndWebsitesOffOfFacebookDataModel,
  FbAdsInformationModel,
  FbLoggedInformationModel,
  FbActivityAcrossFacebookModel,
  FbConnectionsDataModel
} from '.';

export default interface FbUserDataModel {
  activity_across_facebook: FbActivityAcrossFacebookModel;
  ads_and_businesses: FbAdsInformationModel;
  logged_information: FbLoggedInformationModel;
  personal_information: FbPersonalInformationDataModel;
  preferences: FbPreferencesDataModel;
  security_and_login_information: FbSecurityLoginInformationDataModel;
  apps_and_websites_off_of_fb: FbAppsAndWebsitesOffOfFacebookDataModel;
  connections: FbConnectionsDataModel;
}

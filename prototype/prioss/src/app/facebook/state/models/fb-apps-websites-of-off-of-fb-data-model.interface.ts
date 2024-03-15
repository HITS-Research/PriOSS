import {
  ConnectedAppsAndWebsitesModel,
  OffFacebookActivityModel,
  OffFacebookActivitySettingsModel,
} from '../../models';
export default interface FbAppsAndWebsitesOffOfFbDataModel {
  connectedAppsAndWebsites: ConnectedAppsAndWebsitesModel;
  offFacebookActivity: OffFacebookActivityModel;
  offFacebookActivitySettings: OffFacebookActivitySettingsModel;
}

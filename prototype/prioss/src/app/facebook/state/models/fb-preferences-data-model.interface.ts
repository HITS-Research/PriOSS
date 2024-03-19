import {
  PeopleAndFriendsModel,
  FeedControlModel,
  DevicePushSettingsModel,
  FundraiserSettingsModel,
  LanguageAndLocalesModel,
  ReelsPreferencesModel,
  VideoPreferenceModel,
} from '../../models';
export default interface FbPreferencesDataModelInterface {
  feed: PeopleAndFriendsModel;
  feedControls: FeedControlModel;
  devicePushSettings: DevicePushSettingsModel;
  fundraiserSettings: FundraiserSettingsModel;
  languageAndLocales: LanguageAndLocalesModel;
  reelsPreferences: ReelsPreferencesModel;
  videoPreferences: VideoPreferenceModel;
}

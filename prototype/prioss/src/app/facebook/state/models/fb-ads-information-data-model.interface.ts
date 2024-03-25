import {
  AdPreferencesModel,
  AdvertiserInteractedModel,
  AdvertisersUsingYourDataModel,
  OtherCategoriesUsedToReachYouModel,
  RecentReportedConversionsModel,
  SubscriptionForNoAdsModel as SubscriptionsForNoAdsModel,
} from '../../models';
export default interface FbAdsInformationModel {
  //TODO add models from facebook/models/adsInformation
  adPreferences: AdPreferencesModel;
  advertiserInteracted: AdvertiserInteractedModel;
  advertisersUsingYourData: AdvertisersUsingYourDataModel;
  otherCategoriesUsedToReachYou: OtherCategoriesUsedToReachYouModel;
  recentReportedConversions: RecentReportedConversionsModel;
  subscriptionsForNoAds: SubscriptionsForNoAdsModel;
}

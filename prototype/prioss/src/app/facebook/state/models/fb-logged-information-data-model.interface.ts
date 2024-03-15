import {
  EventInteractionModel,
  PeopleInteractionModel,
  RecentlyVisitedModel,
  RecentlyViewedModel,
  SurveyResponseModel,
  DeviceLocationModel,
  PrimaryLocationModel,
  PrimaryPublicLocationModel,
  LocationTimezoneModel,
  NotificationMetaPrivacyPolicyUpdateModel,
  NotificationModel,
  AdsInterestModel,
  ConsentModel,
  SearchHistoryModel,
  InferredTopicsModel,
  GroupInteractionModel,
} from '../../models';
export default interface FbLoggedInformationDataModelInterface {
  inferred_topics: InferredTopicsModel;
  group_interaction: GroupInteractionModel;
  event_interaction: EventInteractionModel;
  people_interaction: PeopleInteractionModel;
  recently_viewed: RecentlyViewedModel;
  recently_visited: RecentlyVisitedModel;
  survey_responses: SurveyResponseModel;
  device_location: DeviceLocationModel;
  primary_location: PrimaryLocationModel;
  primary_public_location: PrimaryPublicLocationModel;
  timezone: LocationTimezoneModel;
  meta_privacy_policy_update: NotificationMetaPrivacyPolicyUpdateModel;
  notifications: NotificationModel;
  ads_interest: AdsInterestModel;
  consents: ConsentModel;
  search_history: SearchHistoryModel;
}

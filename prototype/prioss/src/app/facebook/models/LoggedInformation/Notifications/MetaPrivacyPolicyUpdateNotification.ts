/**{
  "notification_meta_privacy_policy_update": [
    {
      "impression_time": 1685178006,
      "consent_state": 1
    },
    {
      "impression_time": 1661443821,
      "consent_state": 2
    }
  ]
} */

export interface NotificationMetaPrivacyPolicyUpdateModel {
  notification_meta_privacy_policy_update: NotificationMetaPrivacyPolicyUpdateItem[];
}
export interface NotificationMetaPrivacyPolicyUpdateItem {
  impression_time: number;
  consent_state: number;
}

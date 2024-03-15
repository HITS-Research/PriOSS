/**
 * Same as ../adsInteracted.ts
 * {
  "history_v2": [
    {
      "title": "https://pummys.com/collections/winterschuhe",
      "action": "Klick auf Werbeanzeige",
      "timestamp": 1702742911
    },
  ]
}
 */
export interface AdvertiserInteractedModel {
  history_v2: AdvertiserInteractedItem[];
}
export interface AdvertiserInteractedItem {
  title: string;
  action: string;
  timestamp: number;
}

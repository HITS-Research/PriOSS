/**
{
    "off_facebook_activity_v2": [
      {
        "name": "ebay.de",
        "events": [
          {
            "id": 111111111111111,
            "type": "PURCHASE",
            "timestamp": 1698272460
          },
          {
            "id": 111111111111111,
            "type": "PAGE_VIEW",
            "timestamp": 1683822120
          },
          {
            "id": 111111111111111,
            "type": "CUSTOM",
            "timestamp": 1651742760
          }
        ]
      }
    ]
  } 
  */
export interface OffFacebookActivityModel {
  off_facebook_activity_v2?: OffFacebookActivityItem[];
}
export interface OffFacebookActivityItem {
  name: string;
  events: Events[];
}
export interface Events {
  id: number;
  type: string;
  timestamp: number;
}

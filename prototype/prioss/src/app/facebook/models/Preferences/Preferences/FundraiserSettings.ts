/**{
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Gesendete Benachrichtigungen",
      "vec": [
        {
          "dict": [
            {
              "label": "notif_type",
              "value": "user_fundraiser_creation_top_friends"
            },
            {
              "label": "timestamp",
              "timestamp_value": 1676195727
            }
          ]
        }
      ]
    },
    {
      "label": "Benachrichtigungslevel"
    },
    {
      "label": "Zeitpunkt des letzten Geburtstagsgeschenks",
      "timestamp_value": 0
    }
  ]
} */
export interface FundraiserSettingsModel {
  media: any[];
  label_values: {
    label: string;
    vec?: {
      dict: {
        label: string;
        value: string;
        timestamp_value?: number;
      }[];
    }[];
    timestamp_value?: number;
  }[];
}

/**[
  {
    "media": [
      
    ],
    "label_values": [
      {
        "label": "Application name",
        "value": "News Feed"
      },
      {
        "label": "Anzahl der Aufrufe (letzte 7\u00c2\u00a0Tage)",
        "value": "0"
      }
    ]
  },
  {
    "media": [
      
    ],
    "label_values": [
      {
        "label": "Application name",
        "value": "Benachrichtigungen"
      },
      {
        "label": "Anzahl der Aufrufe (letzte 7\u00c2\u00a0Tage)",
        "value": "0"
      }
    ]
  }
] */
export interface NavigationbarActivityModel {
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  value: string;
}

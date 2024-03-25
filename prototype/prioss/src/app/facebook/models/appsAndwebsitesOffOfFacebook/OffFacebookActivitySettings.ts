/**{
    "timestamp": 1699489293,
    "media": [
      
    ],
    "label_values": [
      {
        "label": "Status der Kontozuordnung"
      },
        {
        "label": "Zeitpunkt der letzten Aktivit\u00c3\u00a4t",
        "timestamp_value": 0
        },
        {
        "label": "So oft wurden diese Privatsph\u00c3\u00a4re-Einstellungen insgesamt angewendet",
        "value": "0"
        }
    ]
} */
export interface OffFacebookActivitySettingsModel {
  timestamp: number;
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  timestamp_value?: number;
  value?: string;
}

/**{
    "timestamp": 1573411873,
    "media": [
      
    ],
    "label_values": [
      {
        "label": "Zeitpunkt des letzten Tab-Besuchs",
        "timestamp_value": 1573411873
      },
      {
        "label": "Anzahl der Male, die du auf einen Tab geklickt hast",
        "vec": [
          {
            "timestamp_value": 1573411873
          }
        ]
      },
      {
        "label": "Zeitpunkt, zu dem du das letzte Mal die Facebook Gaming-App genutzt hast",
        "timestamp_value": 1573501595
      },
      {
        "label": "Die aktuelle Anzahl an aufeinanderfolgenden Tagen, an denen du die Facebook Gaming-App genutzt hast",
        "value": "1"
      },
    ]
} */
export interface GamingBookmarkAndAppSettingsModel {
  timestamp: number;
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  timestamp_value?: number;
  value?: string;
  vec?: VecItem[];
}
export interface VecItem {
  timestamp_value: number;
}

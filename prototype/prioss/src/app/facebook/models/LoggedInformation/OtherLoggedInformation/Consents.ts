/**{
    "timestamp": 1519690674,
    "media": [
      
    ],
    "label_values": [
      {
        "label": "Einwilligung in die Verarbeitung von Nutzerdaten durch Werbepartner"
      }
    ]
  } */
export interface ConsentModel {
  timestamp: number;
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
}

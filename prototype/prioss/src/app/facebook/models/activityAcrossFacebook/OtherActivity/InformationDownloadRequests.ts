/**{
  "timestamp": 1701198587,
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Beginn des Datumsbereichs",
      "timestamp_value": 1072911600
    },
    {
      "label": "Ende des Datumsbereichs",
      "timestamp_value": 1701198526
    },
    {
      "label": "Kategorien",
      "vec": [
        
      ]
    }
  ]
} */
export interface InformationDownloadRequestsModel {
  timestamp: number;
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  timestamp_value?: number;
  vec?: VecItem[];
}
export interface VecItem {
  timestamp_value: number;
}

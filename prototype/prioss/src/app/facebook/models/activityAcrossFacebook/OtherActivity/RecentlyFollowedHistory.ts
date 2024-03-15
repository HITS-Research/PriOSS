/**{
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Konten, denen du seit Kurzem folgst, und das Datum, an dem du ihnen gefolgt bist",
      "vec": [
        {
          "dict": [
            {
              "label": "Gefolgtes Konto",
              "value": "Altes F\u00c3\u00a4hrhaus Unna"
            },
            {
              "label": "Gefolgt seit",
              "value": "Mar-24-2022"
            }
          ]
        },
        {
          "dict": [
            {
              "label": "Gefolgtes Konto",
              "value": "Hey Cheeky"
            },
            {
              "label": "Gefolgt seit",
              "value": "Aug-11-2021"
            }
          ]
        }
      ]
    }
  ]
} */
export interface RecentlyFollowedHistoryModel {
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  vec: VecItem[];
}
export interface VecItem {
  dict: DictItem[];
}
export interface DictItem {
  label: string;
  value: string;
}

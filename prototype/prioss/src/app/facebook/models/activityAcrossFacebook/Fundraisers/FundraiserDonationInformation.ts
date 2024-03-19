/**{
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Die Male, die du bei Spendenaufrufen etwas gespendet hast",
      "value": "0"
    }
  ]
} */

export interface FundraisersModel {
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  value: string;
}

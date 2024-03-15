/**{
  "controls": [
    {
      "name": "Mehr davon anzeigen",
      "description": "Damit hast du festgelegt, von welchen Inhalten du auf Facebook mehr sehen m\u00c3\u00b6chtest",
      "entries": [
        
      ]
    },
    {
      "name": "Weniger davon anzeigen",
      "description": "Damit hast du festgelegt, von welchen Inhalten du auf Facebook weniger sehen m\u00c3\u00b6chtest",
      "entries": [
        
      ]
    }
  ]
} */
export interface FeedControlModel {
  controls: ControlsItem[];
}
export interface ControlsItem {
  name: string;
  description: string;
  entries: ControlsEntry[];
}
export interface ControlsEntry {
  timestamp: number;
  data: ControlsData;
}
export interface ControlsData {
  name: string;
  uri: string;
}

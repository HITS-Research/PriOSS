/**{
  "events_interactions_v2": [
    {
      "name": "",
      "description": "",
      "entries": [
        {
          "timestamp": 1547880887,
          "data": {
            "value": "6"
          }
        }
      ]
    }
  ]
} */
export interface EventInteractionModel {
  events_interactions_v2: EventInteractionItem[];
}
export interface EventInteractionItem {
  name: string;
  description: string;
  entries: EventInteractionEntry[];
}
export interface EventInteractionEntry {
  timestamp: number;
  data: EventInteractionData;
}
export interface EventInteractionData {
  value: string;
}

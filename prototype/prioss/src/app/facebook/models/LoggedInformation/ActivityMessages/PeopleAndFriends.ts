/**{
  "people_interactions_v2": [
    {
      "name": "",
      "description": "",
      "entries": [
        {
          "timestamp": 1633170065,
          "data": {
            "name": "Alina Schmidt",
            "uri": "https://www.facebook.com/redacted"
          }
        }
      ]
    }
  ]
} */
export interface PeopleInteractionModel {
  people_interactions_v2: PeopleInteractionItem[];
}
export interface PeopleInteractionItem {
  name: string;
  description: string;
  entries: PeopleInteractionEntry[];
}
export interface PeopleInteractionEntry {
  timestamp: number;
  data: PeopleInteractionData;
}
export interface PeopleInteractionData {
  name: string;
  uri: string;
}

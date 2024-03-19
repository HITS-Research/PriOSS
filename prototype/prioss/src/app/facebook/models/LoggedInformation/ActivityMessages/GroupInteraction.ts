/**{
  {
    "group_interactions_v2": [
      {
        "name": "",
        "description": "",
        "entries": [
          {
            "data": {
              "name": "English Literature Lovers",
              "value": "45 times",
              "uri": "https://www.facebook.com/groups/englishlitlovers/"
            }
          },
        }
      ]
    }
  ]
} */
export interface GroupInteractionModel {
  group_interactions_v2: GroupInteractionItem[];
}
export interface GroupInteractionItem {
  name: string;
  description: string;
  entries: GroupInteractionEntry[];
}
export interface GroupInteractionEntry {
  data: GroupInteractionData;
}
export interface GroupInteractionData {
  name: string;
  value: string;
  uri: string;
}

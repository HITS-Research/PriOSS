/**{
    "groups_admined_v2": [
      {
        "name": "redacted",
        "timestamp": 1346441575
      }
    ]
  } */
export interface GroupsAdminedModel {
  groups_admined_v2: GroupsAdminedItem[];
}
export interface GroupsAdminedItem {
  name: string;
  timestamp: number;
}

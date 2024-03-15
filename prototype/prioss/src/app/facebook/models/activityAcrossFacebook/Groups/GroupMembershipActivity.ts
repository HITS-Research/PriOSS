/**{
    "groups_joined_v2": [
      {
        "timestamp": 1310471835,
        "data": [
          {
            "name": "redacted"
          }
        ],
        "title": "redacted"
      },
    ]
} */
export interface GroupsJoinedModel {
  groups_joined_v2: GroupsJoinedItem[];
}
export interface GroupsJoinedItem {
  timestamp: number;
  data: GroupsJoinedData[];
  title: string;
}
export interface GroupsJoinedData {
  name: string;
}

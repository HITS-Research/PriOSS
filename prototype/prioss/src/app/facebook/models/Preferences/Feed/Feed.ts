/**{
  "people_and_friends_v2": [
    {
      "name": "Nicht mehr folgen",
      "description": "Freunde, Seiten und Gruppen, denen du nicht mehr folgst und deren Beitr\u00c3\u00a4ge dir nicht mehr angezeigt werden.",
      "entries": [
        {
          "timestamp": 1647579196,
          "data": {
            "name": "Kantine West",
            "uri": "https://www.facebook.com/redacted"
          }
        }
      ]
    }
  ]
} */
export interface PeopleAndFriendsModel {
  people_and_friends_v2: PeopleAndFriendsItem[];
}
export interface PeopleAndFriendsItem {
  name: string;
  description: string;
  entries: PeopleAndFriendsEntry[];
}
export interface PeopleAndFriendsEntry {
  timestamp: number;
  data: PeopleAndFriendsData;
}
export interface PeopleAndFriendsData {
  name: string;
  uri: string;
}

/**{
  "pages_unfollowed_v2": [
    {
      "timestamp": 1647579196,
      "data": [
        {
          "name": "Kantine West"
        }
      ],
      "title": "Kantine West"
    }
  ]
} */
export interface PagesUnfollowedModel {
  pages_unfollowed_v2: PagesUnfollowedItem[];
}
export interface PagesUnfollowedItem {
  timestamp: number;
  data: PagesUnfollowedData[];
  title: string;
}
export interface PagesUnfollowedData {
  name: string;
}

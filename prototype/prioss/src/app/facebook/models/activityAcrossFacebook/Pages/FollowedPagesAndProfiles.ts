/**{
  "pages_followed_v2": [
    {
      "timestamp": 1272563896,
      "data": [
        {
          "name": "M\u00c3\u00bcnster"
        }
      ],
      "title": "M\u00c3\u00bcnster"
    }
  ]
} */
export interface PagesFollowedModel {
  pages_followed_v2: PagesFollowedItem[];
}
export interface PagesFollowedItem {
  timestamp: number;
  data: PagesFollowedData[];
  title: string;
}
export interface PagesFollowedData {
  name: string;
}

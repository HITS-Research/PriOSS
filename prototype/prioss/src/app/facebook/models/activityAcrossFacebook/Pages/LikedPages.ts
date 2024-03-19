/**{
  "page_likes_v2": [
    {
      "name": "Altes F\u00c3\u00a4hrhaus Unna",
      "timestamp": 1648153032,
      "url": "https://www.facebook.com/redacted"
    },
    {
      "name": "Hey Cheeky",
      "timestamp": 1628711377,
      "url": "https://www.facebook.com/redacted"
    }
  ]
} */
export interface PageLikesModel {
  page_likes_v2: PageLikesItem[];
}
export interface PageLikesItem {
  name: string;
  timestamp: number;
  url: string;
}

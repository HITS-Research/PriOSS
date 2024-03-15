/**{
  "visited_things_v2": [
    {
      "name": "Profilaufrufe",
      "description": "Personen, deren Profile du dir angesehen hast",
      "entries": [
        {
          "timestamp": 1702745596,
          "data": {
            "name": "Nachdenkliche Spr\u00c3\u00bcche mit Bilder",
            "uri": "https://www.facebook.com/redacted"
          }
        },
        {
          "timestamp": 1702045611,
          "data": {
            "name": "Residenz Club",
            "uri": "https://www.facebook.com/redacted"
          }
        }
      ]
    },
    "name": "Marketplace-Besuche",
      "description": "Wann du den Marketplace besucht hast",
      "entries": [
        {
          "data": {
            "value": "16.12.2023"
          }
        },
        {
          "data": {
            "value": "12.12.2021"
          }
        },
  ]
} */
export interface RecentlyVisitedModel {
  visited_things_v2: RecentlyVisitedItem[];
}
export interface RecentlyVisitedItem {
  name: string;
  description: string;
  entries: RecentlyVisitedEntry[];
}
export interface RecentlyVisitedEntry {
  timestamp?: number;
  data: RecentlyVisitedData;
}
export interface RecentlyVisitedData {
  name?: string;
  uri?: string;
  value?: string;
}

/**{
    "items_selling_v2": [
      {
        "title": "test",
        "price": "KOSTENLOS",
        "seller": "Marcia Husen",
        "created_timestamp": 1702745144,
        "category": "Schmuck und Accessoires",
        "marketplace": "Germany Marketplace",
        "location": {
          "coordinate": {
            "latitude": 47.9833,
            "longitude": 7.85
          }
        },
        "description": "a"
      }
    ]
  } */
export interface ItemsSoldModel {
  items_selling_v2: ItemsSoldItem[];
}
export interface ItemsSoldItem {
  title: string;
  price: string;
  seller: string;
  created_timestamp: number;
  category: string;
  marketplace: string;
  location: Location;
  description: string;
}
export interface Location {
  coordinate: Coordinate;
}
export interface Coordinate {
  latitude: number;
  longitude: number;
}

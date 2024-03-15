/**{
  "primary_location_v2": {
    "city_region_pairs": [
      [
        "Unna",
        "Nordrhein-Westfalen"
      ]
    ],
    "zipcode": [
      "59073"
    ]
  }
} */
export interface PrimaryLocationModel {
  primary_location_v2: PrimaryLocation;
}
export interface PrimaryLocation {
  city_region_pairs: string[][];
  zipcode: string[];
}

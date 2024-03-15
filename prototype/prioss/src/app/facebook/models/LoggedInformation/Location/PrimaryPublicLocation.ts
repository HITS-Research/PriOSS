/**{
  "primary_public_location_v2": {
    "city": "Berlin",
    "region": "Berlin",
    "country": "Deutschland"
  }
} */

export interface PrimaryPublicLocationModel {
  primary_public_location_v2: PrimaryPublicLocation;
}
export interface PrimaryPublicLocation {
  city: string;
  region: string;
  country: string;
}

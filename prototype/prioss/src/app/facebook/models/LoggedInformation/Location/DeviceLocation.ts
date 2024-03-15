/**{
    "phone_number_location_v2": [
      {
        "spn": "Vodafone D2",
        "country_code": "262"
      },
      {
        "spn": "Vodafone D2",
        "country_code": "262"
      }
    ]
  } */
export interface DeviceLocationModel {
  phone_number_location_v2: DeviceLocationItem[];
}
export interface DeviceLocationItem {
  spn: string;
  country_code: string;
}

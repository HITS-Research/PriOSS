/**
 * {
 *    "custom_audiences_all_types_v2": [
 *      {
 *        "advertiser_name": "redacted",
 *        "has_data_file_custom_audience": true,
 *        "has_remarketing_custom_audience": true,
 *        "has_in_person_store_visit": false
 *      }
 * }
 */
export interface AdvertisersUsingYourDataModel {
  custom_audiences_all_types_v2: AdvertisersUsingYourDataItem[];
}
export interface AdvertisersUsingYourDataItem {
  advertiser_name: string;
  has_data_file_custom_audience: boolean;
  has_remarketing_custom_audience: boolean;
  has_in_person_store_visit: boolean;
}

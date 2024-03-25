/**
{
  "devices_v2": [
    {
      "type": "iPhone14,7",
      "os": "iPhone OS 17.1.2",
      "update_time": 1701950418,
      "advertiser_id": "cc85f4af-044e-42ce-a142-e58fae9a3cbf",
      "redact_tokens": [
        "2a10********************"
      ],
      "push_tokens": [
        {
          "disabled": false,
          "client_update_time": 1660059074,
          "creation_time": 1634843200,
          "app_version": "378.0.0.37.107",
          "locale": "de_DE",
          "os_version": "15.6",
          "token": "2a10********************",
          "device_id": "FFBF2C92-1AC5-4802-AEC9-A699BA4BEC03"
        }
      ],
      "family_device_id": "582255B0****************************",
      "device_locale": "de_DE"
    }
  ]
}
*/
export interface MobileDeviceModel {
  devices_v2: DeviceItem[];
}
export interface DeviceItem {
  type: string;
  os: string;
  update_time: number;
  advertiser_id: string;
  redact_tokens: string[];
  push_tokens: PushToken[];
  family_device_id: string;
  device_locale: string;
}
export interface PushToken {
  disabled: boolean;
  client_update_time: number;
  creation_time: number;
  app_version: string;
  locale: string;
  os_version: string;
  token: string;
  device_id: string;
}

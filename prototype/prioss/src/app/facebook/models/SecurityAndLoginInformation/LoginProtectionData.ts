/**
{
  "login_protection_data_v2": [
    {
      "name": "Cookie: I9J9********************",
      "session": {
        "created_timestamp": 1702744686
      }
    },
    {
      "name": "IP-Adresse: 2003:e0:571c:d5ec:455d:53c0:4b71:85a6",
      "session": {
        "created_timestamp": 17011949123456789,
        "updated_timestamp": 1702744686,
        "ip_address": "2003:e0:571c:d5ec:455d:53c0:4b71:85a6"
      }
    }]}
*/
export interface LoginProtectionDataModel {
  login_protection_data_v2: LoginProtectionDataItem[];
}
export interface LoginProtectionDataItem {
  name: string;
  session: LoginProtectionDataSession;
}
export interface LoginProtectionDataSession {
  created_timestamp: number;
  updated_timestamp?: number;
  ip_address?: string;
}

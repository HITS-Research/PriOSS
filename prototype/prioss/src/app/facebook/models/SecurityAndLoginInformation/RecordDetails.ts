/**
{
  "admin_records_v2": [
    {
      "event": "Password Change",
      "session": {
        "created_timestamp": 1607353147,
        "ip_address": "109.41.130.183",
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
        "datr_cookie": "tIu5********************"
      },
      "extra_info": {
        "old_name": "",
        "new_name": "",
        "old_number": "",
        "old_vanity": "",
        "new_vanity": "",
        "old_email": "",
        "new_email": "+49123456789",
        "new_number": ""
      }
    },
    {
      "event": "Remove Profile Photo",
      "session": {
        "created_timestamp": 1398149123456789,
        "ip_address": "46.223.1.86",
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167 [FBAN/FBIOS;FBAV/9.0.0.25.31;FBBV/2102024;FBDV/iPhone6,2;FBMD/iPhone;FBSN/iPhone OS;FBSV/7.1;FBSS/2; FBCR/Vodafone.de;FBID/phone;FBLC/de_DE;FBOP/5]",
        "datr_cookie": ""
      }
    },
    {
      "event": "Add Phone Number",
      "session": {
        "created_timestamp": 1390636068,
        "ip_address": "46.223.1.84",
        "user_agent": "",
        "datr_cookie": ""
      }
    },
    {
      "event": "Email change",
      "session": {
        "created_timestamp": 1390636067,
        "ip_address": "46.223.1.84",
        "user_agent": "",
        "datr_cookie": ""
      }
    },
    {
      "event": "Add Phone Number",
      "session": {
        "created_timestamp": 1384519842,
        "ip_address": "46.223.1.33",
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 [FBAN/MessengerForiOS;FBAV/3.0;FBBV/605693;FBDV/iPhone4,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/7.0;FBSS/2; FBCR/Vodafone.de;FBID/phone;FBLC/de_DE;FBOP/1]",
        "datr_cookie": ""
      },
      "extra_info": {
        "old_name": "",
        "new_name": "",
        "old_number": "",
        "old_vanity": "",
        "new_vanity": "",
        "old_email": "",
        "new_email": "",
        "new_number": "49123456789"
      }
    },
    {
      "event": "Email change",
      "session": {
        "created_timestamp": 1384519842,
        "ip_address": "46.223.1.33",
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 [FBAN/MessengerForiOS;FBAV/3.0;FBBV/605693;FBDV/iPhone4,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/7.0;FBSS/2; FBCR/Vodafone.de;FBID/phone;FBLC/de_DE;FBOP/1]",
        "datr_cookie": ""
      },
      "extra_info": {
        "old_name": "",
        "new_name": "",
        "old_number": "",
        "old_vanity": "",
        "new_vanity": "",
        "old_email": "",
        "new_email": "49123456789",
        "new_number": ""
      }
    },
    {
      "event": "Username",
      "session": {
        "created_timestamp": 1335273740,
        "user_agent": "",
        "datr_cookie": ""
      },
      "extra_info": {
        "old_name": "",
        "new_name": "",
        "old_number": "",
        "old_vanity": "",
        "new_vanity": "marcia.husen.5",
        "old_email": "",
        "new_email": "",
        "new_number": ""
      }
    },
    {
      "event": "Checkpoint completed",
      "session": {
        "created_timestamp": 1309201459,
        "ip_address": "109.192.60.19",
        "user_agent": "",
        "datr_cookie": ""
      }
    },
    {
      "event": "Checkpoint",
      "session": {
        "created_timestamp": 1309201379,
        "user_agent": "",
        "datr_cookie": ""
      }
    }
  ]
}
*/
export interface AdminRecordsModel {
  admin_records_v2: AdminRecordsItem[];
}
export interface AdminRecordsItem {
  event: string;
  session: AdminRecordsSession;
  extra_info?: ExtraInfo;
}
export interface AdminRecordsSession {
  created_timestamp: number;
  updated_timestamp?: number;
  ip_address?: string;
  user_agent?: string;
  datr_cookie?: string;
}
export interface ExtraInfo {
  old_name?: string;
  new_name?: string;
  old_number?: string;
  old_vanity?: string;
  new_vanity?: string;
  old_email?: string;
  new_email?: string;
  new_number?: string;
}

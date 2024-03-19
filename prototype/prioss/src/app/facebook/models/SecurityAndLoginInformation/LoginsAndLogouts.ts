/**
{
  "account_accesses_v2": [
    {
      "action": "Anmelden",
      "timestamp": 1702744690,
      "site": "www.facebook.com",
      "ip_address": "2003:e0:571c:d540:fc86:2e70:914a:2690"
    }]}
*/
export interface LoginsAndLogoutsModel {
  account_accesses_v2: AccountAccessesItem[];
}
export interface AccountAccessesItem {
  action: string;
  timestamp: number;
  site: string;
  ip_address: string;
}

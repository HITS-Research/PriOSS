/** 
*
{
*  "account_activity_v2": [
*    {
*      "action": "Login",
*      "timestamp": 1702744690,
*      "ip_address": "2003:00e0:571c:d540:fc86:2e70:914a:2690",
*      "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
*      "datr_cookie": "I9J9********************",
*      "city": "Unna",
*      "region": "Nordrhein-Westfalen",
*      "country": "DE",
*      "site_name": "www.facebook.com"
*    }
*]
*}
*/
export interface AccountActivityModel {
  account_activity_v2: AccountActivityItem[];
}

export interface AccountActivityItem {
  action: string;
  timestamp: number;
  ip_address: string;
  user_agent: string;
  datr_cookie: string;
  city: string;
  region: string;
  country: string;
  site_name: string;
}

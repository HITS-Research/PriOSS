/**
{
  "used_ip_address_v2": [
    {
      "ip": "2003:00e0:571c:d540:fc86:2e70:914a:2690",
      "action": "Login",
      "timestamp": 1702744689,
      "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }]}
*/
export interface IPAddressActivityModel {
  used_ip_address_v2: IPAddressActivityItem[];
}
export interface IPAddressActivityItem {
  ip: string;
  action: string;
  timestamp: number;
  user_agent: string;
}

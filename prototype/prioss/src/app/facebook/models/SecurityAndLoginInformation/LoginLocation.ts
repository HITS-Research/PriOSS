/**
{
  "active_sessions_v2": [
    {
      "created_timestamp": 1702744687,
      "ip_address": "2003:e0:571c:d540:fc86:2e70:914a:2690",
      "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "datr_cookie": "I9J9********************",
      "device": "Linux",
      "location": "Unna, Germany",
      "app": "Chrome",
      "session_type": "web"
    }]}
*/
export interface ActiveSessionsModel {
  active_sessions_v2: ActiveSessionItem[];
}
export interface ActiveSessionItem {
  created_timestamp: number;
  ip_address: string;
  user_agent: string;
  datr_cookie: string;
  device: string;
  location: string;
  app: string;
  session_type: string;
}

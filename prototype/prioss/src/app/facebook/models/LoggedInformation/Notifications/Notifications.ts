/**{
  "notifications_v2": [
    {
      "timestamp": 1701458224,
      "unread": true,
      "href": "https://www.facebook.com/dyi/?tab=all_archives&referrer=notif",
      "text": "Erinnerung: Die Dateien mit deinen Meta-Informationen k\u00c3\u00b6nnen nur noch w\u00c3\u00a4hrend der n\u00c3\u00a4chsten 24\u00c2\u00a0Stunden heruntergeladen werden."
    }
  ]
} */
export interface NotificationModel {
  notifications_v2: NotificationItem[];
}
export interface NotificationItem {
  timestamp: number;
  unread: boolean;
  href: string;
  text: string;
}

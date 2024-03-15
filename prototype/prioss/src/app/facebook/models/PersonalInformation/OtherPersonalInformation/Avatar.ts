/**{
  "avatars_v2": {
    "uri": "https://www.facebook.com/redacted",
    "creation_timestamp": 1699721537
  }
} */
export interface AvatarModel {
  avatars_v2: AvatarItem;
}
export interface AvatarItem {
  uri: string;
  creation_timestamp: number;
}

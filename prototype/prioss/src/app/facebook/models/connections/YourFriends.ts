import { FriendItem } from "./FriendItem.interface";

/**{
    "friends_v2": [
      {
        "name": "Andre Nitsch",
        "timestamp": 1655736192
      },
      {
        "name": "Sebastian Ritter",
        "timestamp": 1649123456789
      },
      {
        "name": "Adrian Mirotta",
        "timestamp": 1634476737
      }
      ]
  } */
export interface YourFriendsModel {
  friends_v2: FriendItem[];
}

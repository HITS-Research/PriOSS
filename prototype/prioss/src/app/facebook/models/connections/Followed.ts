/**{
    "following_v3": [
      {
        "name": "Altes F\u00c3\u00a4hrhaus Unna",
        "timestamp": 1648153033
      },
      {
        "name": "Hey Cheeky",
        "timestamp": 1628711378
      }
    ]
  } */

import { FriendItem } from "./FriendItem.interface";

export interface FollowedModel {
  following_v3: FriendItem[];
}

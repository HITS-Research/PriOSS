import { FriendItem } from "./FriendItem.interface";

/**{
    "deleted_friends_v2": [
      {
        "name": "Lisa Wolf",
        "timestamp": 1523363572
      },
      {
        "name": "Topvon Tiptop",
        "timestamp": 1481662656
      }
    ]
  } */
export interface RemovedFriendsModel {
  deleted_friends_v2: FriendItem[];
}

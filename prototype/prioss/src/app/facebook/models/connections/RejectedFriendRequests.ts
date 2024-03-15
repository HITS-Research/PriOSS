/**{
    "rejected_requests_v2": [
      {
        "name": "Ankith Reddy",
        "timestamp": 1597914217
      },
      {
        "name": "Larissa J\u00c3\u00a4germann",
        "timestamp": 1567834831
      }
    ]
  } */

import { FriendItem } from "./FriendItem.interface";

export interface RejectedFriendRequestsModel {
  rejected_requests_v2: FriendItem[];
}

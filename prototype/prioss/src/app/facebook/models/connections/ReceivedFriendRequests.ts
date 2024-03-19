import { FriendItem } from "./FriendItem.interface";

/**{
    "received_requests_v2": [
      {
        "name": "Martin Plonus",
        "timestamp": 1683666687
      }
    ]
} */
export interface ReceivedFriendRequestsModel {
  received_requests_v2: FriendItem[];
}

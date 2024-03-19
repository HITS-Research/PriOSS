import { FriendItem } from "./FriendItem.interface";

/**{
    "sent_requests_v2": [
      {
        "name": "Martin Plonus",
        "timestamp": 1683666687
      }
    ]
} */
export interface SentFriendRequestsModel {
  sent_requests_v2: FriendItem[];
}

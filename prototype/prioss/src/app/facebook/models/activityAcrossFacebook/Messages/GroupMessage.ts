import { MessageModel } from "./Message";

/**{
  "participants": [
    {
      "name": "Anne Schlamann"
    },
    {
      "name": "Momo Marielle"
    },
    {
      "name": "Mar Toph"
    }
  ],
  "messages": [
    {
      "sender_name": "Mar Toph",
      "timestamp_ms": 14022338349123456789,
      "content": "wow remember this? http://t.co/redacted",
      "is_geoblocked_for_viewer": false
    }
  ],
  "title": "Anne, Momo, Mar und 17 weitere Personen",
  "is_still_participant": false,
  "thread_path": "archived_threads/annemomomarund17weiterepersonen_1429473610655523",
  "magic_words": [
    
  ],
  "joinable_mode": {
    "mode": 1,
    "link": ""
  }
} */
export interface GroupMessageModel extends MessageModel{
  joinable_mode: JoinableMode;
}
export interface JoinableMode {
  mode: number;
  link: string;
}


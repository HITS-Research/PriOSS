import { MessageModel } from './Message';

/**{
  "participants": [
    {
      "name": ""
    },
    {
      "name": "Marcia Husen"
    }
  ],
  "messages": [
    {
      "sender_name": "Marcia Husen",
      "timestamp_ms": 1338477941590,
      "content": "haha sowas kenne ich...",
      "is_geoblocked_for_viewer": false
    },
    {
      "sender_name": "Peter Lanklet",
      "timestamp_ms": 1338477880018,
      "content": "au\u00c3\u009fer, dass das Seminar, in dem ich gerade mein Dasein friste brechend langweilig ist",
      "is_geoblocked_for_viewer": false
    }
  ],
  "title": "",
  "is_still_participant": true,
  "thread_path": "inbox/10209513656790326",
  "magic_words": [
    
  ]
} */
export interface InboxMessageModel extends MessageModel {}

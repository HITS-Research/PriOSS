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

export interface MessageModel {
  participants: Participant[];
  messages: Message[];
  title: string;
  is_still_participant: boolean;
  thread_path: string;
  magic_words: string[];
}
export interface Message {
  sender_name: string;
  timestamp_ms: number;
  content: string;
  photos?: ChatMessageAttachment[];
  files?: ChatMessageAttachment[];
  share?: { link: string };
  sticker?: { uri: string, ai_stickers: [] };
  is_geoblocked_for_viewer: boolean;
}
export interface Participant {
  name: string;
}
export interface ChatMessageAttachment{
  uri: string;
  creation_timestamp: number;
}

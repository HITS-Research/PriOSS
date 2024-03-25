import { MessageModel } from './Message';
/**{
  "participants": [
    {
      "name": "Angelique Lauber"
    },
    {
      "name": "Marcia Husen"
    }
  ],
  "messages": [
    {
      "sender_name": "Angelique Lauber",
      "timestamp_ms": 1635451285077,
      "content": "Hey \u00e2\u0098\u00ba Wie geht\u00e2\u0080\u0099s dir? Ich wei\u00c3\u009f wir kennen uns noch nicht, aber du wurdest mir gerade von Facebook vorgeschlagen und wu\u00cc\u0088rde dich dementsprechend gern etwas fragen\u00e2\u0098\u00ba\u00ef\u00b8\u008f\u00f0\u009f\u0099\u0088Scho\u00cc\u0088nen Abend dir noch\u00e2\u009c\u00a8",
      "is_geoblocked_for_viewer": false
    }
  ],
  "title": "Angelique Lauber",
  "is_still_participant": true,
  "thread_path": "message_requests/angeliquelauber_4757660910944830",
  "magic_words": [
    
  ],
  "is_pending": true
} */
export interface MessageRequestModel extends MessageModel {
  isPending: boolean;
}

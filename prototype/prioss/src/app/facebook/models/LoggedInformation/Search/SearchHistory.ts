/**{
  "searches_v2": [    
    {
      "timestamp": 1701513190,
      "attachments": [
        {
          "data": [
            {
              "text": "\"Mausio\""
            }
          ]
        }
      ],
      "data": [
        {
          "text": "Mausio"
        }
      ],
      "title": "Du hast Facebook aufgerufen"
    }
  ]
}
 */
export interface SearchHistoryModel {
  searches_v2: SearchHistoryItem[];
}
export interface SearchHistoryItem {
  timestamp: number;
  attachments: Attachment[];
  data: Datum[];
  title: string;
}
export interface Attachment {
  data: AttachmentDatum[];
}
export interface AttachmentDatum {
  text: string;
}
export interface Datum {
  text: string;
}

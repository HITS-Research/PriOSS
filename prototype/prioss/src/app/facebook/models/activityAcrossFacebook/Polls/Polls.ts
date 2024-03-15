/**{
  "poll_votes_v2": [
    {
      "timestamp": 1530557883,
      "attachments": [
        {
          "data": [
            {
              "poll": {
                "options": [
                  {
                    "option": "Ein Schwein Namens M\u00c3\u00a4nner\nDie \u00c3\u0084rzte",
                    "voted": true
                  }
                ]
              }
            }
          ]
        }
      ],
      "title": "Marcia Husen hat bei Unna Kults Umfrage abgestimmt."
    }
  ]
} */
export interface PollVotesModel {
  poll_votes_v2: PollVotesItem[];
}
export interface PollVotesItem {
  timestamp: number;
  attachments: Attachment[];
  title: string;
}
export interface Attachment {
  data: AttachmentData[];
}
export interface AttachmentData {
  poll: Poll;
}
export interface Poll {
  options: Option[];
}
export interface Option {
  option: string;
  voted: boolean;
}

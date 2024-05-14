/**{
    "group_comments_v2": [
      {
        "timestamp": 1317642040,
        "data": [
          {
            "comment": {
              "timestamp": 1317642040,
              "comment": "redacted",
              "author": "Mark Husen",
              "group": "WHG '11"
            }
          }
        ],
        "title": "redacted"
      }
    ]
  } */
export interface GroupCommentsModel {
  group_comments_v2: GroupCommentsItem[];
}
export interface GroupCommentsItem {
  timestamp: number;
  data: GroupCommentData[];
  title: string;
  
}
export interface GroupCommentData {
  comment: GroupComment;
}
export interface GroupComment {
  timestamp: number;
  comment: string;
  group: string;
  author: string;
}

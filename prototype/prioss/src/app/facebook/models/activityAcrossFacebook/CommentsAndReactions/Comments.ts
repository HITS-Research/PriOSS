/**
 *  {
    "comments_v2": [
      {
        "timestamp": 1272103290,
        "data": [
          {
            "comment": {
              "timestamp": 1272103290,
              "comment": "xD Ignite :-P",
              "author": "Marcia Husen"
            }
          }
        ],
        "title": "Marcia Husen hat ihren eigenen Beitrag kommentiert."
      }
      ]
} 
*/
export interface CommentsModel {
  comments_v2: CommentsItem[];
}
export interface CommentsItem {
  timestamp: number;
  data: CommentData[];
  title: string;
}
export interface CommentData {
  comment: Comment;
}
export interface Comment {
  timestamp: number;
  comment: string;
}

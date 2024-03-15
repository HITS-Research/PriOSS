/** 
[
    {
      "timestamp": 1272217200,
      "data": [
        {
          "reaction": {
            "reaction": "LIKE",
            "actor": "Marcia Husen"
          }
        }
      ],
      "title": "Marcia Husen gef\u00c3\u00a4llt Peter Kipps Link."
    }
  ] */
export interface LikesAndReactionsModel {
  likes_and_reactions: LikesAndReactionsItem[];
}
export interface LikesAndReactionsItem {
  timestamp: number;
  data: LikesAndReactionsData[];
  title: string;
}
export interface LikesAndReactionsData {
  reaction: Reaction;
}
export interface Reaction {
  reaction: string;
  actor: string;
}

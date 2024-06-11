import {
  InstaLikedCommentsInfo,
  InstaLikedPostsInfo,
} from "../../models";
import InstaUserPostsDataModel from "./insta-posts-data.interface";
import InstaUserStoriesDataModel from "./insta-stories-data.interface";
import InstaUserCommentsDataModel from "./insta-user-comments-data.interface";


export default interface InstaUserInteractionDataModel {
  likedCommentsInfo: InstaLikedCommentsInfo[];
  likedPostsInfo: InstaLikedPostsInfo[];
  posts:InstaUserPostsDataModel[];
  stories:InstaUserStoriesDataModel[];
  comments: InstaUserCommentsDataModel[];
}

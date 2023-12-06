import {
  InstaLikedCommentsInfo,
  InstaLikedPostsInfo,
} from "../../models";


export default interface InstaUserInteractionDataModel {
  likedCommentsInfo: InstaLikedCommentsInfo[];
  likedPostsInfo: InstaLikedPostsInfo[];
}

import {
  InstaShoppingInfo,
  InstaShoppingWishlistInfo,
} from "../../models";

export default interface InstaUserShoppingDataModel {
  shoppingInfo: InstaShoppingInfo[];
  shoppingWishlistInfo: InstaShoppingWishlistInfo[];
}

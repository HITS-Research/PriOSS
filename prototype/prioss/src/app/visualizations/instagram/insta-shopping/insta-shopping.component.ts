import { AfterViewInit, Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { InstaShoppingRepository } from 'src/app/db/data-repositories/instagram/insta-shopping/insta-shopping.repository';
import { InstaShoppingWishlistRepository } from 'src/app/db/data-repositories/instagram/insta-shopping/insta-shopping_wishlist.repository';
import { InstaShoppingInfo } from 'src/app/models/Instagram/ShoppingInfo/InstaShoppingInfo';
import { InstaShoppingWishlistInfo } from 'src/app/models/Instagram/ShoppingInfo/InstaShoppingWishlistInfo';

@Component({
  selector: 'app-insta-shopping',
  templateUrl: './insta-shopping.component.html',
  styleUrls: ['./insta-shopping.component.less']
})
export class InstaShoppingComponent extends SequenceComponentInit implements AfterViewInit{

  @Input()
  previewMode = false;

  totalMerchants = 0;
  totalProducts = 0;
  totalWishlistMerchants = 0;
  totalWishlistProducts = 0;

  shoppingData: InstaShoppingInfo[] = [];
  shoppingWishlistData: InstaShoppingWishlistInfo[] = [];

  merchantVisible = false;
  productVisible = false;
  merchantSearchValue = '';
  productSearchValue = '';
  listOfShoppingData: InstaShoppingInfo[] = [];
  
  wishlistMerchantVisible = false;
  wishlistProductVisible = false;
  wishlistMerchantSearchValue = '';
  wishlistProductSearchValue = '';
  listOfShoppingWishlistData: InstaShoppingWishlistInfo[] = [];

  constructor(private instaShoppingRepo: InstaShoppingRepository,
              private instaShoppingWishlistRepo : InstaShoppingWishlistRepository){
    super();
  }

  /**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  } 

  /**
  * @see-super-class
  * @author Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 9: Shopping");
    // Shopping Data fetched from SQlite
    await this.instaShoppingRepo.getAllShoppingInfo().then((shoppingData) => {
      this.shoppingData = shoppingData;
      this.listOfShoppingData = [...this.shoppingData]
    });

    this.totalMerchants = await this.instaShoppingRepo.getTotalMerchantCount();
    this.totalProducts = await this.instaShoppingRepo.getTotalProductCount();

     // Shopping Wishlist Data fetched from SQlite
     await this.instaShoppingWishlistRepo.getAllShoppingWishlistInfo().then((shoppingWishlistData) => {
      this.shoppingWishlistData = shoppingWishlistData;
      this.listOfShoppingWishlistData = [...this.shoppingWishlistData]
    });

    this.totalWishlistMerchants = await this.instaShoppingWishlistRepo.getTotalMerchantCount();
    this.totalWishlistProducts = await this.instaShoppingWishlistRepo.getTotalProductCount();
  }

  /**
   * Resets the given searchvalue.
   * 
   * @param searchList the list that should be resetted.
   * 
   * @author: Mayank (mayank@mail.upb.de)
   */
  reset(searchList: string): void {
    switch (searchList) {
      case 'product':
        this.productSearchValue = '';
        break;
      case 'merchant':
        this.merchantSearchValue = '';
        break;
      case 'wishlistProduct':
        this.wishlistProductSearchValue = '';
        break;
      case 'wishlistMerchant':
        this.wishlistMerchantSearchValue = '';
        break;
      default:
        break;
    }

    this.search(searchList);
  }

  /**
   * Searches the given list for the current searchvalue.
   * 
   * @param searchList the list that should be searched.
   * 
   * @author: Mayank (mayank@mail.upb.de)
   */
  search(searchList: string): void {
    this.merchantVisible = false;
    this.productVisible = false;
    this.wishlistMerchantVisible = false;
    this.wishlistProductVisible = false;

    switch (searchList) {
      case 'product':
        this.listOfShoppingData = this.shoppingData.filter((item: InstaShoppingInfo) => item.productName.toLowerCase().indexOf(this.productSearchValue.toLowerCase()) !== -1);
        break;
      case 'merchant':
        this.listOfShoppingData = this.shoppingData.filter((item: InstaShoppingInfo) => item.merchantName.toLowerCase().indexOf(this.merchantSearchValue.toLowerCase()) !== -1);
        break;
      case 'wishlistProduct':
        this.listOfShoppingWishlistData = this.shoppingWishlistData.filter((item: InstaShoppingWishlistInfo) => item.productName.toLowerCase().indexOf(this.wishlistProductSearchValue.toLowerCase()) !== -1);
        break;
      case 'wishlistMerchant':
        this.listOfShoppingWishlistData = this.shoppingWishlistData.filter((item: InstaShoppingWishlistInfo) => item.merchantName.toLowerCase().indexOf(this.wishlistMerchantSearchValue.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }

}

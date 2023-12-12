import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {InstaShoppingInfo} from 'src/app/instagram/models/ShoppingInfo/InstaShoppingInfo';
import {InstaShoppingWishlistInfo} from 'src/app/instagram/models/ShoppingInfo/InstaShoppingWishlistInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";

@Component({
  selector: 'app-insta-shopping',
  templateUrl: './insta-shopping.component.html',
  styleUrls: ['./insta-shopping.component.less']
})
export class InstaShoppingComponent extends SequenceComponentInit implements AfterViewInit, OnInit {

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

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    const {shoppingInfo, shoppingWishlistInfo} = this.store.selectSnapshot(InstaState.getUserShoppingData);
    this.shoppingData = shoppingInfo;
    this.listOfShoppingData = [...this.shoppingData]
    this.totalMerchants = new Set(this.shoppingData.map(item => item.merchantName)).size;
    this.totalProducts = new Set(this.shoppingData.map(item => item.productName)).size;
    this.shoppingWishlistData = shoppingWishlistInfo;
    this.listOfShoppingWishlistData = [...this.shoppingWishlistData]
    this.totalWishlistMerchants = new Set(this.shoppingWishlistData.map(item => item.merchantName)).size;
    this.totalWishlistProducts = new Set(this.shoppingWishlistData.map(item => item.productName)).size;
  }

  /**
   * A Callback called by angular when the views have been initialized
   * It handles the initialization when the component is displayed on its own dedicated page.
   *
   * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
   */
  ngAfterViewInit() {
    if (!this.previewMode) {
      this.initComponent();
    }
  }

  /**
   * @see-super-class
   * @author Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
   */
  override async initComponent(): Promise<void> {
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

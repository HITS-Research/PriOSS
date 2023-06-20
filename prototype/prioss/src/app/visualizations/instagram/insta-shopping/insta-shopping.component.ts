import { Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { InstaShoppingRepository } from 'src/app/db/data-repositories/instagram/insta-shopping/insta-shopping.repository';
import { InstaShoppingInfo } from 'src/app/models/Instagram/ShoppingInfo/InstaShoppingInfo';

@Component({
  selector: 'app-insta-shopping',
  templateUrl: './insta-shopping.component.html',
  styleUrls: ['./insta-shopping.component.less']
})
export class InstaShoppingComponent extends SequenceComponentInit{

  @Input()
  previewMode: boolean = false;

  totalMerchants: number = 0;
  totalProducts: number = 0;

  shoppingData: InstaShoppingInfo[] = [];

  constructor(private instaShoppingRepo: InstaShoppingRepository){
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
    });

    this.totalMerchants = await this.instaShoppingRepo.getTotalMerchantCount();
    this.totalProducts = await this.instaShoppingRepo.getTotalProductCount();
  }

}

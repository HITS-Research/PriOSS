import { AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaShoppingInfo } from 'src/app/instagram/models/ShoppingInfo/InstaShoppingInfo';
import { InstaShoppingWishlistInfo } from 'src/app/instagram/models/ShoppingInfo/InstaShoppingWishlistInfo';
import { Store } from "@ngxs/store";
import { InstaState } from "../../state/insta.state";
import { EChartsOption } from 'echarts';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { IconModule } from '@ant-design/icons-angular';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzFilterTriggerComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-insta-shopping',
  templateUrl: './insta-shopping.component.html',
  styleUrls: ['./insta-shopping.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    IconModule,
    NgClass,
    NgFor,
    NgIf,
    NgxEchartsModule,
    NzButtonModule,
    NzCardModule,
    NzDropDownModule,
    NzFilterTriggerComponent,
    NzGridModule,
    NzInputModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    TitleBarComponent,
  ]
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

  shoppingDataChartOptions: EChartsOption;
  wishlistDataChartOptions: EChartsOption;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    const { shoppingInfo, shoppingWishlistInfo } = this.store.selectSnapshot(InstaState.getUserShoppingData);
    this.shoppingData = shoppingInfo;
    this.listOfShoppingData = [...this.shoppingData];
    this.totalMerchants = new Set(this.shoppingData.map(item => item.merchantName)).size;
    this.totalProducts = new Set(this.shoppingData.map(item => item.productName)).size;
    this.shoppingWishlistData = shoppingWishlistInfo;
    this.listOfShoppingWishlistData = [...this.shoppingWishlistData];
    this.totalWishlistMerchants = new Set(this.shoppingWishlistData.map(item => item.merchantName)).size;
    this.totalWishlistProducts = new Set(this.shoppingWishlistData.map(item => item.productName)).size;

    this.prepareChartData();
  }

  ngAfterViewInit() {
    if (!this.previewMode) {
      this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {}

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

  private prepareChartData() {
    const merchantCountMap: { [key: string]: number } = {};
    const wishlistMerchantCountMap: { [key: string]: number } = {};

    this.shoppingData.forEach(item => {
      if (merchantCountMap[item.merchantName]) {
        merchantCountMap[item.merchantName]++;
      } else {
        merchantCountMap[item.merchantName] = 1;
      }
    });

    this.shoppingWishlistData.forEach(item => {
      if (wishlistMerchantCountMap[item.merchantName]) {
        wishlistMerchantCountMap[item.merchantName]++;
      } else {
        wishlistMerchantCountMap[item.merchantName] = 1;
      }
    });

    const shoppingDataChart = Object.keys(merchantCountMap).map(key => ({
      name: key,
      value: merchantCountMap[key]
    }));

    const wishlistDataChart = Object.keys(wishlistMerchantCountMap).map(key => ({
      name: key,
      value: wishlistMerchantCountMap[key]
    }));

    this.shoppingDataChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: shoppingDataChart.map(item => item.name),
        axisLabel: { rotate: 45, interval: 0 }
      },
      yAxis: { type: 'value' },
      series: [{
        data: shoppingDataChart.map(item => item.value),
        type: 'bar'
      }],
      legend: { show: false }
    };

    this.wishlistDataChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: wishlistDataChart.map(item => item.name),
        axisLabel: { rotate: 45, interval: 0 }
      },
      yAxis: { type: 'value' },
      series: [{
        data: wishlistDataChart.map(item => item.value),
        type: 'bar'
      }],
      legend: { show: false }
    };
  }
}

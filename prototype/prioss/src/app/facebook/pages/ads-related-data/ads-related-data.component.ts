import {
  Component,
  type OnInit,
  ChangeDetectionStrategy,
  signal,
  computed,
  input,
} from "@angular/core";
import { scrollToTop } from "src/app/features/utils/generalUtilities.functions";
import type { FbUserDataModel } from "../../state/models";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NgxEchartsModule } from "ngx-echarts";
import { TitleBarComponent } from "src/app/features/title-bar/title-bar.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { AdsPreferencesOverviewComponent } from "./features/ads-preferences-overview/ads-preferences-overview.component";
import type { AdPreferencesModel, AdsInterestModel, AdvertiserInteractedModel, AdvertisersUsingYourDataModel, ConnectedAppsAndWebsitesModel, InferredTopicsModel, OffFacebookActivityModel, OffFacebookActivitySettingsModel, OtherCategoriesUsedToReachYouModel, SubscriptionForNoAdsModel } from "../../models";
import { IndexedDbService } from "src/app/state/indexed-db.state";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { FacebookAdsOverviewComponent } from "./features/ads-overview/facebook-ads-overview/facebook-ads-overview.component";
@Component({
  selector: 'app-ads-related-data',
  standalone: true,
  imports: [NzCardModule,
    NzTabsModule,
    NzSkeletonModule,
    NzStatisticModule,
    NgxEchartsModule,
    AdsPreferencesOverviewComponent,
    NzGridModule,
    FormsModule,
    FacebookAdsOverviewComponent,
    CommonModule,
    TitleBarComponent,
  ],
  templateUrl: './ads-related-data.component.html',
  styleUrls: ['./ads-related-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdsRelatedDataComponent implements OnInit {

  previewModeInput = input<string>();

  previewMode = computed(() => {
    return this.previewModeInput() === "true";
  });
  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  loading = signal<boolean>(true);
  adPreferences = computed(() => {
    return this.userData()?.ads_and_businesses?.adPreferences ?? {} as AdPreferencesModel;
  });
  adsInteracted = computed(() => {
    return this.userData()?.ads_and_businesses?.advertiserInteracted ?? {} as AdvertiserInteractedModel;
  });
  advertisersUsingYourData = computed(() => {
    return this.userData()?.ads_and_businesses?.advertisersUsingYourData ?? {} as AdvertisersUsingYourDataModel;
  });

  advertisersUsingListToTargetYou = computed(() => {
    const advertisers: string[] = [];
    const tempAdvertisers = this.advertisersUsingYourData().custom_audiences_all_types_v2 ?? [];
    for (const advertiser of tempAdvertisers) {
      if (advertiser.has_data_file_custom_audience || advertiser.has_remarketing_custom_audience) {
        advertisers.push(advertiser.advertiser_name);
      }
    }
    return advertisers;
  });

  advertisersYouveInteractedWith = computed(() => {
    const advertisers: string[] = [];
    const tempAdvertisers = this.advertisersUsingYourData().custom_audiences_all_types_v2 ?? [];
    for (const advertiser of tempAdvertisers) {
      if (advertiser.has_in_person_store_visit) {
        advertisers.push(advertiser.advertiser_name);
      }
    }
  });

  amountOfAdvertisersUsingYourData = computed(() => {
    return this.advertisersUsingYourData()?.custom_audiences_all_types_v2?.length ?? 0;
  });

  otherCategoriesUsedToReachYou = computed(() => {
    return this.userData()?.ads_and_businesses?.otherCategoriesUsedToReachYou ?? {} as OtherCategoriesUsedToReachYouModel;
  });

  subscriptionsForNoAds = computed(() => {
    return this.userData()?.ads_and_businesses?.subscriptionsForNoAds ?? {} as SubscriptionForNoAdsModel;
  });

  connectedAppsAndWebsites = computed(() => {
    return this.userData()?.apps_and_websites_off_of_fb?.connectedAppsAndWebsites ?? {} as ConnectedAppsAndWebsitesModel;
  });

  offFacebookActivity = computed(() => {
    return this.userData()?.apps_and_websites_off_of_fb?.offFacebookActivity ?? {} as OffFacebookActivityModel;
  });

  offFacebookActivitySettings = computed(() => {
    return this.userData()?.apps_and_websites_off_of_fb?.offFacebookActivitySettings ?? {} as OffFacebookActivitySettingsModel;
  });

  adsInterest = computed(() => {
    return this.userData()?.logged_information?.ads_interest ?? {} as AdsInterestModel;
  });

  inferredTopics = computed(() => {
    return this.userData()?.logged_information?.inferred_topics ?? {} as InferredTopicsModel;
  });


  constructor(private db: IndexedDbService) {
  }

 async ngOnInit() {
    scrollToTop();
    await this.db.getSelectedFacebookDataStore()
    .then((data) => {
      if (!data.facebookData) {
        this.userData.set({} as FbUserDataModel);
      }else{
        this.userData.set(data.facebookData);
      }
    }).finally(() => {
      this.loading.set(false)
    });

  }

}

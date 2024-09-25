import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { AdvertiserInteractedModel, AdvertisersUsingYourDataModel} from 'src/app/facebook/models';
import { NotificationMetaPrivacyPolicyUpdateItem } from 'src/app/facebook/models/LoggedInformation/Notifications/MetaPrivacyPolicyUpdateNotification';
import { AdvertisersUsingYourDataItem } from 'src/app/facebook/models/adsInformation/AdvertisersUsingYourData';
import { FbLoggedInformationModel, FbUserDataModel } from 'src/app/facebook/state/models';

/**
 * Component for displaying an overview of Facebook ads-related data
 */
@Component({
  selector: 'prioss-facebook-ads-overview',
  standalone: true,
  imports: [
    NzListModule,
    NzCardModule,
  ],
  templateUrl: './facebook-ads-overview.component.html',
  styleUrl: './facebook-ads-overview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookAdsOverviewComponent {
  /** Required input for user data model */
  userData = input.required<FbUserDataModel>();

  /** Computed value for ads and businesses data */
  adsAndBusinesses = computed(() => {
    return this.userData().ads_and_businesses ?? {} as AdvertisersUsingYourDataModel;
  });

  /** Computed value for logged information data */
  loggedInformation = computed(() => {
    return this.userData().logged_information ?? {} as FbLoggedInformationModel;
  });

  /** Computed value for advertisers using your data */
  advertiseresUsingYourData = computed(() => {
    return this.adsAndBusinesses().advertisersUsingYourData?.custom_audiences_all_types_v2 ?? [] as AdvertisersUsingYourDataItem[];
  });

  /** Computed value for inferred topics */
  inferences = computed(() => {
    return this.loggedInformation().inferred_topics?.inferred_topics_v2 ?? [] as string[];
  });

  /** Computed value for ads interacted with */
  adsInteracted = computed(() => {
    return this.adsAndBusinesses().advertiserInteracted?.history_v2 ?? [] as AdvertiserInteractedModel[];
  });

  /** Computed value for ads interests */
  adsInterests = computed(() => {
    return this.loggedInformation().ads_interest?.topics_v2 ?? [] as string[];
  });

  /** Computed value for Meta privacy policy update notifications */
  notification_meta_privacy_policy_updates = computed(() => {
    return this.loggedInformation().meta_privacy_policy_update?.notification_meta_privacy_policy_update ?? [] as NotificationMetaPrivacyPolicyUpdateItem[];
  });
}
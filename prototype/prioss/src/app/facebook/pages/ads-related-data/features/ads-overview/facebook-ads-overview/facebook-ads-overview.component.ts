import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { AdvertiserInteractedModel, AdvertisersUsingYourDataModel} from 'src/app/facebook/models';
import { NotificationMetaPrivacyPolicyUpdateItem } from 'src/app/facebook/models/LoggedInformation/Notifications/MetaPrivacyPolicyUpdateNotification';
import { AdvertisersUsingYourDataItem } from 'src/app/facebook/models/adsInformation/AdvertisersUsingYourData';
import { FbLoggedInformationModel, FbUserDataModel } from 'src/app/facebook/state/models';

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
  userData = input.required<FbUserDataModel>();
  adsAndBusinesses = computed(() => {
    return this.userData().ads_and_businesses ?? {} as AdvertisersUsingYourDataModel;
  });

  loggedInformation = computed(() => {
    return this.userData().logged_information?? {} as FbLoggedInformationModel;
  });
  advertiseresUsingYourData = computed(() => {
    return this.adsAndBusinesses().advertisersUsingYourData?.custom_audiences_all_types_v2?? [] as AdvertisersUsingYourDataItem[];
  });

  inferences = computed(() => {
    return this.loggedInformation().inferred_topics?.inferred_topics_v2 ?? [] as string[];
  });
  
  adsInteracted = computed(() => {
    return this.adsAndBusinesses().advertiserInteracted?.history_v2 ?? [] as AdvertiserInteractedModel[];
  });

  adsInterests = computed(() => {
    return this.loggedInformation().ads_interest?.topics_v2 ?? [] as string[];
  });
  notification_meta_privacy_policy_updates = computed(() => {
    return this.loggedInformation().meta_privacy_policy_update?.notification_meta_privacy_policy_update ?? [] as NotificationMetaPrivacyPolicyUpdateItem[];
});
}

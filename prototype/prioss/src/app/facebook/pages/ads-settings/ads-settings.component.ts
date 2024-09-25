import { AfterViewInit, Component } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

/**
 * Component for managing and displaying ads settings
 */
@Component({
  selector: 'app-ads-settings',
  templateUrl: './ads-settings.component.html',
  standalone: true,
  imports: [
    StepperComponent,
    TitleBarComponent,
  ]
})
export class AdsSettingsComponent implements AfterViewInit {
  /**
   * Lifecycle hook that is called after a component's view has been fully initialized
   */
  async ngAfterViewInit() {
    scrollToTop();
  }

  /**
   * Array of instruction steps for web interface
   */
  instructionsStepDataWeb: Step[] = [
    {
      description: 'Click on "Account" on the top right corner of the page.',
      imageUrl: "../../assets/images/ads-settings/1ads.png"
    },
    {
      description: 'Click on "Privacy and Settings".',
      imageUrl: "../../assets/images/ads-settings/2ads.png"
    },
    {
      description: 'Click on Settings.',
      imageUrl: "../../assets/images/ads-settings/3ads.png"
    },
    {
      description: 'Click on "Access your information" and then click on "Continue" button.',
      imageUrl: "../../assets/images/ads-settings/4ads.png"
    },
    {
      description: 'Click on "Ads Information" and then click on "Advertisers you have interacted with".',
      imageUrl: "../../assets/images/ads-settings/5ads.png"
    },
    {
      description: 'Choose the advertiser whose ads you want to hide and click "hide ads".',
      imageUrl: "../../assets/images/ads-settings/6ads.png"
    }
  ];

}
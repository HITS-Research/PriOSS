import { NgFor } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

@Component({
  selector: 'app-ads-settings',
  templateUrl: './ads-settings.component.html',
  styleUrls: ['./ads-settings.component.less'],
  standalone: true,
  imports: [
    NgFor,
    NzButtonModule,
    NzDividerModule,
    NzImageModule,
    NzStepsModule,
    NzTabsModule,
    TitleBarComponent,
  ]
})
export class AdsSettingsComponent implements AfterViewInit{

  async ngAfterViewInit(){
    scrollToTop();
  }

  instructionsStepDataWeb: any[] = [
    {
      instructionTextFaceAdsGuidelines: 'Click on "Account" on the top right corner of the page.',
      instructionPictureFaceAdsGuidelines: "../../assets/images/ads-settings/1ads.png"
    },
    {
      instructionTextFaceAdsGuidelines: 'Click on "Privacy and Settings".',
      instructionPictureFaceAdsGuidelines: "../../assets/images/ads-settings/2ads.png"
    },
    {
      instructionTextFaceAdsGuidelines: 'Click on Settings.',
      instructionPictureFaceAdsGuidelines: "../../assets/images/ads-settings/3ads.png"
    },
    {
      instructionTextFaceAdsGuidelines: 'Click on "Access your information" and then click on "Continue" button.',
      instructionPictureFaceAdsGuidelines: "../../assets/images/ads-settings/4ads.png"
    },
    {
      instructionTextFaceAdsGuidelines: 'Click on "Ads Information" and then click on "Advertisers you have interacted with".',
      instructionPictureFaceAdsGuidelines: "../../assets/images/ads-settings/5ads.png"
    },
    {
      instructionTextFaceAdsGuidelines: 'Choose the advertiser whose ads you want to hide and click "hide ads".',
      instructionPictureFaceAdsGuidelines: "../../assets/images/ads-settings/6ads.png"
    }
  ];


  guidelineStepWeb = 0;
  instructionTextFaceAdsGuidelines = this.instructionsStepDataWeb[0].instructionTextFaceAdsGuidelines;
  instructionPictureFaceAdsGuidelines = this.instructionsStepDataWeb[0].instructionPictureFaceAdsGuidelines;

  /**
   * Callback function to increment/decrement the "guidelineStepWeb" variable.
   * @param step: number
   * @returns void
   */
  webGuidelineStepChange(step: number): void {
    this.guidelineStepWeb += step;
    this.changeFaceOfaGuidelinesWeb();
  }


  /**
   * This method shows the instruction text and picture for Facebook user
   */
  changeFaceOfaGuidelinesWeb(): void {
    this.instructionTextFaceAdsGuidelines = this.instructionsStepDataWeb[this.guidelineStepWeb].instructionTextFaceAdsGuidelines;
    this.instructionPictureFaceAdsGuidelines = this.instructionsStepDataWeb[this.guidelineStepWeb].instructionPictureFaceAdsGuidelines;
  }

  /**
   * Callback function to update the "guidelineStepWeb" variable.
   * @param index: number
   * @returns void
  */
  onIndexChangeWeb(index: number): void {
    this.guidelineStepWeb = index;
    this.changeFaceOfaGuidelinesWeb();
  }
}

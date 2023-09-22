import { AfterViewInit, Component } from '@angular/core';
import { scrollToTop } from 'src/app/utilities/generalUtilities.functions';

@Component({
  selector: 'app-ads-settings',
  templateUrl: './ads-settings.component.html',
  styleUrls: ['./ads-settings.component.less']
})
export class AdsSettingsComponent implements AfterViewInit{
  
  async ngAfterViewInit(){
    scrollToTop();
  }

  FaceAdsGuidelines = 0;
  instructionTextFaceAdsGuidelines='Click on "Account" on the top right corner of the page.';
  instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/1ads.png";

  /**
   * Callback function to decrement the "FaceAdsGuidelines" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  preFaceAdsGuidelines(): void {
    this.FaceAdsGuidelines -= 1;
    this.changeFaceAdsGuidelines();
  }

  /**
   * Callback function to increment the "FaceAdsGuidelines" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  nextFaceAdsGuidelines(): void {
    this.FaceAdsGuidelines += 1;
    this.changeFaceAdsGuidelines();
  }


  /**
   * This method shows the instruction text and picture for Instagram user to download their personal data.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  changeFaceAdsGuidelines(): void {
    switch (this.FaceAdsGuidelines) {
      case 0: {
        this.instructionTextFaceAdsGuidelines='Click on "Account" on the top right corner of the page.';
        this.instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/1ads.png";
        break;
      }
      case 1: {
        this.instructionTextFaceAdsGuidelines='Click on "Privacy and Settings".';
        this.instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/2ads.png";
        break;
      }
      case 2: {
        this.instructionTextFaceAdsGuidelines='Click on Settings.';
        this.instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/3ads.png";
        break;
      }
      case 3: {
        this.instructionTextFaceAdsGuidelines='Navigate to "Your Facebook Information" and then click on view in front of "Access your Information".';
        this.instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/4ads.png";
        break;
      }
      case 4: {
        this.instructionTextFaceAdsGuidelines='Click on "Ads Information" and then click on "Advertisers you have interacted with".';
        this.instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/5ads.png";
        break;
      }
      case 5: {
        this.instructionTextFaceAdsGuidelines='Choose the advertiser whose ads you want to hide and click "hide ads".';
        this.instructionPictureFaceAdsGuidelines="../../assets/images/ads-settings/6ads.png";
        break;
      }
      default: {
        this.instructionTextFaceAdsGuidelines='Error';
      }
    }
  }
}



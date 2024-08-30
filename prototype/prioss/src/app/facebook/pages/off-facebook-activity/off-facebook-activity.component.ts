import { NgFor } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

/**
  * This component is responsible for providing guidelines to turn off the off-facebook-activity in facebook
  *
  * @author: Mukul (mukuls@mail.upb.de)
  *
  */
@Component({
  selector: 'app-off-facebook-activity',
  templateUrl: './off-facebook-activity.component.html',
  styleUrls: ['./off-facebook-activity.component.less'],
  standalone: true,
  imports: [
    NgFor,
    NzButtonModule,
    NzDividerModule,
    NzImageModule,
    NzStepsModule,
    NzTabsModule,
    NzTypographyModule,
    TitleBarComponent,
  ]
})
export class OffFacebookActivityComponent implements AfterViewInit{

  async ngAfterViewInit(){
    scrollToTop();
  }

  /**
   * Web Version
  */

  instructionsStepDataWeb: any[] = [
    {
      instructionText: 'Click on "Account" on the top right corner of the page.',
      instructionPicture: '../../assets/images/off-facebook-activity/1.png'
    },
    {
      instructionText: ' Click on "Privacy and Settings".',
      instructionPicture: '../../assets/images/off-facebook-activity/2.png'
    },
    {
      instructionText: 'Click on "Settings".',
      instructionPicture: '../../assets/images/off-facebook-activity/3.png'
    },
    {
      instructionText: 'Navigate to "Off-Facebook activity".',
      instructionPicture: '../../assets/images/off-facebook-activity/4.png'
    },
    {
      instructionText: 'Click on "Continue". After Step 5 follow Step 6 if you want to select and disconnect specific future activities Step 7 if you want to clear previous activitiy Step 8 and 9 if you want to turn OFF Off-Facebook Activity',
      instructionPicture: '../../assets/images/off-facebook-activity/5.png'
    },
    {
      instructionText: 'Click on "Disconnect specific activitiy" and put your Facebook password to select the activities you want to disconnect.',
      instructionPicture: '../../assets/images/off-facebook-activity/6.png'
    },
    {
      instructionText: ' Click on "Clear previous activity" and confirm again by clicking clear.',
      instructionPicture: '../../assets/images/off-facebook-activity/7.png'
    },
    {
      instructionText: ' Click on "Manage future activity".',
      instructionPicture: '../../assets/images/off-facebook-activity/8.png'
    },
    {
      instructionText: ' Click on "Disconnect future activity".',
      instructionPicture: '../../assets/images/off-facebook-activity/9.png'
    }
  ];

  guidelineStepWeb = 0;
  instructionTextFaceOfaGuidelines = this.instructionsStepDataWeb[0].instructionText;
  instructionPictureFaceOfaGuidelines = this.instructionsStepDataWeb[0].instructionPicture;

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
   * This method shows the instruction text and picture for Facebook user.
   * @returns void
   */
  changeFaceOfaGuidelinesWeb(): void {
    this.instructionTextFaceOfaGuidelines = this.instructionsStepDataWeb[this.guidelineStepWeb].instructionText;
    this.instructionPictureFaceOfaGuidelines = this.instructionsStepDataWeb[this.guidelineStepWeb].instructionPicture;
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

  /**
   * Mobile Version
  */

  instructionsStepDataMobile: any[] = [
    {
      instructionText: 'Click on "Menu".',
      instructionPicture: '../../assets/images/off-facebook-activity/m1.png'
    },
    {
      instructionText: ' Click on "Privacy and Settings".',
      instructionPicture: '../../assets/images/off-facebook-activity/m2.png'
    },
    {
      instructionText: 'Scroll down and navigate to Your Information and Click on "Off–Facebook Activity". After Step 3 follow Step 4 if you want to select and disconnect specific future activities Step 5 if you want to clear previous activitiy Step 6,7 and 8 if you want to turn OFF Off-Facebook Activity ',
      instructionPicture: '../../assets/images/off-facebook-activity/m3.png'
    },
    {
      instructionText: 'Click on "Select activity to disconnect" and put your Facebook password to select the activities you want to disconnect.',
      instructionPicture: '../../assets/images/off-facebook-activity/m4.png'
    },
    {
      instructionText: ' Click on "Clear History" and confirm again by clicking clear history .',
      instructionPicture: '../../assets/images/off-facebook-activity/m5.png'
    },
    {
      instructionText: 'Click on "Disconnect future activity".',
      instructionPicture: '../../assets/images/off-facebook-activity/m6.png'
    },
    {
      instructionText: 'Turn OFF the "Blue button" in front of future Off-Facebook Activity.',
      instructionPicture: '../../assets/images/off-facebook-activity/m7.png'
    },
    {
      instructionText: 'Click on "Turn Off" to confirm.',
      instructionPicture: '../../assets/images/off-facebook-activity/m8.png'
    }
  ];

  guidelineStepMobile = 0;
  instructionTextFaceOfaGuidelinesMobile = this.instructionsStepDataMobile[0].instructionText;
  instructionPictureFaceOfaGuidelinesMobile = this.instructionsStepDataMobile[0].instructionPicture;

  /**
   * Callback function to increment/decrement the "guidelineStepWeb" variable.
   * @param step: number
   * @returns void
   */
  mobileGuidelineStepChange(step: number): void {
    this.guidelineStepMobile += step;
    this.changeFaceOfaGuidelinesMobile();
  }

  /**
   * This method shows the instruction text and picture for Facebook user to download their personal data.
   * @returns void
   */
  changeFaceOfaGuidelinesMobile(): void {
    this.instructionTextFaceOfaGuidelinesMobile = this.instructionsStepDataMobile[this.guidelineStepMobile].instructionText;
    this.instructionPictureFaceOfaGuidelinesMobile = this.instructionsStepDataMobile[this.guidelineStepMobile].instructionPicture;
  }

  /**
   * Callback function to update the "guidelineStepMobile" variable.
   * @param index: number
   * @returns void
  */
  onIndexChangeMobile(index: number): void {
    this.guidelineStepMobile = index;
    this.changeFaceOfaGuidelinesMobile();
  }
}

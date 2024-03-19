import { AfterViewInit, Component ,ChangeDetectionStrategy} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffFacebookActivityComponent implements AfterViewInit {
  async ngAfterViewInit() {
    scrollToTop();
  }

  FaceOfaGuidelines = 0;
  instructionTextFaceOfaGuidelines =
    'Click on "Account" on the top right corner of the page.';
  instructionPictureFaceOfaGuidelines =
    '../../assets/images/off-facebook-activity/1.png';

  /**
   * Callback function to decrement the "FaceOfaGuidelines" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  preFaceOfaGuidelines(): void {
    this.FaceOfaGuidelines -= 1;
    this.changeFaceOfaGuidelines();
  }

  /**
   * Callback function to increment the "FaceOfaGuidelines" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  nextFaceOfaGuidelines(): void {
    this.FaceOfaGuidelines += 1;
    this.changeFaceOfaGuidelines();
  }

  /**
   * This method shows the instruction text and picture for Instagram user to download their personal data.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  changeFaceOfaGuidelines(): void {
    switch (this.FaceOfaGuidelines) {
      case 0: {
        this.instructionTextFaceOfaGuidelines =
          'Click on "Account" on the top right corner of the page.';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/1.png';
        break;
      }
      case 1: {
        this.instructionTextFaceOfaGuidelines =
          ' Click on "Privacy and Settings".';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/2.png';
        break;
      }
      case 2: {
        this.instructionTextFaceOfaGuidelines = 'Click on "Settings".';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/3.png';
        break;
      }
      case 3: {
        this.instructionTextFaceOfaGuidelines =
          'Navigate to "Your Facebook Information".';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/4.png';
        break;
      }
      case 4: {
        this.instructionTextFaceOfaGuidelines =
          'Click on "Off–Facebook Activity". After Step 5 follow Step 6 if you want to select and disconnect specific future activities Step 7 if you want to clear previous activitiy Step 8 and 9 if you want to turn OFF Off-Facebook Activity';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/5.png';
        break;
      }
      case 5: {
        this.instructionTextFaceOfaGuidelines =
          'Click on "Select future activity to disconnect" and put your Facebook password to select the activities you want to disconnect.';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/6.png';
        break;
      }
      case 6: {
        this.instructionTextFaceOfaGuidelines =
          ' Click on "Clear previous activity" and confirm again by clicking clear.';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/7.png';
        break;
      }
      case 7: {
        this.instructionTextFaceOfaGuidelines =
          ' Click on "Manage future activity".';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/8.png';
        break;
      }
      case 8: {
        this.instructionTextFaceOfaGuidelines =
          ' Click on "Disconnect future activity".';
        this.instructionPictureFaceOfaGuidelines =
          '../../assets/images/off-facebook-activity/9.png';
        break;
      }
      default: {
        this.instructionTextFaceOfaGuidelines = 'Error';
      }
    }
  }

  FaceOfaGuidelinesMobile = 0;
  instructionTextFaceOfaGuidelinesMobile = 'Click on "Menu".';
  instructionPictureFaceOfaGuidelinesMobile =
    '../../assets/images/off-facebook-activity/m1.png';

  /**
   * Callback function to decrement the "FaceOfaGuidelinesMobile" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  preFaceOfaGuidelinesMobile(): void {
    this.FaceOfaGuidelinesMobile -= 1;
    this.changeFaceOfaGuidelinesMobile();
  }

  /**
   * Callback function to increment the "FaceOfaGuidelinesMobile" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  nextFaceOfaGuidelinesMobile(): void {
    this.FaceOfaGuidelinesMobile += 1;
    this.changeFaceOfaGuidelinesMobile();
  }

  /**
   * This method shows the instruction text and picture for Instagram user to download their personal data.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  changeFaceOfaGuidelinesMobile(): void {
    switch (this.FaceOfaGuidelinesMobile) {
      case 0: {
        this.instructionTextFaceOfaGuidelinesMobile = 'Click on "Menu".';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m1.png';
        break;
      }
      case 1: {
        this.instructionTextFaceOfaGuidelinesMobile =
          ' Click on "Privacy and Settings".';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m2.png';
        break;
      }
      case 2: {
        this.instructionTextFaceOfaGuidelinesMobile =
          'Scroll down and navigate to Your Information and Click on "Off–Facebook Activity". After Step 3 follow Step 4 if you want to select and disconnect specific future activities Step 5 if you want to clear previous activitiy Step 6,7 and 8 if you want to turn OFF Off-Facebook Activity ';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m3.png';
        break;
      }
      case 3: {
        this.instructionTextFaceOfaGuidelinesMobile =
          'Click on "Select activity to disconnect" and put your Facebook password to select the activities you want to disconnect.';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m4.png';
        break;
      }
      case 4: {
        this.instructionTextFaceOfaGuidelinesMobile =
          ' Click on "Clear History" and confirm again by clicking clear history .';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m5.png';
        break;
      }
      case 5: {
        this.instructionTextFaceOfaGuidelinesMobile =
          'Click on "Disconnect future activity".';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m6.png';
        break;
      }
      case 6: {
        this.instructionTextFaceOfaGuidelinesMobile =
          'Turn OFF the "Blue button" in front of future Off-Facebook Activity.';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m7.png';
        break;
      }
      case 7: {
        this.instructionTextFaceOfaGuidelinesMobile =
          'Click on "Turn Off" to confirm.';
        this.instructionPictureFaceOfaGuidelinesMobile =
          '../../assets/images/off-facebook-activity/m8.png';
        break;
      }
      default: {
        this.instructionTextFaceOfaGuidelinesMobile = 'Error';
      }
    }
  }
}

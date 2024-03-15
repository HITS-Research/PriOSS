import { AfterViewInit, Component } from '@angular/core';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

@Component({
  selector: 'app-your-topics',
  templateUrl: './your-topics.component.html',
  styleUrls: ['./your-topics.component.less'],
})
export class YourTopicsComponent implements AfterViewInit {
  async ngAfterViewInit() {
    scrollToTop();
  }
  FaceTopicsGuidelines = 0;
  instructionTextFaceTopicsGuidelines =
    'Firstly follow this link https://accountscenter.facebook.com/ad_preferences to go to Facebook Accounts center and then follow the next steps.';
  instructionPictureFaceTopicsGuidelines = '';

  /**
   * Callback function to decrement the "FaceTopicsGuidelines" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  preFaceTopicsGuidelines(): void {
    this.FaceTopicsGuidelines -= 1;
    this.changeFaceTopicsGuidelines();
  }

  /**
   * Callback function to increment the "FaceTopicsGuidelines" variable.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  nextFaceTopicsGuidelines(): void {
    this.FaceTopicsGuidelines += 1;
    this.changeFaceTopicsGuidelines();
  }

  /**
   * This method shows the instruction text and picture for Instagram user to download their personal data.
   * @author: Mukul Sachdeva (mukuls@mail.uni-paderborn.de)
   *
   */
  changeFaceTopicsGuidelines(): void {
    switch (this.FaceTopicsGuidelines) {
      case 0: {
        this.instructionTextFaceTopicsGuidelines =
          'Firstly follow this link https://accountscenter.facebook.com/ad_preferences to go to Facebook Accounts center and then follow the next steps.';
        this.instructionPictureFaceTopicsGuidelines = '';
        break;
      }
      case 1: {
        this.instructionTextFaceTopicsGuidelines = 'Click on "Ad Topics".';
        this.instructionPictureFaceTopicsGuidelines =
          '../../assets/images/Your-topics/t1.png';
        break;
      }
      case 2: {
        this.instructionTextFaceTopicsGuidelines =
          'Click on "View and manage topics".';
        this.instructionPictureFaceTopicsGuidelines =
          '../../assets/images/Your-topics/t2.png';
        break;
      }
      case 3: {
        this.instructionTextFaceTopicsGuidelines =
          'Select the topic you want to manage.';
        this.instructionPictureFaceTopicsGuidelines =
          '../../assets/images/Your-topics/t3.png';
        break;
      }
      case 4: {
        this.instructionTextFaceTopicsGuidelines =
          'Then select "See less" to see less ads about that particular topic in future.';
        this.instructionPictureFaceTopicsGuidelines =
          '../../assets/images/Your-topics/t4.png';
        break;
      }
      default: {
        this.instructionTextFaceTopicsGuidelines = 'Error';
      }
    }
  }
}

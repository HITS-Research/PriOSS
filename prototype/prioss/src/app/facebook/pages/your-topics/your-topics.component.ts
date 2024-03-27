import { AfterViewInit, Component } from '@angular/core';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

@Component({
  selector: 'app-your-topics',
  templateUrl: './your-topics.component.html',
  styleUrls: ['./your-topics.component.less']
})
export class YourTopicsComponent implements AfterViewInit{

  async ngAfterViewInit(){
    scrollToTop();
  }

  instructionsStepDataWeb: any[] = [
    {
      instructionTextFaceTopicsGuidelines: 'Firstly follow this link https://accountscenter.facebook.com/ad_preferences to go to Facebook Accounts center and then follow the next steps.',
      instructionPictureFaceTopicsGuidelines: ""
    },
    {
      instructionTextFaceTopicsGuidelines: 'Click on "Ad Topics".',
      instructionPictureFaceTopicsGuidelines: "../../assets/images/Your-topics/t1.png"
    },
    {
      instructionTextFaceTopicsGuidelines: 'Click on "View and manage topics".',
      instructionPictureFaceTopicsGuidelines: "../../assets/images/Your-topics/t2.png"
    },
    {
      instructionTextFaceTopicsGuidelines: 'Select the topic you want to manage.',
      instructionPictureFaceTopicsGuidelines: "../../assets/images/Your-topics/t3.png"
    },
    {
      instructionTextFaceTopicsGuidelines: 'Then select "See less" to see less ads about that particular topic in future.',
      instructionPictureFaceTopicsGuidelines: "../../assets/images/Your-topics/t4.png"
    }
  ]

  guidelineStepWeb = 0;
  instructionTextFaceTopicsGuidelines = this.instructionsStepDataWeb[0].instructionTextFaceTopicsGuidelines;
  instructionPictureFaceTopicsGuidelines = this.instructionsStepDataWeb[0].instructionPictureFaceTopicsGuidelines;

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
    this.instructionTextFaceTopicsGuidelines = this.instructionsStepDataWeb[this.guidelineStepWeb].instructionTextFaceTopicsGuidelines;
    this.instructionPictureFaceTopicsGuidelines = this.instructionsStepDataWeb[this.guidelineStepWeb].instructionPictureFaceTopicsGuidelines;
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

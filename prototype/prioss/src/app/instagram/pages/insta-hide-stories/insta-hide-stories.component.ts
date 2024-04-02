import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

/**
 * This component is responsible for providing guidelines to hide stories and videos from specific people.
 * @author: Subhadeep Debnath (sdebnath@mail.uni-paderborn.de)
 *
 */
@Component({
  selector: 'app-insta-hide-stories',
  templateUrl: './insta-hide-stories.component.html',
  styleUrls: ['./insta-hide-stories.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstaHideStoriesComponent implements AfterViewInit {
  
  // Initialize HideStoriesWeb variable to track the current step
  HideStoriesWeb = 0;

  // Initialize instructionTextHideStoriesWeb with the initial instruction text
  instructionTextHideStoriesWeb = 'Open the Instagram webpage in your browser and log into your account.';

  // Initialize instructionPictureHideStoriesWeb with the initial instruction picture
  instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/60.png";

  // Function called after the view is initialized
  async ngAfterViewInit() {
    // Scroll to the top of the page
    scrollToTop();
  }

  // Function to decrement the current step
  preHideStoriesWeb(): void {
    this.HideStoriesWeb -= 1;
    this.HideStorieschangeWeb();
  }

  // Function to increment the current step
  nextHideStoriesWeb(): void {
    this.HideStoriesWeb += 1;
    this.HideStorieschangeWeb();
  }

  // Function to change instruction text and picture based on the current step
  HideStorieschangeWeb(): void {
    switch (this.HideStoriesWeb) {
      case 0: {
        this.instructionTextHideStoriesWeb = 'Open the Instagram webpage in your browser and log into your account.';
        this.instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/60.png";
        break;
      }
      case 1: {
        this.instructionTextHideStoriesWeb = 'While viewing your Instagram feed, tap on the "Profile" button located on the left side of the screen.';
        this.instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/61.png";
        break;
      }
      case 2: {
        this.instructionTextHideStoriesWeb = 'Tap the "Options" icon located in the upper section of your profile.';
        this.instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/62.png";
        break;
      }
      case 3: {
        this.instructionTextHideStoriesWeb = 'From the pop-up menu, select the "Settings and privacy" option.';
        this.instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/63.png";
        break;
      }
      case 4: {
        this.instructionTextHideStoriesWeb = 'From the multiple options available in the left side bar, select "Hide story and live" option.';
        this.instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/64.png";
        break;
      }
      case 5: {
        this.instructionTextHideStoriesWeb = 'Now, tap on "Hide story and live from" and select the number of people from whom you want to hide your stories.';
        this.instructionPictureHideStoriesWeb = "../../assets/images/insta-privacy-recommendations/65.png";
        break;
      }
      default: {
        this.instructionTextHideStoriesWeb = 'Error';
      }
    }
  }
}

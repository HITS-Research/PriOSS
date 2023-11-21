import { AfterViewInit, Component } from '@angular/core';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

/**
  * This component is responsible for providing guidelines to hide stories and videos from specific people.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */

@Component({
  selector: 'app-insta-hide-stories',
  templateUrl: './insta-hide-stories.component.html',
  styleUrls: ['./insta-hide-stories.component.less']
})
export class InstaHideStoriesComponent implements AfterViewInit{
  async ngAfterViewInit(){
    scrollToTop();
  }

  HideStoriesMobile = 0;
  instructionTextHideStoriesMobile = 'First, open your Instagram application on your mobile phone and log into your account.';
  instructionPictureHideStoriesMobile = "../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "HideStoriesMobile" variable.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preHideStoriesMobile(): void {
    this.HideStoriesMobile -= 1;
    this.HideStorieschangeMobile();
  }

  /**
   * Callback function to increment the "HideStoriesMobile" variable.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextHideStoriesMobile(): void {
    this.HideStoriesMobile += 1;
    this.HideStorieschangeMobile();
  }

  /**
   * This method shows the instruction text and picture depending on the step the Mobile user is in.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  HideStorieschangeMobile(): void {
    switch (this.HideStoriesMobile ) {
      case 0: {
        this.instructionTextHideStoriesMobile='First, open your Instagram application on your mobile phone and log into your account.';
        this.instructionPictureHideStoriesMobile="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextHideStoriesMobile='While viewing your Instagram feed, tap on your "profile" icon in the bottom right corner of the screen.';
        this.instructionPictureHideStoriesMobile="../../assets/images/insta-privacy-recommendations/31.png";
        break;
      }
      case 2: {
        this.instructionTextHideStoriesMobile='Tap the "Menu" icon in the upper right corner of your profile.';
        this.instructionPictureHideStoriesMobile="../../assets/images/insta-privacy-recommendations/15.png";
        break;
      }
      case 3: {
        this.instructionTextHideStoriesMobile='Tap the "Settings and privacy" gear icon in the menu that appears.';
        this.instructionPictureHideStoriesMobile="../../assets/images/insta-privacy-recommendations/32.png";
        break;
      }
      case 4: {
        this.instructionTextHideStoriesMobile='Select "Hide story and live" option from the list that appears.';
        this.instructionPictureHideStoriesMobile="../../assets/images/insta-privacy-recommendations/33.png";
        break;
      }
      case 5: {
        this.instructionTextHideStoriesMobile='Now, tap on "Hide story and live from" and select # People from whom you want to hide your stories. On Androids, tap the arrow in the upper left corner of your screen when you have finished adding users to the list. iPhone users should select "Done" in the top right.' ;
        this.instructionPictureHideStoriesMobile="../../assets/images/insta-privacy-recommendations/34.jpg";
        break;
      }
      default: {
        this.instructionTextHideStoriesMobile='Error';
      }
    }
  }
}

import { Component } from '@angular/core';

/**
  * This component is responsible for providing guidelines to hide instagram activity status.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */

@Component({
  selector: 'app-insta-activity-status-hidden',
  templateUrl: './insta-activity-status-hidden.component.html',
  styleUrls: ['./insta-activity-status-hidden.component.less']
})

export class InstaActivityStatusHiddenComponent {
  ActivityHidden = 0;
    instructionTextActivityHidden='First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
    instructionPictureActivityHidden="../../assets/images/insta-privacy-recommendations/login.png";
  
    /**
     * Callback function to decrement the "AActivityHidden" variable.
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */
    preActivityHidden(): void {
      this.ActivityHidden-= 1;
      this.changeActivityHidden();
    }
  
    /**
     * Callback function to increment the "ActivityHidden" variable.
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     */
    nextActivityHidden(): void {
      this.ActivityHidden += 1;
      this.changeActivityHidden();
    }
  
  
    /**
     * This method shows the instruction text and picture depending on the step the user is in for web application.
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */
    changeActivityHidden(): void {
      switch (this.ActivityHidden) {
        case 0: {
          this.instructionTextActivityHidden='First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
          this.instructionPictureActivityHidden="../../assets/images/insta-privacy-recommendations/login.png";
          break;
        }
        case 1: {
          this.instructionTextActivityHidden='You need to click "profile" icon and then, click on "Settings" icon as shown in picture.';
          this.instructionPictureActivityHidden="../../assets/images/insta-privacy-recommendations/2.png";
          break;
        }
        case 2: {
          this.instructionTextActivityHidden='Now, you have to click on "Settings and privacy" option.';
          this.instructionPictureActivityHidden="../../assets/images/insta-privacy-recommendations/41.png";
          break;
        }
        case 3: {
          this.instructionTextActivityHidden='Below click on option “how others can interact with you”.';
          this.instructionPictureActivityHidden="../../assets/images/insta-privacy-recommendations/49.png";
          break;
        }
        case 4: {
          this.instructionTextActivityHidden='Now, tap the icon next to “show activity status” and check/uncheck the toggle button.';
          this.instructionPictureActivityHidden="../../assets/images/insta-privacy-recommendations/50.png";
          break;
        }
        default: {
          this.instructionTextActivityHidden='Error';
        }
      }
    }
  
    ActivityHiddenMobile = 0;
    instructionTextActivityHiddenMobile='First, open Instagram application on your mobile phone.';
    instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/40.png";
  
    /**
     * Callback function to decrement the "ActivityHiddenMobile" variable.
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */
    preActivityHiddenMobile(): void {
      this.ActivityHiddenMobile -= 1;
      this.changeActivityHiddenMobile();
    }
  
    /**
     * Callback function to increment the "ActivityHiddenMobile" variable.
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     */
    nextActivityHiddenMobile(): void {
      this.ActivityHiddenMobile += 1;
      this.changeActivityHiddenMobile();
    }
  
  
    /**
     * This method shows the instruction text and picture depending on the step the user is in for mobile application.
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */
    changeActivityHiddenMobile(): void {
      switch (this.ActivityHiddenMobile) {
        case 0: {
          this.instructionTextActivityHiddenMobile='First, open Instagram application on your mobile phone.';
          this.instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/40.png";
          break;
        }
        case 1: {
          this.instructionTextActivityHiddenMobile='Go to your Instagram profile window by clicking on the "Profile" icon in bottom-right corner of your screen and now, click on the three dots in the top-right corner.';
          this.instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/42.png";
          break;
        }
        case 2: {
          this.instructionTextActivityHiddenMobile='Now, choose "Settings and privacy" option from the list that appears.';
          this.instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/43.png";
          break;
        }
        case 3: {
          this.instructionTextActivityHiddenMobile='Scroll down and you’ll find the "Messages and story replies" option. Click on it. ';
          this.instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/46.png";
          break;
        }
        case 4: {
          this.instructionTextActivityHiddenMobile='Tap on "Show activity status".';
          this.instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/47.png";
          break;
        }
        case 5: {
          this.instructionTextActivityHiddenMobile='Tap the toggle next to Activity Status to turn off your activity status.';
          this.instructionPictureActivityHiddenMobile="../../assets/images/insta-privacy-recommendations/48.png";
          break;
        }
        default: {
          this.instructionTextActivityHiddenMobile='Error';
        }
      }
    }
}

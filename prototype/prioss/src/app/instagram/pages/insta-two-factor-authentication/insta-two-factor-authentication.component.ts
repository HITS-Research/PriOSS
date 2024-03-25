import { Component ,ChangeDetectionStrategy} from '@angular/core';

/**
  * This component is responsible for providing guidelines to turn ON two factor authentication for Instagram.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
 
@Component({
  selector: 'app-insta-two-factor-authentication',
  templateUrl: './insta-two-factor-authentication.component.html',
  styleUrls: ['./insta-two-factor-authentication.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstaTwoFactorAuthenticationComponent {
  TwoFactorAuthentication = 0;
  instructionTextTwoFactorAuthentication='Open your Instagram app on your mobile device. Tap on your profile picture in the bottom right to go to your profile, then tap (3 bars icon) in the top right.';
  instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/9.png";

  /**
   * Callback function to decrement the "TwoFactorAuthentication" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preTwoFactorAuthentication(): void {
    this.TwoFactorAuthentication -= 1;
    this.changeTwoFactorAuthentication();
  }

  /**
   * Callback function to increment the "TwoFactorAuthentication" variable.
   *@author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextTwoFactorAuthentication(): void {
    this.TwoFactorAuthentication += 1;
    this.changeTwoFactorAuthentication();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeTwoFactorAuthentication(): void {
    switch (this.TwoFactorAuthentication) {
      case 0: {
        this.instructionTextTwoFactorAuthentication='Open your Instagram app on your mobile device. Tap on your profile picture in the bottom right to go to your profile, then tap (3 bars icon) in the top right.';
        this.instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/9.png";
        break;
      }
      case 1: {
        this.instructionTextTwoFactorAuthentication='Look for the gear symbol and go in "Settings" option.';
        this.instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/10.png";
        break;
      }
      case 2: {
        this.instructionTextTwoFactorAuthentication='Move through the next screens by tapping "Security" > "Two-factor authentication" > "Get Started".';
        this.instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/11.png";
        break;
      }
      case 3: {
        this.instructionTextTwoFactorAuthentication='You will need to choose your security method. Select "Authentication app (recommended)". Then click on Next button.';
        this.instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/12.png";
        break;
      }
      case 4: {
        this.instructionTextTwoFactorAuthentication='Authenticator App will automatically choose the Instagram logo and autofill account name and secret key. Confirm that it is correct by clicking on "Save". Now, copy the numerical token provided for Instagram. Note that this code refreshes every 30 seconds.';
        this.instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/13.png";
        break;
      }
      case 5: {
        this.instructionTextTwoFactorAuthentication='Return to the Instagram app and type the numerical token in the appropriate field. When done tap on "Next" button.  Your Instagram account is now protected. Press on Next, you are presented with access to your backup codes. Each code can only be used once. We suggest you to store them digitally in a safe place. Press "Done".';
        this.instructionPictureTwoFactorAuthentication="../../assets/images/insta-privacy-recommendations/14.png";
        break;
      }
      default: {
        this.instructionTextTwoFactorAuthentication='Error';
      }
    }
  }
}

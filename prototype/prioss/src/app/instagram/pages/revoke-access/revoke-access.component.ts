import { Component,ChangeDetectionStrategy } from '@angular/core';
/**
  * This component is responsible for providing guidelines to Revoke access to third-party apps.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
@Component({
  selector: 'app-revoke-access',
  templateUrl: './revoke-access.component.html',
  styleUrls: ['./revoke-access.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RevokeAccessComponent {
  RevokeAccess = 0;
  instructionTextRevokeAccess='First, open https://www.instagram.com/ on your computer or mobile browser and log in to your account. This will get you to your account overview.';
  instructionPictureRevokeAccess="../../assets/images/insta-privacy-recommendations/login.png";

  /**
   * Callback function to decrement the "RevokeAccess" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preRevokeAccess(): void {
    this.RevokeAccess -= 1;
    this.changeRevokeAccess();
  }

  /**
   * Callback function to increment the "RevokeAccess" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextRevokeAccess(): void {
    this.RevokeAccess += 1;
    this.changeRevokeAccess();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in for web browser.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeRevokeAccess(): void {
    switch (this.RevokeAccess) {
      case 0: {
        this.instructionTextRevokeAccess='First, open https://www.instagram.com/ on your computer or mobile browser and log in to your account. This will get you to your account overview.';
        this.instructionPictureRevokeAccess="../../assets/images/insta-privacy-recommendations/login.png";
        break;
      }
      case 1: {
        this.instructionTextRevokeAccess=' By clicking on "More" option in the left-bottom corner, select "Settings".';
        this.instructionPictureRevokeAccess="../../assets/images/insta-privacy-recommendations/23.png";
        break;
      }
      case 2: {
        this.instructionTextRevokeAccess='Tap on "Apps and websites" option. Here, you will find a list of the services you have previously given permission to access your Instagram account. There is no need to worry about those on the Expired or Removed lists; they have already had their access revoked. But it is important to check the Active list and remove any apps and services that should no longer have access to your Instagram account.';
        this.instructionPictureRevokeAccess="../../assets/images/insta-privacy-recommendations/29.png";
        break;
      }
      default: {
        this.instructionTextRevokeAccess='Error';
      }
    }
  }

  RevokeAccessMobile = 0;
  instructionTextRevokeAccessMobile='First, open Instagram application on your mobile phone and log in to your account.';
  instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "RevokeAccessMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preRevokeAccessMobile(): void {
    this.RevokeAccessMobile -= 1;
    this.changeRevokeAccessMobile();
  }

  /**
   * Callback function to increment the "RevokeAccessMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextRevokeAccessMobile(): void {
    this.RevokeAccessMobile += 1;
    this.changeRevokeAccessMobile();
  }


  /**
   * This method shows the instruction text and picture depending on the step the Mobile user is in.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeRevokeAccessMobile(): void {
    switch (this.RevokeAccessMobile) {
      case 0: {
        this.instructionTextRevokeAccessMobile='First, open Instagram application on your mobile phone and log in to your account.';
        this.instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextRevokeAccessMobile='Go to your profile window and Tap the "Menu" icon in the upper right corner of your profile.';
        this.instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/15.png";
        break;
      }
      case 2: {
        this.instructionTextRevokeAccessMobile='Tap the "Settings and privacy" gear icon in the menu that appears.';
        this.instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/32.png";
        break;
      }
      case 3: {
        this.instructionTextRevokeAccessMobile='Tap on "Website permissions" option.';
        this.instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/36.png";
        break;
      }
      case 4: {
        this.instructionTextRevokeAccessMobile='Now, click on "Apps and websites" option.';
        this.instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/37.png";
        break;
      }
      case 5: {
        this.instructionTextRevokeAccessMobile=' Here, you will find a list of the services you have previously given permission to access your Instagram account. There is no need to worry about those on the Expired or Removed lists; they have already had their access revoked. But it is important to check the Active list and remove any apps and services that should no longer have access to your Instagram account.';
        this.instructionPictureRevokeAccessMobile="../../assets/images/insta-privacy-recommendations/38.png";
        break;
      }
      default: {
        this.instructionTextRevokeAccessMobile='Error';
      }
    }
  }
}

import { Component } from '@angular/core';

/**
  * This component is responsible for providing guidelines to make instagram profile information private.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
 
@Component({
  selector: 'app-insta-profile-info-private',
  templateUrl: './insta-profile-info-private.component.html',
  styleUrls: ['./insta-profile-info-private.component.less']
})
export class InstaProfileInfoPrivateComponent {
  ProfileInfoPrivate = 0;
  instructionTextProfileInfoPrivate='First, open Instagram Website- https://www.instagram.com/ on your computer or mobile browser and log in to your account. This will get you to your account overview.';
  instructionPictureProfileInfoPrivate="../../assets/images/insta-privacy-recommendations/login.png";

  /**
   * Callback function to decrement the "ProfileInfoPrivate" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   * 
   */
  preProfileInfoPrivate(): void {
    this.ProfileInfoPrivate -= 1;
    this.changeProfileInfoPrivate();
  }

  /**
   * Callback function to increment the "ProfileInfoPrivate" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextProfileInfoPrivate(): void {
    this.ProfileInfoPrivate += 1;
    this.changeProfileInfoPrivate();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in for Web browser.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeProfileInfoPrivate(): void {
    switch (this.ProfileInfoPrivate) {
      case 0: {
        this.instructionTextProfileInfoPrivate='First, open Instagram Website- https://www.instagram.com/ on your computer or mobile browser and log in to your account. This will get you to your account overview.';
        this.instructionPictureProfileInfoPrivate="../../assets/images/insta-privacy-recommendations/login.png";
        break;
      }
      case 1: {
        this.instructionTextProfileInfoPrivate='Now, click on "Profile" icon.';
        this.instructionPictureProfileInfoPrivate="../../assets/images/insta-privacy-recommendations/35.png";
        break;
      }
      case 2: {
        this.instructionTextProfileInfoPrivate='Now, click on "Edit Profile" option and you can edit your information in Bio section.';
        this.instructionPictureProfileInfoPrivate="../../assets/images/insta-privacy-recommendations/22.png";
        break;
      }
      default: {
        this.instructionTextProfileInfoPrivate='Error';
      }
    }
  }

  ProfileInfoPrivateMobile = 0;
  instructionTextProfileInfoPrivateMobile ='First, open Instagram application on your mobile phone and log in to your account.';
  instructionPictureProfileInfoPrivateMobile ="../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "ProfileInfoPrivateMobile" variable.
   *@author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preProfileInfoPrivateMobile (): void {
    this.ProfileInfoPrivateMobile  -= 1;
    this.changeProfileInfoPrivateMobile ();
  }

  /**
   * Callback function to increment the "ProfileInfoPrivateMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextProfileInfoPrivateMobile (): void {
    this.ProfileInfoPrivateMobile  += 1;
    this.changeProfileInfoPrivateMobile ();
  }


  /**
   * This method shows the instruction text and picture depending on the step the Mobile user is in.
   *@author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeProfileInfoPrivateMobile (): void {
    switch (this.ProfileInfoPrivateMobile ) {
      case 0: {
        this.instructionTextProfileInfoPrivateMobile='First, open Instagram application on your mobile phone and log in to your account.';
        this.instructionPictureProfileInfoPrivateMobile ="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextProfileInfoPrivateMobile ='Now, go to your Instagram Profile window and click on "Edit your Profile" option. Now, you can edit your information in Bio section.';
        this.instructionPictureProfileInfoPrivateMobile ="../../assets/images/insta-privacy-recommendations/20.png";
        break;
      }
      default: {
        this.instructionTextProfileInfoPrivateMobile ='Error';
      }
    }
  }

}

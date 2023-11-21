import { Component } from '@angular/core';

@Component({
  selector: 'app-insta-disable-cookies',
  templateUrl: './insta-disable-cookies.component.html',
  styleUrls: ['./insta-disable-cookies.component.less']
})
export class InstaDisableCookiesComponent {
  CookiesDisabled = 0;
  instructionTextCookiesDisabled='First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
  instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/login.png";

  /**
   * Callback function to decrement the "CookiesDisabled" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preCookiesDisabled(): void {
    this.CookiesDisabled -= 1;
    this.changeCookiesDisabled();
  }

  /**
   * Callback function to increment the "CookiesDisabled" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   */
  nextCookiesDisabled(): void {
    this.CookiesDisabled += 1;
    this.changeCookiesDisabled();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in for web application.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeCookiesDisabled(): void {
    switch (this.CookiesDisabled) {
      case 0: {
        this.instructionTextCookiesDisabled='First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/login.png";
        break;
      }
      case 1: {
        this.instructionTextCookiesDisabled='You need to click "profile" icon and then, click on "Settings" icon as shown in picture above.';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/2.png";
        break;
      }
      case 2: {
        this.instructionTextCookiesDisabled='Now, you have to click on "Settings and privacy" option.';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/41.png";
        break;
      }
      case 3: {
        this.instructionTextCookiesDisabled= 'Now, click on "See more in Accounts Center".';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/51.png";
        break;
      } 
      case 4: {
        this.instructionTextCookiesDisabled='Click on option "Your information and permissions" under Account settings.';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/52.png";
        break;
      }
      case 5: {
        this.instructionTextCookiesDisabled='Now, click on "Cookies" and then click on "Manage cookie settings".';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/53.png";
        break;
      }
      case 6: {
        this.instructionTextCookiesDisabled='Now, you can turn off non-essential cookies by clicking on toggle button.';
        this.instructionPictureCookiesDisabled="../../assets/images/insta-privacy-recommendations/54.png";
        break;
      }
      default: {
        this.instructionTextCookiesDisabled='Error';
      }
    }
  }

  CookiesDisabledMobile = 0;
  instructionTextCookiesDisabledMobile='First, open Instagram application on your mobile phone.';
  instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "CookiesDisabledMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preCookiesDisabledMobile(): void {
    this.CookiesDisabledMobile -= 1;
    this.changeCookiesDisabledMobile();
  }

  /**
   * Callback function to increment the "CookiesDisabledMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   */
  nextCookiesDisabledMobile(): void {
    this.CookiesDisabledMobile += 1;
    this.changeCookiesDisabledMobile();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in for mobile application.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeCookiesDisabledMobile(): void {
    switch (this.CookiesDisabledMobile) {
      case 0: {
        this.instructionTextCookiesDisabledMobile='First, open Instagram application on your mobile phone.';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextCookiesDisabledMobile='Go to your Instagram profile window by clicking on the "Profile" icon in bottom-right corner of your screen and now, click on the three dots in the top-right corner.';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/42.png";
        break;
      }
      case 2: {
        this.instructionTextCookiesDisabledMobile='Now, choose "Settings and privacy" option from the list that appears.';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/43.png";
        break;
      }
      case 3: {
        this.instructionTextCookiesDisabledMobile='Now, click on "Accounts Center". ';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/55.png";
        break;
      }
      case 4: {
        this.instructionTextCookiesDisabledMobile='Click on option "Your information and permissions" under Account settings.';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/56.png";
        break;
      }
      case 5: {
        this.instructionTextCookiesDisabledMobile='Now, click on "Cookies" and then click on "Manage cookie settings".';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/57.png";
        break;
      }
      case 6: {
        this.instructionTextCookiesDisabledMobile='Now, you can turn off non-essential cookies by clicking on toggle button.';
        this.instructionPictureCookiesDisabledMobile="../../assets/images/insta-privacy-recommendations/58.png";
        break;
      }
      default: {
        this.instructionTextCookiesDisabledMobile='Error';
      }
    }
  }
}

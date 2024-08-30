import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
  * This component is responsible for providing guidelines to make instagram account private.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
@Component({
  selector: 'app-insta-account-private',
  templateUrl: './insta-account-private.component.html',
  styleUrls: ['./insta-account-private.component.less'],
  standalone: true,
  imports: [
    NzButtonModule,
    NzDividerModule,
    NzImageModule,
    NzStepsModule,
    NzTabsModule,
    TitleBarComponent,
  ]
})
export class InstaAccountPrivateComponent {
  AccountPrivate = 0;
  instructionTextAccountPrivate='First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
  instructionPictureAccountPrivate="../../assets/images/insta-privacy-recommendations/login.png";

  /**
   * Callback function to decrement the "AccountPrivate" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preAccountPrivate(): void {
    this.AccountPrivate -= 1;
    this.changeAccountPrivate();
  }

  /**
   * Callback function to increment the "AccountPrivate" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   */
  nextAccountPrivate(): void {
    this.AccountPrivate += 1;
    this.changeAccountPrivate();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in for web application.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeAccountPrivate(): void {
    switch (this.AccountPrivate) {
      case 0: {
        this.instructionTextAccountPrivate='First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
        this.instructionPictureAccountPrivate="../../assets/images/insta-privacy-recommendations/login.png";
        break;
      }
      case 1: {
        this.instructionTextAccountPrivate='You need to click "profile" icon and then, click on "Settings" icon as shown in picture above.';
        this.instructionPictureAccountPrivate="../../assets/images/insta-privacy-recommendations/2.png";
        break;
      }
      case 2: {
        this.instructionTextAccountPrivate='Now, you have to click on "Settings and privacy" option.';
        this.instructionPictureAccountPrivate="../../assets/images/insta-privacy-recommendations/41.png";
        break;
      }
      case 3: {
        this.instructionTextAccountPrivate='Below Account Privacy, you need to click to check the box next to Private Account.';
        this.instructionPictureAccountPrivate="../../assets/images/insta-privacy-recommendations/3.png";
        break;
      }
      default: {
        this.instructionTextAccountPrivate='Error';
      }
    }
  }

  AccountPrivateMobile = 0;
  instructionTextAccountPrivateMobile='First, open Instagram application on your mobile phone.';
  instructionPictureAccountPrivateMobile="../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "AccountPrivateMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preAccountPrivateMobile(): void {
    this.AccountPrivateMobile -= 1;
    this.changeAccountPrivateMobile();
  }

  /**
   * Callback function to increment the "AccountPrivateMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   */
  nextAccountPrivateMobile(): void {
    this.AccountPrivateMobile += 1;
    this.changeAccountPrivateMobile();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in for web application.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeAccountPrivateMobile(): void {
    switch (this.AccountPrivateMobile) {
      case 0: {
        this.instructionTextAccountPrivateMobile='First, open Instagram application on your mobile phone.';
        this.instructionPictureAccountPrivateMobile="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextAccountPrivateMobile='Go to your Instagram profile window by clicking on the "Profile" icon in bottom-right corner of your screen and now, click on the three dots in the top-right corner.';
        this.instructionPictureAccountPrivateMobile="../../assets/images/insta-privacy-recommendations/42.png";
        break;
      }
      case 2: {
        this.instructionTextAccountPrivateMobile='Now, choose "Settings and privacy" option from the list that appears.';
        this.instructionPictureAccountPrivateMobile="../../assets/images/insta-privacy-recommendations/43.png";
        break;
      }
      case 3: {
        this.instructionTextAccountPrivateMobile='Scroll down and you’ll find the "Account Privacy" option. Click on it. ';
        this.instructionPictureAccountPrivateMobile="../../assets/images/insta-privacy-recommendations/44.png";
        break;
      }
      case 4: {
        this.instructionTextAccountPrivateMobile='Make sure that "Private Account" is ON (The button should turn to Blue). By Activating this option means that only those who follow you can see your online photos.';
        this.instructionPictureAccountPrivateMobile="../../assets/images/insta-privacy-recommendations/45.png";
        break;
      }
      default: {
        this.instructionTextAccountPrivateMobile='Error';
      }
    }
  }

}

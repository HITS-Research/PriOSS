import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
  * This component is responsible for providing guidelines to manage insta advertisements.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
@Component({
  selector: 'app-insta-add-manager',
  templateUrl: './insta-add-manager.component.html',
  styleUrls: ['./insta-add-manager.component.less'],
  standalone: true,
  imports: [
    NzButtonModule,
    NzDividerModule,
    NzImageModule,
    NzStepsModule,
    NzTabsModule,
    NzToolTipModule,
    NzTypographyModule,
    TitleBarComponent,
  ]
})
export class InstaAddManagerComponent {
  AddManager = 0;
  instructionTextAddManager='First, open Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
  instructionPictureAddManager="../../assets/images/insta-privacy-recommendations/login.png";

  /**
   * Callback function to decrement the "AddManager" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preAddManager(): void {
    this.AddManager  -= 1;
    this.changeAddManager();
  }

  /**
   * Callback function to increment the "AddManager" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextAddManager(): void {
    this.AddManager += 1;
    this.changeAddManager();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeAddManager(): void {
    switch (this.AddManager) {
      case 0: {
        this.instructionTextAddManager ='First, open Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/login.png";
        break;
      }
      case 1: {
        this.instructionTextAddManager ='While viewing your Instagram feed, tap on the "Profile" button located on the left side of the screen.';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/61.png";
        break;
      }
      case 2: {
        this.instructionTextAddManager ='Tap the "Options" icon located in the upper section of your profile.';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/62.png";
        break;
      }
      case 3: {
        this.instructionTextAddManager ='From the pop-up menu, select the "Settings and privacy" option.';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/63.png";
        break;
      }
      case 4: {
        this.instructionTextAddManager ='From the Accounts Centre bar, select See more in Accounts Centre.';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/66.png";
        break;
      }
      case 5: {
        this.instructionTextAddManager ='From the window that appears, first select "Ad preferences" and then "See all" option in "Ad topics".';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/67.png";
        break;
      }
      case 6: {
        this.instructionTextAddManager ='Now, you can sort and filter the advertisements according to your preference by clicking "View and manage topics".';
        this.instructionPictureAddManager ="../../assets/images/insta-privacy-recommendations/68.png";
        break;
      }
      default: {
        this.instructionTextAddManager ='Error';
      }
    }
  }

  AddManagerMobile = 0;
  instructionTextAddManagerMobile='First, open your Instagram application on your mobile phone.';
  instructionPictureAddManagerMobile="../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "AddManagerMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preAddManagerMobile(): void {
    this.AddManagerMobile  -= 1;
    this.changeAddManagerMobile();
  }

  /**
   * Callback function to increment the "AddManagerMobile" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextAddManagerMobile(): void {
    this.AddManagerMobile += 1;
    this.changeAddManagerMobile();
  }


  /**
   * This method shows the instruction text and picture depending on the step the user is in.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeAddManagerMobile(): void {
    switch (this.AddManagerMobile) {
      case 0: {
        this.instructionTextAddManagerMobile ='First, open your Instagram application on your mobile phone.';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextAddManagerMobile ='While viewing your Instagram feed, tap on your "Profile" icon in the bottom right corner of the screen.';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/31.png";
        break;
      }
      case 2: {
        this.instructionTextAddManagerMobile ='Tap the "Menu" icon in the upper right corner of your profile.';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/15.png";
        break;
      }
      case 3: {
        this.instructionTextAddManagerMobile ='Tap the "Settings and privacy" gear icon in the menu that appears.';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/32.png";
        break;
      }
      case 4: {
        this.instructionTextAddManagerMobile ='Now click on "Account Center".';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/24.png";
        break;
      }
      case 5: {
        this.instructionTextAddManagerMobile ='Choose the option "Ad preferences".';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/25.png";
        break;
      }
      case 6: {
        this.instructionTextAddManagerMobile ='Now click on "Ad Topis" option. ';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/26.png";
        break;
      }
      case 7: {
        this.instructionTextAddManagerMobile ='Next click on "View and manage topics". ';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/27.png";
        break;
      }
      case 8: {
        this.instructionTextAddManagerMobile ='Now you can sort and filter the advertisements according to your preference. ';
        this.instructionPictureAddManagerMobile ="../../assets/images/insta-privacy-recommendations/28.png";
        break;
      }
      default: {
        this.instructionTextAddManagerMobile ='Error';
      }
    }
  }

}

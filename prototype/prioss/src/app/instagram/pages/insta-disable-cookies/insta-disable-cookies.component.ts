import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

@Component({
  selector: 'app-insta-disable-cookies',
  templateUrl: './insta-disable-cookies.component.html',
  standalone: true,
  imports: [
    NzButtonModule,
    NzDividerModule,
    NzImageModule,
    NzStepsModule,
    NzTabsModule,
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaDisableCookiesComponent {

  /**
   * This method shows the instruction text and picture depending on the step the user is in for web application.
   */
  cookiesDisabledSteps: Step[] = [
    {
      description: 'First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/login.png",
    },
    {
      description: 'You need to click "profile" icon and then, click on "Settings" icon as shown in picture above.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/2.png",
    },
    {
      description: 'Now, you have to click on "Settings and privacy" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/41.png",
    },
    {
      description: 'Now, click on "See more in Accounts Center".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/51.png",
    },
    {
      description: 'Click on option "Your information and permissions" under Account settings.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/52.png",
    },
    {
      description: 'Now, click on "Cookies" and then click on "Manage cookie settings".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/53.png",
    },
    {
      description: 'Now, you can turn off non-essential cookies by clicking on toggle button.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/54.png",
    }
  ];

  /**
   * This method shows the instruction text and picture depending on the step the user is in for mobile application.
   */
  cookiesDisabledMobileSteps: Step[] = [
    {
      description: 'First, open Instagram application on your mobile phone.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/40.png",
    },
    {
      description: 'Go to your Instagram profile window by clicking on the "Profile" icon in bottom-right corner of your screen and now, click on the three dots in the top-right corner.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/42.png",
    },
    {
      description: 'Now, choose "Settings and privacy" option from the list that appears.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/43.png",
    },
    {
      description: 'Now, click on "Accounts Center". ',
      imageUrl: "../../assets/images/insta-privacy-recommendations/55.png",
    },
    {
      description: 'Click on option "Your information and permissions" under Account settings.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/56.png",
    },
    {
      description: 'Now, click on "Cookies" and then click on "Manage cookie settings".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/57.png",
    },
    {
      description: 'Now, you can turn off non-essential cookies by clicking on toggle button.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/58.png",
    }
  ];
}

import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to hide instagram activity status.
 */
@Component({
  selector: 'app-insta-activity-status-hidden',
  templateUrl: './insta-activity-status-hidden.component.html',
  standalone: true,
  imports: [
    NzTabsModule,
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaActivityStatusHiddenComponent {

  /**
   * This method shows the instruction text and picture depending on the step the user is in for web application.
   */
  activityHiddenSteps: Step[] = [
    {
      title: 'Step 1',
      description: 'First, open https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/login.png",
    },
    {
      title: 'Step 2',
      description: 'You need to click "profile" icon and then, click on "Settings" icon as shown in picture.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/2.png",
    },
    {
      title: 'Step 3',
      description: 'Now, you have to click on "Settings and privacy" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/41.png",
    },
    {
      title: 'Step 4',
      description: 'Below click on option “how others can interact with you”.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/49.png",
    },
    {
      title: 'Step 5',
      description: 'Now, tap the icon next to “show activity status” and check/uncheck the toggle button.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/50.png",
    }
  ];

  /**
   * This method shows the instruction text and picture depending on the step the user is in for mobile application.
   */
  activityHiddenMobile: Step[] = [
    {
      title: 'Step 1',
      description: 'First, open Instagram application on your mobile phone.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/40.png",
    },
    {
      title: 'Step 2',
      description: 'Go to your Instagram profile window by clicking on the "Profile" icon in bottom-right corner of your screen and now, click on the three dots in the top-right corner.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/42.png",
    },
    {
      title: 'Step 3',
      description: 'Now, choose "Settings and privacy" option from the list that appears.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/43.png",
    },
    {
      title: 'Step 4',
      description: 'Scroll down and you’ll find the "Messages and story replies" option. Click on it. ',
      imageUrl: "../../assets/images/insta-privacy-recommendations/46.png",
    },
    {
      title: 'Step 5',
      description: 'Tap on "Show activity status".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/47.png",
    },
    {
      title: 'Step 6',
      description: 'Tap the toggle next to Activity Status to turn off your activity status.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/48.png",
    }
  ];
}

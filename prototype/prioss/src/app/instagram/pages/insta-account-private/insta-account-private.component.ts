import { Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to make instagram account private.
 */
@Component({
  selector: 'app-insta-account-private',
  templateUrl: './insta-account-private.component.html',
  standalone: true,
  imports: [
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaAccountPrivateComponent {

  /**
   * This method shows the instruction text and picture depending on the step the user is in for web application.
   */
  accountPrivateSteps: Step[] = [
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
      description: 'Below Account Privacy, you need to click to check the box next to Private Account.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/3.png",
    }
  ];

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to make instagram profile information private.
 */
@Component({
  selector: 'app-insta-profile-info-private',
  templateUrl: './insta-profile-info-private.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzTabsModule,
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaProfileInfoPrivateComponent {
  /**
   * This method shows the instruction text and picture depending on the step the user is in for Web browser.
   */
  profileInfoPrivateSteps: Step[] = [
    {
      description: 'First, open Instagram Website- https://www.instagram.com/ on your computer or mobile browser and log in to your account. This will get you to your account overview.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/login.png",
    },
    {
      description: 'Now, click on "Profile" icon.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/35.png",
    },
    {
      description: 'Now, click on "Edit Profile" option and you can edit your information in Bio section.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/22.png",
    }
  ];

  /**
   * This method shows the instruction text and picture depending on the step the Mobile user is in.
   */
  changeProfileInfoPrivateMobileSteps: Step[] = [
    {
      description: 'First, open Instagram application on your mobile phone and log in to your account.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/40.png",
    },
    {
      description: 'Now, go to your Instagram Profile window and click on "Edit your Profile" option. Now, you can edit your information in Bio section.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/20.png",
    }
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to turn ON two factor authentication for Instagram.
 */
@Component({
  selector: 'app-insta-two-factor-authentication',
  templateUrl: './insta-two-factor-authentication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaTwoFactorAuthenticationComponent {

  /**
   * This method shows the instruction text and picture depending on the step the user is in.
   */
  twoFactorAuthentication: Step[] = [
    {
      description: 'Open your Instagram app on your mobile device. Tap on your profile picture in the bottom right to go to your profile, then tap (3 bars icon) in the top right.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/9.png",
    },
    {
      description: 'Look for the gear symbol and go in "Settings" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/10.png",
    },
    {
      description: 'Move through the next screens by tapping "Security" > "Two-factor authentication" > "Get Started".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/11.png",
    },
    {
      description: 'You will need to choose your security method. Select "Authentication app (recommended)". Then click on Next button.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/12.png",
    },
    {
      description: 'Authenticator App will automatically choose the Instagram logo and autofill account name and secret key. Confirm that it is correct by clicking on "Save". Now, copy the numerical token provided for Instagram. Note that this code refreshes every 30 seconds.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/13.png",
    },
    {
      description: 'Return to the Instagram app and type the numerical token in the appropriate field. When done tap on "Next" button.  Your Instagram account is now protected. Press on Next, you are presented with access to your backup codes. Each code can only be used once. We suggest you to store them digitally in a safe place. Press "Done".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/14.png",
    }
  ];
}

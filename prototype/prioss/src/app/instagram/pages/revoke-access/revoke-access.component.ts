import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
/**
  * This component is responsible for providing guidelines to Revoke access to third-party apps.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
@Component({
  selector: 'app-revoke-access',
  templateUrl: './revoke-access.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzTabsModule,
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})

export class RevokeAccessComponent {

  /**
   * This method shows the instruction text and picture depending on the step the user is in for web browser.
   */
  revokeAccessSteps: Step[] = [
    {
      description: 'First, open https://www.instagram.com/ on your computer or mobile browser and log in to your account. This will get you to your account overview.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/login.png",
    },
    {
      description: ' By clicking on "More" option in the left-bottom corner, select "Settings".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/23.png",
    },
    {
      description: 'Tap on "Apps and websites" option. Here, you will find a list of the services you have previously given permission to access your Instagram account. There is no need to worry about those on the Expired or Removed lists, they have already had their access revoked. But it is important to check the Active list and remove any apps and services that should no longer have access to your Instagram account.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/29.png",
    }
  ];

  /**
   * This method shows the instruction text and picture depending on the step the Mobile user is in.
   */
  revokeAccessMobile: Step[] = [
    {
      description: 'First, open Instagram application on your mobile phone and log in to your account.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/40.png",
    },
    {
      description: 'Go to your profile window and Tap the "Menu" icon in the upper right corner of your profile.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/15.png",
    },
    {
      description: 'Tap the "Settings and privacy" gear icon in the menu that appears.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/32.png",
    },
    {
      description: 'Tap on "Website permissions" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/36.png",
    },
    {
      description: 'Now, click on "Apps and websites" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/37.png",
    },
    {
      description: ' Here, you will find a list of the services you have previously given permission to access your Instagram account. There is no need to worry about those on the Expired or Removed lists; they have already had their access revoked. But it is important to check the Active list and remove any apps and services that should no longer have access to your Instagram account.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/38.png",
    }
  ];
}

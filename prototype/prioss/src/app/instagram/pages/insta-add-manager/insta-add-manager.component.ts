import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to manage insta advertisements.
 */
@Component({
  selector: 'app-insta-add-manager',
  templateUrl: './insta-add-manager.component.html',
  standalone: true,
  imports: [
    NzTabsModule,
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaAddManagerComponent {

  /**
   * This method shows the instruction text and picture depending on the step the user is in.
   */
  addManagerSteps: Step[] = [
    {
      title: 'Step 1',
      description: 'First, open Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/login.png",
    },
    {
      title: 'Step 2',
      description: 'While viewing your Instagram feed, tap on the "Profile" button located on the left side of the screen.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/61.png",
    },
    {
      title: 'Step 3',
      description: 'Tap the "Options" icon located in the upper section of your profile.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/62.png",
    },
    {
      title: 'Step 4',
      description: 'From the pop-up menu, select the "Settings and privacy" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/63.png",
    },
    {
      title: 'Step 5',
      description: 'From the Accounts Centre bar, select See more in Accounts Centre.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/66.png",
    },
    {
      title: 'Step 6',
      description: 'From the window that appears, first select "Ad preferences" and then "See all" option in "Ad topics".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/67.png",
    },
    {
      title: 'Step 7',
      description: 'Now, you can sort and filter the advertisements according to your preference by clicking "View and manage topics".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/68.png",
    }
  ];

  /**
   * This method shows the instruction text and picture depending on the step the user is in.
   */
  addManagerMobileSteps: Step[] = [
    {
      title: 'Step 1',
      description: 'First, open your Instagram application on your mobile phone.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/40.png",
    },
    {
      title: 'Step 2',
      description: 'While viewing your Instagram feed, tap on your "Profile" icon in the bottom right corner of the screen.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/31.png",
    },
    {
      title: 'Step 3',
      description: 'Tap the "Menu" icon in the upper right corner of your profile.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/15.png",
    },
    {
      title: 'Step 4',
      description: 'Tap the "Settings and privacy" gear icon in the menu that appears.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/32.png",
    },
    {
      title: 'Step 5',
      description: 'Now click on "Account Center".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/24.png",
    },
    {
      title: 'Step 6',
      description: 'Choose the option "Ad preferences".',
      imageUrl: "../../assets/images/insta-privacy-recommendations/25.png",
    },
    {
      title: 'Step 7',
      description: 'Now click on "Ad Topis" option. ',
      imageUrl: "../../assets/images/insta-privacy-recommendations/26.png",
    },
    {
      title: 'Step 8',
      description: 'Next click on "View and manage topics". ',
      imageUrl: "../../assets/images/insta-privacy-recommendations/27.png",
    },
    {
      title: 'Step 9',
      description: 'Now you can sort and filter the advertisements according to your preference. ',
      imageUrl: "../../assets/images/insta-privacy-recommendations/28.png",
    }
  ];

}

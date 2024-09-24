import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to hide stories and videos from specific people.
 */
@Component({
  selector: 'app-insta-hide-stories',
  templateUrl: './insta-hide-stories.component.html',
  styleUrls: ['./insta-hide-stories.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaHideStoriesComponent {

  // Function to change instruction text and picture based on the current step
  hideStorieschangeWebSteps: Step[] = [
    {
      description: 'Open the Instagram webpage in your browser and log into your account.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/60.png",
    },
    {
      description: 'While viewing your Instagram feed, tap on the "Profile" button located on the left side of the screen.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/61.png",
    },
    {
      description: 'Tap the "Options" icon located in the upper section of your profile.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/62.png",
    },
    {
      description: 'From the pop-up menu, select the "Settings and privacy" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/63.png",
    },
    {
      description: 'From the multiple options available in the left side bar, select "Hide story and live" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/64.png",
    },
    {
      description: 'Now, tap on "Hide story and live from" and select the number of people from whom you want to hide your stories.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/65.png",
    }
  ];
}

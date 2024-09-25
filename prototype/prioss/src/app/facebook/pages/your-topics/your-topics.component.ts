import { Component } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * @description
 * YourTopicsComponent is responsible for displaying and managing user topics preferences.
 * It provides a step-by-step guide for users to manage their ad topics on Facebook and Instagram.
 */
@Component({
  selector: 'app-your-topics',
  templateUrl: './your-topics.component.html',
  standalone: true,
  imports: [
    StepperComponent,
    TitleBarComponent,
  ]
})
export class YourTopicsComponent {

  instructionsStepDataWeb: Step[] = [
    {
      description: 'Firstly follow this link https://accountscenter.facebook.com/ad_preferences to go to Facebook Accounts center and then follow the next steps.',
      imageUrl: ""
    },
    {
      description: 'Click on "Ad Topics".',
      imageUrl: "../../assets/images/Your-topics/t1.png"
    },
    {
      description: 'Click on "View and manage topics".',
      imageUrl: "../../assets/images/Your-topics/t2.png"
    },
    {
      description: 'Select the topic you want to manage.',
      imageUrl: "../../assets/images/Your-topics/t3.png"
    },
    {
      description: 'Then select "See less" to see less ads about that particular topic in future.',
      imageUrl: "../../assets/images/Your-topics/t4.png"
    }
  ]

}
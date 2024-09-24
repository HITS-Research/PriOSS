import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

/**
 * This component is responsible for providing guidelines to turn off the off-facebook-activity in facebook
 */
@Component({
  selector: 'app-off-facebook-activity',
  templateUrl: './off-facebook-activity.component.html',
  standalone: true,
  imports: [
    StepperComponent,
    NzTabsModule,
    TitleBarComponent,
  ]
})
export class OffFacebookActivityComponent {

  /**
   * Web Version
   */
  instructionsStepDataWeb: Step[] = [
    {
      description: 'Click on "Account" on the top right corner of the page.',
      imageUrl: '../../assets/images/off-facebook-activity/1.png'
    },
    {
      description: ' Click on "Privacy and Settings".',
      imageUrl: '../../assets/images/off-facebook-activity/2.png'
    },
    {
      description: 'Click on "Settings".',
      imageUrl: '../../assets/images/off-facebook-activity/3.png'
    },
    {
      description: 'Navigate to "Off-Facebook activity".',
      imageUrl: '../../assets/images/off-facebook-activity/4.png'
    },
    {
      description: 'Click on "Continue". After Step 5 follow Step 6 if you want to select and disconnect specific future activities Step 7 if you want to clear previous activitiy Step 8 and 9 if you want to turn OFF Off-Facebook Activity',
      imageUrl: '../../assets/images/off-facebook-activity/5.png'
    },
    {
      description: 'Click on "Disconnect specific activitiy" and put your Facebook password to select the activities you want to disconnect.',
      imageUrl: '../../assets/images/off-facebook-activity/6.png'
    },
    {
      description: ' Click on "Clear previous activity" and confirm again by clicking clear.',
      imageUrl: '../../assets/images/off-facebook-activity/7.png'
    },
    {
      description: ' Click on "Manage future activity".',
      imageUrl: '../../assets/images/off-facebook-activity/8.png'
    },
    {
      description: ' Click on "Disconnect future activity".',
      imageUrl: '../../assets/images/off-facebook-activity/9.png'
    }
  ];

  /**
   * Mobile Version
   */
  instructionsStepDataMobile: Step[] = [
    {
      description: 'Click on "Menu".',
      imageUrl: '../../assets/images/off-facebook-activity/m1.png'
    },
    {
      description: ' Click on "Privacy and Settings".',
      imageUrl: '../../assets/images/off-facebook-activity/m2.png'
    },
    {
      description: 'Scroll down and navigate to Your Information and Click on "Off–Facebook Activity". After Step 3 follow Step 4 if you want to select and disconnect specific future activities Step 5 if you want to clear previous activitiy Step 6,7 and 8 if you want to turn OFF Off-Facebook Activity ',
      imageUrl: '../../assets/images/off-facebook-activity/m3.png'
    },
    {
      description: 'Click on "Select activity to disconnect" and put your Facebook password to select the activities you want to disconnect.',
      imageUrl: '../../assets/images/off-facebook-activity/m4.png'
    },
    {
      description: ' Click on "Clear History" and confirm again by clicking clear history .',
      imageUrl: '../../assets/images/off-facebook-activity/m5.png'
    },
    {
      description: 'Click on "Disconnect future activity".',
      imageUrl: '../../assets/images/off-facebook-activity/m6.png'
    },
    {
      description: 'Turn OFF the "Blue button" in front of future Off-Facebook Activity.',
      imageUrl: '../../assets/images/off-facebook-activity/m7.png'
    },
    {
      description: 'Click on "Turn Off" to confirm.',
      imageUrl: '../../assets/images/off-facebook-activity/m8.png'
    }
  ];

}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * This component is responsible for providing guidelines to avoid dark patterns in web applications.
 */
@Component({
  selector: 'app-dark-patterns',
  templateUrl: './dark_patterns.component.html',
  styleUrls: ['./dark_patterns.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StepperComponent, NzIconModule],
})
export class DarkPatternsComponent {

  // Initialize currentStep to track the current step
  initialIndex: number = 0;

  // Steps data to be passed to the stepper component
  #steps: Step[] = [
    {
      title: 'No Reject Button',
      imageUrl: '../assets/images/dark_patterns/DP1.png',
      description: 'A banner without a <strong>reject</strong> button makes it harder for users to opt-out of tracking, nudging them to accept cookies without a clear way to say no.',
    },
    {
      title: 'Pre-ticked Boxes',
      imageUrl: '../assets/images/dark_patterns/DP2.png',
      description: 'Automatically choose an option for you, often leading you to agree to something like receiving promotional emails without explicitly deciding to do so.',
    },
    {
      title: 'Difficult to Reject',
      imageUrl: '../assets/images/dark_patterns/DP3.png',
      description: 'Instead of a clear <strong>no</strong> option, users are directed to another landing page, making it more difficult to decline unwanted tracking or consent.',
    },
    {
      title: 'Deceptive Button',
      imageUrl: '../assets/images/dark_patterns/DP4.png',
      description: 'Using button colors to trick users, like making the <strong>accept</strong> button bright and eye-catching while the "decline" button is dull and less noticeable.',
    },
    {
      title: 'Legitimate Interest',
      imageUrl: '../assets/images/dark_patterns/DP5.png',
      description: 'Claiming a right to use your data without clear consent by saying it is for a legitimate business reason, often bypassing your privacy preferences.',
    },
    {
      title: 'Necessary Cookies',
      imageUrl: '../assets/images/dark_patterns/DP6.png',
      description: 'Labeling marketing cookies, which track your online activity, as <strong>necessary</strong> implying they are needed for the website to function, even though they serve as promotions.',
    }
  ];

  get steps(): Step[] {
    return this.#steps;
  }

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';

/**
 * Displays the download-instructions for the user-data from Spotify.
 * @author Alexander Nickel (nickela(at)mail.uni-paderborn.de)
 */
@Component({
  selector: 'prioss-spotify-data-download',
  template: `
    <prioss-stepper
      [stepIndex]="initialIndex"
      [steps]="steps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StepperComponent],
})
export class DataDownloadSpotifyComponent {

  /**
   * The initial step-index.
   */
  initialIndex: number = 0;

  /**
   * All steps which should be displayed.
   */
  #steps: Step[] = [
    {
      title: 'Step 1',
      description: 'Log in to your Spotify account. Click on your profile picture on the right. Select <b><i>Account</i></b>.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction1.png'
    }, {
      title: 'Step 2',
      description: 'Select <b><i>Privacy settings</i></b> in the <b><i>Security and privacy</i></b> section.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction2.png'
    }, {
      title: 'Step 3',
      description: 'Scroll down to <b><i>Download your data</i></b>. Leave Extended Streaming History and Technical Log Information unselected. Then click on the <b><i>Request Data</i></b> button.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction3.png'
    }, {
      title: 'Step 4',
      description: 'Spotify will now send you your data via the e-mail address that you provided to your account.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction4.png'
    },
  ];

  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }

}

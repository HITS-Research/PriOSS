import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';

/**
 * Displays the download-instructions for the user-data from Spotify.
 * @author Alexander Nickel (nickela(at)mail.uni-paderborn.de)
 */
@Component({
  selector: 'prioss-data-download-spotify',
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
      description: 'Log in to your Spotify account. Click on your profile picture on the left. Select <b><i>Account</i></b>.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction1.png'
    }, {
      title: 'Step 2',
      description: 'Select <b><i>Privacy settings.</i></b>',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction2.png'
    }, {
      title: 'Step 3',
      description: 'Choose <b><i>Select Account Data</i></b>. Leave Extended Streaming History and Technical Log Information unselected. Click on <b><i>Request Data</i></b> button.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction3.png'
    }, {
      title: 'Step 4',
      description: 'You will see a message to confirm your data download request. Check your e-mails to confirm.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction4.png'
    }, {
      title: 'Step 5',
      description: 'Check your e-mail from Spotify and <b><i>Confirm</i></b> via the link in the email.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction5.png'
    }, {
      title: 'Step 6',
      description: 'You will be re-directed to Spotify Privacy Settings page with a notification that your data is getting prepared. You will receive an e-mail from Spotify containing a link in the next few days. The link will redirect you to the Privacy Settings page where you will find a download button. Download the data to your computer.<br>Return to this website after you downloaded your data.',
      imageUrl: '../../assets/images/spot-instructions/spot-instruction6.png'
    },
  ];

  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }

}

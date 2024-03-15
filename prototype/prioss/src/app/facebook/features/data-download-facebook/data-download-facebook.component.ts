import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';

/**
 * Displays the download-instructions for the user-data from Facebook.
 * @author Alexander Nickel (nickela(at)mail.uni-paderborn.de)
 */
@Component({
  selector: 'prioss-data-download-facebook',
  template: `
    <section>
      <h4>Important!</h4>

      <span>
        Use
        <a
          href="https://www.facebook.com/dyi/?referrer=yfi_settings"
          target="_blank"
        >
          this link
        </a>
        to go to the Facebook data download page. We can't see or access any of
        your personal information, like cookies or passwords, by using this
        link. If you're signed into Facebook, the link takes you directly to the
        download page. If not, it takes you to the login page, and then to the
        download page once you sign in. If the link fails, follow the
        instructions below. As Facebook's menu varies by country and language,
        you may need to navigate a bit to find the download page.
      </span>
    </section>

    <prioss-stepper [stepIndex]="initialIndex" [steps]="steps" />
  `,
  styles: `
    section {
      border-style: solid;
      border-color: red;
      border-width: 1.5px;
      padding: 20px;
      margin: 20px;
      font-size: 1.5rem;
    }
    h4 {
      font-size: 2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StepperComponent],
})
export class DataDownloadFacebookComponent {
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
      description: 'Log in to your account, click your profile photo in the top right of Facebook and select <b><i>Settings & privacy</i></b>.',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction1.png'
    }, {
      title: 'Step 2',
      description: 'Click on <b><i>Privacy Centre</i></b>.',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction2.png'
    }, {
      title: 'Step 3',
      description: 'Click on <b><i>Settings</i></b>.',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction3.png'
    }, {
      title: 'Step 4',
      description: 'Select <b><i>Facebook Settings</i></b>.',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction4.png'
    }, {
      title: 'Step 5',
      description: 'Select <b><i>See more in Accounts Centre</i></b>',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction5.png'
    }, {
      title: 'Step 6',
      description: 'Select <b><i>Your information and permissions</i></b>',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction6.png'
    }, {
      title: 'Step 7',
      description: 'Select <b><i>Download your Information</i></b>',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction7.png'
    }, {
      title: 'Step 8',
      description: 'Click on <b><i>Request a download</i></b> <br> Return to this site to download the data once you get the e-mail notification',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction8.png'
    }, {
      title: 'Step 9',
      description: 'Select <b><i>Complete copy</i></b>',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction9.png'
    }, {
      title: 'Step 10',
      description: 'Select a data range of <b><i>All time</i></b>, swap the format to <b><i>JSON</i></b> and change the Media quality to <b><i>high</i></b>, befor clicking <b><i>Submit Request</i></b> <br> It will take multiple days until the data will be available',
      imageUrl: '/../../assets/images/fb-instructions/fb-instruction10.png'
    }
  ];

  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }
}

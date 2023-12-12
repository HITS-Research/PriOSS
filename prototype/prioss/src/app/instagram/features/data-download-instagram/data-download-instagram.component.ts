import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';

/**
 * Displays the download-instructions for the user-data from Instagram.
 * @author Alexander Nickel (nickela(at)mail.uni-paderborn.de)
 */
@Component({
  selector: 'prioss-data-download-instagram',
  template: `
    <section>
      <h4>Disclaimer!</h4>

      <span>
        Unfortunately it is impossible to use the data download option directly in the 'Instagram' app because it only
        allows
        the user to download the data as an 'HTML' file. To visualize your data we need it packed into different 'json'
        files.<br>
        Therefore please follow the upcomming instructions on how to download your data via an internet browser.
      </span>
    </section>

    <prioss-stepper
      [stepIndex]="initialIndex"
      [steps]="steps"
    />
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
export class DataDownloadInstagramComponent {

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
      description: 'Log in to your account, or use this Instagram link <span nz-icon nzType="link"><a href="https://www.instagram.com/" target="_blank">Instagram Website</a> </span> and enter your log in details.',
      imageUrl: '../../assets/images/insta-instructions/login.png'
    }, {
      title: 'Step 2',
      description: 'Now go to <strong><i>More</i></strong> option in the bottom-left corner.',
      imageUrl: '../../assets/images/insta-instructions/31.png'
    }, {
      title: 'Step 3',
      description: 'Select <b><i>Your activity</i></b> option.',
      imageUrl: '../../assets/images/insta-instructions/32.png'
    }, {
      title: 'Step 4',
      description: 'On the page, now click on <b><i>Download your information</i></b> option.',
      imageUrl: '../../assets/images/insta-instructions/33.png'
    }, {
      title: 'Step 5',
      description: 'Verify your e-mail address. Select <b><i>JSON</i></b> format and click on <b><i>Next</i></b>',
      imageUrl: '../../assets/images/insta-instructions/34.png'
    }, {
      title: 'Step 6',
      description: 'Before you go to the final step of requesting your data, make sure that the website is set to <b><i>English</i></b>. You can change that on the bottom of the screen. It is necessary to analyze your data correcty and after requesting your data you can switch back to your favorite language.',
      imageUrl: '../../assets/images/insta-instructions/35.png'
    }, {
      title: 'Step 7',
      description: 'Enter your <b><i>password</i></b> and click <b><i>Request Download</i></b>. <br> After a few minutes to a couple of days, you will receive an email titled <b><i>Your Instagram Data</i></b> with a link to your data. Tap <b><i>Download data</i></b> and follow the instructions to finish downloading your information. <br> Return to this website after you downloaded your data.',
      imageUrl: '../../assets/images/insta-instructions/36.png'
    }
  ];

  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }

}

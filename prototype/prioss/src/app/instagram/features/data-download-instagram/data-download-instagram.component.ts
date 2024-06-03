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
      imageUrl: '../../assets/images/insta-instructions/DD_2.png'
    }, {
      title: 'Step 3',
      description: 'Select <b><i>Your activity</i></b> option.',
      imageUrl: '../../assets/images/insta-instructions/DD_3.png'
    }, {
      title: 'Step 4',
      description: 'Click <b><i>Download your information</i></b> and press on <b><i>Continue</i></b>.',
      imageUrl: '../../assets/images/insta-instructions/DD_5.png'
    }, {
      title: 'Step 5',
      description: 'A pop-up window will open and you have to select <b><i>Download or transfer information</i></b> button.',
      imageUrl: '../../assets/images/insta-instructions/DD_6.png'
    }, {
      title: 'Step 6',
      description: 'A new window from <b><i>Meta</i></b> will open where you have to select your Instagram account.',
      imageUrl: '../../assets/images/insta-instructions/DD_7.png'
    }, {
      title: 'Step 7',
      description: 'A new pop-up window will open, where you have to select between two options for the amount of information. Select <b><i>All available information</i></b> for a full data download, which is recommended. Otherwise, select the other option to validate basic details.',
      imageUrl: '../../assets/images/insta-instructions/DD_8.png'
    }, {
      title: 'Step 8',
      description: 'Select the <b><i>Download to device</i></b> option to download the data to your device, and click <b><i>Next</i></b>.',
      imageUrl: '../../assets/images/insta-instructions/DD_9.png'
    }, {
      title: 'Step 9',
      description: 'In the next step, select <b><i>Format</i></b> option.',
      imageUrl: '../../assets/images/insta-instructions/DD_10.png'
    }, {
      title: 'Step 10',
      description: 'Select <b><i>JSON</i></b> as the format for data download and click <b><i>Save</i></b>. Then click <b><i>Create Files</i></b> to download.',
      imageUrl: '../../assets/images/insta-instructions/DD_11.png'
    }, {
      title: 'Step 11',
      description: 'You will see an <b><i>In Progress</i></b> message from Meta. Shortly, you will receive an email from Meta saying, <b><i>Your Meta information download is ready</i></b>. Open the email and tap on the <b><i>download your information</i></b> link to download.',
      imageUrl: '../../assets/images/insta-instructions/DD_12.png'
    }, {
      title: 'Step 12',
      description: 'A new page from Meta Account Center will open with the <b><i>Download</i></b> button. Click on the button to download the data zip.',
      imageUrl: '../../assets/images/insta-instructions/DD_13.png'
    }
  ];

  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }

}

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
        to go to the Facebook data download page. We can't see or access any of your personal information, like cookies or
        passwords, by using this link. If you're signed into Facebook, the link takes you directly to the download page. If
        not, it takes you to the login page, and then to the download page once you sign in.
        If the link fails, follow the instructions below. As Facebook's menu varies by country and language, you may need to
        navigate a bit to find the download page.
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
      description: 'Log in to your account and click your profile photo in the top right of Facebook.',
      imageUrl: './../assets/images/fb-instructions/fb-instruction1.png'
    }, {
      title: 'Step 2',
      description: 'Select <b><i>Settings & privacy</i></b>.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction2.png'
    }, {
      title: 'Step 3',
      description: 'Click on <b><i>Settings</i></b>.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction3.png'
    }, {
      title: 'Step 4',
      description: 'Select <b><i>Your Facebook Information</i></b>.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction4.png'
    }, {
      title: 'Step 5',
      description: 'Go to <b><i>Download Your Information</i></b> and click on <b><i>View</i></b>.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction5.png'
    }, {
      title: 'Step 6',
      description: 'Select <b><i>JSON</i></b> format, and Date range <b><i>All time</i></b>. By default, the Media quality is High. If you want to reduce the size of your download, you can also set it to Low.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction6.png'
    }, {
      title: 'Step 7',
      description: 'Select <b><i>all</i></b> information to download. Click on <b><i>Request a Download</i></b>.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction7.png'
    }, {
      title: 'Step 8',
      description: 'It will take some time until your download is ready. Once you have received an email notification that the data is ready for download, click on <b><i>Available files</i></b>. You can download the files from here. If you did not get an email after a week, please check the site below manually as the mail might have been missed, for example due to your spam filter.<br>Return to this website after you downloaded your data.',
      imageUrl: '../../assets/images/fb-instructions/fb-instruction8.png'
    }
  ];

  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }

}

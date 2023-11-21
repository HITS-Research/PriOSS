import { Component } from '@angular/core';
import { Router } from '@angular/router';
/**
  * This component is responsible for displaying the Data-Download instructions for the different services in a single page.
  * It integrates the tutorials that were previously displayed directly on the Service Selection page.
  * It Adepts the step-by-step apporach for the instructions initially used by Instagram to the other services
  *
  * @author: Aayushma (aayushma@mail.uni-paderborn.de), Max (maxy@mail.upb.de)
  *
  */
@Component({
  selector: 'app-data-download-instructions',
  templateUrl: './data-download-instructions.component.html',
  styleUrls: ['./data-download-instructions.component.less']
})
export class DataDownloadInstructionsComponent {

/**
  * This method returns the User back to the ServiceSelection page upon beeing called.
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */
returnToServiceSelection(): void {
  this.router.navigate(['serviceSelection']);
}
  
  constructor(private router: Router, 
   )  {
  }

  InstaDataDownload = 0;
  FaceDataDownload = 0;
  SpotDataDownload = 0;
  instructionTextInstaDataDownload='Log in to your account, or use this Instagram link <span nz-icon nzType="link"><a href="https://www.instagram.com/" target="_blank">Instagram Website</a> </span> and enter your log in details.';
  instructionPictureInstaDataDownload="../../assets/images/insta-instructions/login.png";
  instructionTextFaceDataDownload="Log in to your account and click your profile photo in the top right of Facebook.";
  instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction1.png";
  instructionTextSpotDataDownload="Log in to your Spotify account. Click on your profile picture on the left. Select <b><i>Account</i></b>.";
  instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction1.png";

  /**
   * Callback function to decrement the "InstaDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preInstaDataDownload(): void {
    this.InstaDataDownload -= 1;
    this.changeInstaDataDownload();
  }

  /**
   * Callback function to decrement the "FaceDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
    preFaceDataDownload(): void {
      this.FaceDataDownload -= 1;
      this.changeFaceDataDownload();
    }

  /**
   * Callback function to decrement the "SpotDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preSpotDataDownload(): void {
    this.SpotDataDownload -= 1;
    this.changeSpotDataDownload();
  }

  /**
   * Callback function to increment the "InstaDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextInstaDataDownload(): void {
    this.InstaDataDownload += 1;
    this.changeInstaDataDownload();
  }

  /**
   * Callback function to increment the "FaceDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextFaceDataDownload(): void {
      this.FaceDataDownload += 1;
      this.changeFaceDataDownload();
    }

    
  /**
   * Callback function to increment the "SpotDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextSpotDataDownload(): void {
    this.SpotDataDownload += 1;
    this.changeSpotDataDownload();
  }



  /**
   * This method shows the instruction text and picture for Instagram user to download their personal data.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de), Max (maxy@mail.upb.de)
   *
   */
  changeInstaDataDownload(): void {
    switch (this.InstaDataDownload) {
      case 0: {
        this.instructionTextInstaDataDownload='Log in to your account, or use this Instagram link <span nz-icon nzType="link"><a href="https://www.instagram.com/" target="_blank">Instagram Website</a> </span> and enter your log in details.';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/login.png";
        break;
      }
      case 1: {
        this.instructionTextInstaDataDownload='Now go to <strong><i>More</i></strong> option in the bottom-left corner.';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/31.png";
        break;
      }
      case 2: {
        this.instructionTextInstaDataDownload='Select <b><i>Your activity</i></b> option.';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/32.png";
        break;
      }
      case 3: {
        this.instructionTextInstaDataDownload='On the page, now click on <b><i>Download your information</i></b> option.';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/33.png";
        break;
      }
      case 4: {
        this.instructionTextInstaDataDownload='Verify your e-mail address. Select <b><i>JSON</i></b> format and click on <b><i>Next</i></b>';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/34.png";
        break;
      }
      case 5: {
        this.instructionTextInstaDataDownload='Before you go to the final step of requesting your data, make sure that the website is set to <b><i>English</i></b>. You can change that on the bottom of the screen. It is necessary to analyze your data correcty and after requesting your data you can switch back to your favorite language.';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/35.png";
        break;
      }
      case 6: {
        this.instructionTextInstaDataDownload='Enter your <b><i>password</i></b> and click <b><i>Request Download</i></b>. <br> After a few minutes to a couple of days, you will receive an email titled <b><i>Your Instagram Data</i></b> with a link to your data. Tap <b><i>Download data</i></b> and follow the instructions to finish downloading your information. <br> Return to this website after you downloaded your data.';
        this.instructionPictureInstaDataDownload="../../assets/images/insta-instructions/36.png";
        break;
      }
      default: {
        this.instructionTextInstaDataDownload='Error';
      }
    }
  }

  /**
   * This method shows the instruction text and picture for Facebook user to download their personal data.
   * 
   * @author: Aayushma (aayushma@mail.uni-paderborn.de), Max (maxy@mail.upb.de)
   *
   */
  changeFaceDataDownload(): void {
    switch (this.FaceDataDownload) {
      case 0: {
        this.instructionTextFaceDataDownload='Log in to your account and click your profile photo in the top right of Facebook.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction1.png";
        break;
      }
      case 1: {
        this.instructionTextFaceDataDownload='Select <b><i>Settings & privacy</i></b>.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction2.png";
        break;
      }
      case 2: {
        this.instructionTextFaceDataDownload='Click on <b><i>Settings</i></b>.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction3.png";
        break;
      }
      case 3: {
        this.instructionTextFaceDataDownload='Select <b><i>Your Facebook Information</i></b>.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction4.png";
        break;
      }
      case 4: {
        this.instructionTextFaceDataDownload='Go to <b><i>Download Your Information</i></b> and click on <b><i>View</i></b>.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction5.png";
        break;
      }
      case 5: {
        this.instructionTextFaceDataDownload='Select <b><i>JSON</i></b> format, and Date range <b><i>All time</i></b>. By default, the Media quality is High. If you want to reduce the size of your download, you can also set it to Low.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction6.png";
        break;
      }
      case 6: {
        this.instructionTextFaceDataDownload='Select <b><i>all</i></b> information to download. Click on <b><i>Request a Download</i></b>.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction7.png";
        break;
      }
      case 7: {
        this.instructionTextFaceDataDownload='It will take some time until your download is ready. Once you have received an email notification that the data is ready for download, click on <b><i>Available files</i></b>. You can download the files from here. If you did not get an email after a week, please check the site below manually as the mail might have been missed, for example due to your spam filter.<br>Return to this website after you downloaded your data.';
        this.instructionPictureFaceDataDownload="../../assets/images/fb-instructions/fb-instruction8.png";
        break;
      }
      default: {
        this.instructionTextFaceDataDownload='Error';
      }
    }
  }

  /**
   * This method shows the instruction text and picture for Spotify user to download their personal data.
   * 
   * @author: Aayushma (aayushma@mail.uni-paderborn.de), Max (maxy@mail.upb.de)
   *
   */
  changeSpotDataDownload(): void {
    switch (this.SpotDataDownload) {
      case 0: {
        this.instructionTextSpotDataDownload='Log in to your Spotify account. Click on your profile picture on the left. Select <b><i>Account</i></b>.';
        this.instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction1.png";
        break;
      }
      case 1: {
        this.instructionTextSpotDataDownload='Select <b><i>Privacy settings.</i></b>'; // <!--Keep <b><i>Process my Facebook data</i></b> and <b><i>Process my personal data for tailored ads</i></b> selected.-->
        this.instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction2.png";
        break;
      }
      case 2: {
        this.instructionTextSpotDataDownload='Choose <b><i>Select Account Data</i></b>. Leave Extended Streaming History and Technical Log Information unselected. Click on <b><i>Request Data</i></b> button.';
        this.instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction3.png";
        break;
      }
      case 3: {
        this.instructionTextSpotDataDownload='You will see a message to confirm your data download request. Check your e-mails to confirm.';
        this.instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction4.png";
        break;
      }
      case 4: {
        this.instructionTextSpotDataDownload='Check your e-mail from Spotify and <b><i>Confirm</i></b> via the link in the email.';
        this.instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction5.png";
        break;
      }
      case 5: {
        this.instructionTextSpotDataDownload='You will be re-directed to Spotify Privacy Settings page with a notification that your data is getting prepared. You will receive an e-mail from Spotify containing a link in the next few days. The link will redirect you to the Privacy Settings page where you will find a download button. Download the data to your computer.<br>Return to this website after you downloaded your data.';
        this.instructionPictureSpotDataDownload="../../assets/images/spot-instructions/spot-instruction6.png";
        break;
      }
      default: {
        this.instructionTextSpotDataDownload='Error';
      }
    }
  }
}

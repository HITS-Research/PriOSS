import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IntrojsService } from 'src/app/features/introjs/introjs.service';

/**
  * This component is the root component for facebook's dashboard page.
  * This page is shown once a user has successfully uploaded their facebook data-download.
  *
  * @remarks
  * Equivalent components for instagram and spotify exist that define their dashboards
  *
  * @author: rishmamn@campus.uni-paderborn.de rbharmal@mail.upb.de
  *
  */
@Component({
  selector: 'app-face-dashboard',
  templateUrl: './face-dashboard.component.html',
  styleUrls: ['./face-dashboard.component.less']
})

export class FaceDashboardComponent implements AfterViewInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private introService: IntrojsService,
  ) { }

  /**
   * Rectification instruction steps.
   *
   * @current : A pointer to the steps.
   * @rectificationText : Appropriate rectification text as per the step.
   * @rectificationImage : Appropriate rectification image as per the step.
   *
   * @start : To always come to the 1st step.
   * @pre : To go back to previous step from current step.
   * @next : To go to next step from current step.
   *
   * @author: Deepa (dbelvi@mail.upb.de)
   *
   */
  current = 0;
  rectificationText="Choose your country. (Click on the image to zoom-in)";
  rectificationImage="/../../assets/images/fb-rectification/1.png";

  start(): void {
    this.current = 0;
    this.changeContent();
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  /**
  * Updates the rectification visualization regarding the current value.
  *
  * @author: Deepa (dbelvi@mail.upb.de)
  *
  */
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.rectificationText="Choose your country. (Click on the image to zoom-in)";
        this.rectificationImage="/../../assets/images/fb-rectification/1.png"
        break;
      }
      case 1: {
        this.rectificationText="Choose 'Facebook' and appropriate age bracket.";
        this.rectificationImage="/../../assets/images/fb-rectification/2.png"
        break;
      }
      case 2: {
        this.rectificationText="Choose the highlighted options.";
        this.rectificationImage="/../../assets/images/fb-rectification/3.png"
        break;
      }
      case 3: {
        this.rectificationText="Choose the highlighted option.";
        this.rectificationImage="/../../assets/images/fb-rectification/4.png"
        break;
      }
      case 4: {
        this.rectificationText="Enter your information into the text boxes and hit Send.";
        this.rectificationImage="/../../assets/images/fb-rectification/5.png"
        break;
      }
      default: {
        this.rectificationText="Error";
      }
    }
  }

  /**
    * The 'faqs' variable contains the FAQs for Facebook dashboard.
    * To add a new FAQ, add an object with its state, question, and answer.
    *
    * @author: Deepa (dbelvi@mail.upb.de)
    *
  */
  faqs = [
    {
      state: false,
      question: 'What is the purpose of Facebook dashboard?',
      answer: 'The Facebook dashboard presents your personal data in an easily understandable way. This helps you understand what personal data Facebook has been collecting, and how that data is being used. The dashboard also intends to help you excercise your privacy rights by making you more aware of your rights and by guiding you how to excercise your rights.'
    },

    {
      state: false,
      question: 'How does this dashboard help me improve my privacy on Facebook?',
      answer: 'You can go to each visualization tile and inspect your data for its correctness. You can also see how your activities are being tracked. If you do not intend Facebook to know any of your particular personal data, you can follow the instructions mentioned in \'Manage Privacy\' section to manage your permissions and/or privacy.'
    },

    {
      state: false,
      question: 'Can I excercise my privacy rights on this platform?',
      answer: 'This platform helps you excercise your privacy instructions through appropriate instructions. You have to go to your logged-in Facebook account and follow the instructions. Since this platform works offline, without internet, you can not click something here to make changes in your Facebook account!'
    },

    {
      state: false,
      question: 'Is downloading my data compulsory to use the platform?',
      answer: 'No. This platform offers sample data for Facebook. You can explore how your data might look, by using the sample data.'
    },

    {
      state: false,
      question: 'Is my data safe after I upload my data on this platform?',
      answer: 'Yes. This platform can completely run offline, without internet. Make sure to upload your data after you are disconnected from internet. Your data will not leave your computer then!'
    },

    {
      state: false,
      question: 'What are my privacy rights?',
      answer: 'We reccommend you to read your rights as explained in \'GDPR and Your Rights\' section.'
    },

    {
      state: false,
      question: 'How do I excercise my privacy rights?',
      answer: 'By following the instructions mentioned in the \'Manage Privacy\' Section.'
    },

    {
      state: false,
      question: 'Does this platform has any privacy recommedations for my personal Facebook account?',
      answer: 'Yes. Please refer to Privacy Recommendations section.'
    }
  ];

  /**
    * This  method is responsible to navigate to the ads component page.
    * @author: rishmamn@campus.uni-paderborn.de
    *
  */
  adsData() {
    this.router.navigate(['face/ads-related-data']);
  }

  /**
  * This  method is responsible to navigate to the inferred topics component page.
  * @author: rbharmal@mail.upb.de
  *
 */
  navigateToInferredTopics() {
    this.router.navigate(['face/inferred-topics']);
  }

  /**
  * This  method is responsible to navigate to the friends and followers component page.
  * @author: rbharmal@mail.upb.de
  *
 */
  navigateToFriendsAndFollowers() {
    this.router.navigate(['face/connections']);
  }
/**
    * This  method is responsible to navigate to Off-Facebook Activity Guidelines page.
    * @author: mukuls@mail.upb.de
    *
   */
  navigateToOFA() {
      this.router.navigate(['face/configure-off-facebook-activity']);
  }

/**
  * This method starts the tour and sets @param tourCompleted in the @service introjs to true.
  * The boolean is set so not every time the page is navigated to, the tour starts again.
  *
  * @author: Deepa (dbelvi@mail.upb.de)
  */
  ngAfterViewInit(): void  {
    if (this.introService.isFacebookTourCompleted() == false) {
      this.introService.facebookDashboardTour();
      this.introService.setFacebookTourCompleted(true);
    }

  }

  /**
   * This method is called on button click and starts the tour.
   *
   * @author: Deepa (dbelvi@mail.upb.de)
   */
  startTour() {
    this.introService.facebookDashboardTour();
  }
}

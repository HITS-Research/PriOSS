import { Component, ViewChild } from '@angular/core';
import { IntrojsService } from 'src/app/introjs/introjs.service';
import { BaseDashboard } from '../base-dashboard.abstract';
import { Insta_PersonalInfoComponent } from 'src/app/visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaAdsComponent } from 'src/app/visualizations/instagram/insta-ads/insta-ads.component';
import { InstaAccountCreationLoginComponent } from 'src/app/visualizations/instagram/insta-account-creation-login/insta-account-creation-login.component';
import { InstaLikedContentComponent } from 'src/app/visualizations/instagram/insta-liked-content/insta-liked-content.component';

/**
  * This component is the root component for instagram's dashboard page.
  * This page is shown once a user has successfully uploaded their instagram data-download.
  *
  * @remarks
  * Equivalent components for facebook and spotify exist that define their dashboards
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
@Component({
  selector: 'app-insta-dashboard',
  templateUrl: './insta-dashboard.component.html',
  styleUrls: ['./insta-dashboard.component.less']
})
export class InstaDashboardComponent extends BaseDashboard{

  purposes = [
    {
      active: false,
      name: 'What is the purpose of this website?',
      content: 'This website serves as a Privacy One-stop Shop for users. Our primary objective is to empower users who provide their data by offering them valuable insights and enabling them to make informed decisions. By utilizing our platform, users can gain a better understanding of how their data is collected and take appropriate actions if they are dissatisfied with the current data collection practices. Additionally, we provide comprehensive information about the purposes behind data collection and educate users about their privacy rights. Our goal is to promote transparency and empower individuals to have greater control over their personal information.'
    },
    {
      active: false,
      name: 'What types of user data does this website collect?',
      content: 'Our website operates with full offline functionality, which means that none of the user data available through uploaded data-downloads is sent to any server. All data processing occurs locally on your device, ensuring that your information remains secure and under your control. Furthermore, when you leave the Dashboard, you have the option to delete all locally processed data. Still not fully convinced ? No worries ! Just disconnect your internet before uploading your data and turn it back on after leaving the website. The application works fully offline after loading it once.'
    },
    {
      active: false,
      name: 'Who developed this website?',
      content: 'We are a Team called PriOSS and made up of students from the University of Paderborn. This website is a Student Project developed with a passion for privacy during the Course „Project Group: a Privacy One-Stop Shop“ over the course of one year between October 2022 and September 2023. To get more information about us and the project, visit our About Us page',
    },
    {
      active: false,
      name: 'How can I improve my privacy?',
      content: 'Instagram provides some information and security tips at their help center (linked below). This can help you to improve the security for your Instagram account.',
      link: 'https://help.instagram.com/369001149843369/?helpref=hc_fnav',
      linkLabel: 'Instagram help center'
    }
  ];
  current = 0;
  rectificationInstructionText="Choose your country.";
  rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step1.png"

  //Components to Initialize Sequentially
  @ViewChild(Insta_PersonalInfoComponent) instaPersonalInfo : Insta_PersonalInfoComponent;
  @ViewChild(InstaAdsComponent) instaAds : InstaAdsComponent;
  @ViewChild(InstaAccountCreationLoginComponent) instaAccount : InstaAccountCreationLoginComponent;
  @ViewChild(InstaLikedContentComponent) instaLikedContent: InstaLikedContentComponent;

  constructor( private introService: IntrojsService) { 
    super();
  }

  /**
  * Updates the rectification visualization regarding the current value.
  * @author: Melina (kleber@mail.uni-paderborn.de)
  * 
  */
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.rectificationInstructionText="Choose your country.";
        this.rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step1.png"
        break;
      }
      case 1: {
        this.rectificationInstructionText="Choose the highlighted options.";
        this.rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step2.png"
        break;
      }
      case 2: {
        this.rectificationInstructionText="Choose the highlighted option.";
        this.rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step3.png"
        break;
      }
      case 3: {
        this.rectificationInstructionText="Choose the highlighted option.";
        this.rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step4.png"
        break;
      }
      case 4: {
        this.rectificationInstructionText="Enter your information into the text boxes.";
        this.rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step5.png"
        break;
      }
      default: {
        this.rectificationInstructionText="Error";
      }
    }
  }

  /**
    * This method starts the tour and sets @param tourCompleted in the @service introjs to true.
    * The boolean is set so not every time the page is navigated to, the tour starts again.
    * It also starts the visualization initialization workflow
    * 
    * @author: Melina (kleber@mail.uni-paderborn.de), Paul (pasch@mail.upb.de)
    */
  ngAfterViewInit(): void  {
    if (this.introService.isInstagramTourCompleted() == false) {
      this.introService.instagramDashboardTour();
      this.introService.setInstagramTourCompleted(true);
    }

    //Component initialization
    //Add components to component Initialization list from BaseDashboard
    this.componentInitializationList = [];
    this.componentInitializationList.push(this.instaPersonalInfo);
    this.componentInitializationList.push(this.instaAds);
    this.componentInitializationList.push(this.instaAccount);
    this.componentInitializationList.push(this.instaLikedContent);
    //Start Component Initialization run
    this.startSequentialInitialization();
  }

  /**
  * This method is called on button click and starts the tour.
  */
  startTour() {
    this.introService.instagramDashboardTour();
  }

  /**
  * Decrease the "current" variable.
  * @author: Melina (kleber@mail.uni-paderborn.de)
  * 
  */
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  /**
  * Increases the "current" variable.
  * @author: Melina (kleber@mail.uni-paderborn.de)
  * 
  */
  next(): void {
    this.current += 1;
    this.changeContent();
  }
}

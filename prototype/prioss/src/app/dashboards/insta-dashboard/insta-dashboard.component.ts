import { Component, ViewChild } from '@angular/core';
import { IntrojsService } from 'src/app/introjs/introjs.service';
import { BaseDashboard } from '../base-dashboard.abstract';
import { Insta_PersonalInfoComponent } from 'src/app/visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaAdsComponent } from 'src/app/visualizations/instagram/insta-ads/insta-ads.component';
import { InstaAccountCreationLoginComponent } from 'src/app/visualizations/instagram/insta-account-creation-login/insta-account-creation-login.component';
import { InstaFollowersComponent } from 'src/app/visualizations/instagram/insta-followers/insta-followers.component';
import { InstaLikedContentComponent } from 'src/app/visualizations/instagram/insta-liked-content/insta-liked-content.component';
import { InstaContactComponent } from 'src/app/visualizations/instagram/insta-contact/insta-contact.component';

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
  current = 0;
  rectificationInstructionText="Choose your country.";
  rectificationInstructionPicture="/../../assets/images/insta-rectifcation/step1.png"

  //Components to Initialize Sequentially
  @ViewChild(Insta_PersonalInfoComponent) instaPersonalInfo : Insta_PersonalInfoComponent;
  @ViewChild(InstaAdsComponent) instaAds : InstaAdsComponent;
  @ViewChild(InstaAccountCreationLoginComponent) instaAccount : InstaAccountCreationLoginComponent;
  @ViewChild(InstaFollowersComponent) instaFollower : InstaFollowersComponent;
  @ViewChild(InstaLikedContentComponent) instaLikedContent: InstaLikedContentComponent;
  @ViewChild(InstaContactComponent) instaContact : InstaContactComponent;

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
    this.componentInitializationList.push(this.instaFollower);
    this.componentInitializationList.push(this.instaContact);
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

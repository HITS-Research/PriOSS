import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AccordionComponent } from 'src/app/features/accordion/accordion.component';
import { DashCardComponent } from 'src/app/features/dash-card/dash-card.component';
import { HelpButtonComponent } from 'src/app/features/help-button/help-button.component';
import { OfflineIndicatorComponent } from 'src/app/features/offline-indicator/offline-indicator.component';
import { SettingsFormComponent } from 'src/app/features/settings-form/settings-form.component';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { BaseDashboard } from 'src/app/features/utils/base-dashboard.abstract';
import { WelcomeMessageComponent } from 'src/app/framework/pages/welcome/welcome.component';
import { Insta_PersonalInfoComponent } from 'src/app/instagram/pages/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from 'src/app/instagram/pages/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAdsComponent } from 'src/app/instagram/pages/insta-ads/insta-ads.component';
import { InstaContactComponent } from 'src/app/instagram/pages/insta-contact/insta-contact.component';
import { InstaFollowersComponent } from 'src/app/instagram/pages/insta-followers/insta-followers.component';
import { InstaLikedContentComponent } from 'src/app/instagram/pages/insta-liked-content/insta-liked-content.component';
import { InstaMessagesComponent } from 'src/app/instagram/pages/insta-messages/insta-messages.component';
import { InstaSearchesComponent } from 'src/app/instagram/pages/insta-searches/insta-searches.component';
import { InstaShoppingComponent } from 'src/app/instagram/pages/insta-shopping/insta-shopping.component';
import { InstaYourTopicComponent } from 'src/app/instagram/pages/insta-your-topic/insta-your-topic.component';
import { InstagramDashboardIntroductionService } from '../../features/dashboard-introduction/instagram-dashboard-introduction.service';
import { InstaPurposesComponent } from '../insta-purposes/insta-purposes.component';

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
  styleUrls: ['./insta-dashboard.component.less'],
  standalone: true,
  imports: [
    AccordionComponent,
    DashCardComponent,
    HelpButtonComponent,
    Insta_PersonalInfoComponent,
    InstaAccountCreationLoginComponent,
    InstaAdsComponent,
    InstaContactComponent,
    InstaFollowersComponent,
    InstaLikedContentComponent,
    InstaMessagesComponent,
    InstaPurposesComponent,
    InstaSearchesComponent,
    InstaShoppingComponent,
    InstaYourTopicComponent,
    NzButtonModule,
    NzDividerModule,
    NzGridModule,
    NzImageModule,
    NzTypographyModule,
    OfflineIndicatorComponent,
    SettingsFormComponent,
    StepperComponent,
    WelcomeMessageComponent,
  ]
})
export class InstaDashboardComponent extends BaseDashboard implements AfterViewInit {
  //Components to Initialize Sequentially
  @ViewChild(Insta_PersonalInfoComponent) instaPersonalInfo: Insta_PersonalInfoComponent;
  @ViewChild(InstaAdsComponent) instaAds: InstaAdsComponent;
  @ViewChild(InstaAccountCreationLoginComponent) instaAccount: InstaAccountCreationLoginComponent;
  @ViewChild(InstaFollowersComponent) instaFollower: InstaFollowersComponent;
  @ViewChild(InstaLikedContentComponent) instaLikedContent: InstaLikedContentComponent;
  @ViewChild(InstaContactComponent) instaContact: InstaContactComponent;
  @ViewChild(InstaSearchesComponent) instaSearches: InstaSearchesComponent;
  @ViewChild(InstaShoppingComponent) instaShopping: InstaShoppingComponent;
  @ViewChild(InstaYourTopicComponent) instaYourTopic: InstaYourTopicComponent;
  @ViewChild(InstaMessagesComponent) instaMessages: InstaMessagesComponent;

  #introductionService = inject(InstagramDashboardIntroductionService);

  /**
   * Updates the rectification visualization regarding the current value.
   */
  rectificationSteps: Step[] = [
    {
      description: "Choose your country.",
      imageUrl: "/../../assets/images/insta-rectifcation/step1.png",
    },
    {
      description: "Choose the highlighted options.",
      imageUrl: "/../../assets/images/insta-rectifcation/step2.png",
    },
    {
      description: "Choose the highlighted option.",
      imageUrl: "/../../assets/images/insta-rectifcation/step3.png",
    },
    {
      description: "Choose the highlighted option.",
      imageUrl: "/../../assets/images/insta-rectifcation/step4.png",
    },
    {
      description: "Enter your information into the text boxes.",
      imageUrl: "/../../assets/images/insta-rectifcation/step5.png",
    }
  ];

  /**
    * This method starts the tour and sets @param tourCompleted in the @service introjs to true.
    * The boolean is set so not every time the page is navigated to, the tour starts again.
    * It also starts the visualization initialization workflow
    *
    * @author: Melina (kleber@mail.uni-paderborn.de), Paul (pasch@mail.upb.de)
    */
  ngAfterViewInit(): void {
    this.#introductionService.start();

    //Component initialization
    //Add components to component Initialization list from BaseDashboard
    this.componentInitializationList = [];
    this.componentInitializationList.push(this.instaPersonalInfo);
    this.componentInitializationList.push(this.instaAds);
    this.componentInitializationList.push(this.instaAccount);
    this.componentInitializationList.push(this.instaFollower);
    this.componentInitializationList.push(this.instaContact);
    this.componentInitializationList.push(this.instaLikedContent);
    this.componentInitializationList.push(this.instaSearches);
    this.componentInitializationList.push(this.instaShopping);
    this.componentInitializationList.push(this.instaYourTopic);
    this.componentInitializationList.push(this.instaMessages);

    //Start Component Initialization run
    this.startSequentialInitialization();
  }

  /**
  * This method is called on button click and starts the tour.
  */
  startTour() {
    this.#introductionService.start(true);
  }

}

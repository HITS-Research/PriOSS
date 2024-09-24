import { NgIf } from '@angular/common';
import { type AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from "@angular/router";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { AccordionComponent } from 'src/app/features/accordion/accordion.component';
import { DashCardComponent } from 'src/app/features/dash-card/dash-card.component';
import { HelpButtonComponent } from 'src/app/features/help-button/help-button.component';
import { OfflineIndicatorComponent } from 'src/app/features/offline-indicator/offline-indicator.component';
import { SettingsFormComponent } from 'src/app/features/settings-form/settings-form.component';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { WelcomeMessageComponent } from 'src/app/framework/pages/welcome/welcome.component';
import { FacebookDashboardIntroductionService } from '../../features/dashboard-introduction/facebook-dashboard-introduction.service';
import { AdsRelatedDataComponent } from '../ads-related-data/ads-related-data.component';
import { FacePurposesComponent } from '../face-purposes/face-purposes.component';
import { FriendAndFollowersComponent } from '../friend-and-followers/friend-and-followers.component';
import { GeneralDataComponent } from '../general-data/general-data.component';
import { GroupsAndEventsDataComponent } from '../groups-and-events-data/groups-and-events-data.component';
import { FacebookMediaComponent } from '../media/media.component';
import { MessagesComponent } from '../messages/messages.component';
import { OtherPersonalInfoComponent } from '../other-personal-info/other-personal-info.component';
import { PostsComponent } from '../posts/posts.component';
import { SecurityLoginDataComponent } from '../security-login-data/security-login-data.component';


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
  styleUrls: ['./face-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AccordionComponent,
    AdsRelatedDataComponent,
    DashCardComponent,
    FacebookMediaComponent,
    FacePurposesComponent,
    FriendAndFollowersComponent,
    GeneralDataComponent,
    GroupsAndEventsDataComponent,
    HelpButtonComponent,
    MessagesComponent,
    NgIf,
    NzDividerModule,
    NzGridModule,
    NzImageModule,
    OfflineIndicatorComponent,
    OtherPersonalInfoComponent,
    PostsComponent,
    SecurityLoginDataComponent,
    SettingsFormComponent,
    StepperComponent,
    WelcomeMessageComponent,
  ]
})
export class FaceDashboardComponent implements AfterViewInit {
  #introductionService = inject(FacebookDashboardIntroductionService);
  cardHeight = signal<string>('400px');
  cardWidth = signal<string>('260px');
  #router = inject(Router);

  /**
   * Rectification-Steps for the Stepper-Component.
   */
  rectificationSteps: Step[] = [
    {
      description: 'Choose your country. (Click on the image to zoom-in)',
      imageUrl: '/../../assets/images/fb-rectification/1.png',
    },
    {
      description: 'Choose \'Facebook\' and appropriate age bracket.',
      imageUrl: '/../../assets/images/fb-rectification/2.png',
    },
    {
      description: 'Choose the highlighted options.',
      imageUrl: '/../../assets/images/fb-rectification/3.png',
    },
    {
      description: 'Choose the highlighted option.',
      imageUrl: '/../../assets/images/fb-rectification/4.png',
    },
    {
      description: 'Enter your information into the text boxes and hit Send. (In "What data processing activity... ?" write "use of my personal data to show me personalized ads")',
      imageUrl: '/../../assets/images/fb-rectification/5.png',
    }
  ];

  /**
   * This  method is responsible to navigate to the ads component page.
   * @author: rishmamn@campus.uni-paderborn.de
   *
   */
  adsData() {
    this.#router.navigate(['facebook/ads-related-data']);
  }

  /**
   * This  method is responsible to navigate to the inferred topics component page.
   * @author: rbharmal@mail.upb.de
   *
   */
  navigateToInferredTopics() {
    this.#router.navigate(['facebook/inferred-topics']);
  }

  /**
   * This  method is responsible to navigate to the friends and followers component page.
   * @author: rbharmal@mail.upb.de
   *
   */
  navigateToFriendsAndFollowers() {
    this.#router.navigate(['facebook/connections']);
  }
  /**
   * This  method is responsible to navigate to Off-Facebook Activity Guidelines page.
   * @author: mukuls@mail.upb.de
   *
   */
  navigateToOFA() {
    this.#router.navigate(['facebook/configure-off-facebook-activity']);
  }

  /**
   * Starts the initial dashboard-tour.
   */
  async ngAfterViewInit(): Promise<void> {
    this.#introductionService.start();
  }

  /**
   * Restarts the dashboard-tour.
   */
  startTour() {
    this.#introductionService.start(true);
  }
}

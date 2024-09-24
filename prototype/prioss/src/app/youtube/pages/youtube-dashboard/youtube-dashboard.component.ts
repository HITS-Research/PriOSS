import { Component, inject, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { AccordionComponent } from "../../../features/accordion/accordion.component";
import { DashCardComponent } from "../../../features/dash-card/dash-card.component";
import { HelpButtonComponent } from "../../../features/help-button/help-button.component";
import { OfflineIndicatorComponent } from "../../../features/offline-indicator/offline-indicator.component";
import { SettingsFormComponent } from "../../../features/settings-form/settings-form.component";
import { WelcomeMessageComponent } from "../../../framework/pages/welcome/welcome.component";
import { YouTubeDashboardIntroductionService } from '../../features/dashboard-introduction/youtube-dashboard-introduction.service';
import YouTubeUserDataModel from "../../state/models/youtube-user-data.model";
import { YouTubeState } from "../../state/youtube.state";
import { YoutubeChannelVideoComponent } from "../youtube-channel-video/youtube-channel-video.component";
import { YoutubeChatComponent } from "../youtube-chat/youtube-chat.component";
import { YoutubeCommentComponent } from "../youtube-comment/youtube-comment.component";
import { YoutubeHistoryComponent } from "../youtube-history/youtube-history.component";
import { YoutubePlaylistComponent } from "../youtube-playlist/youtube-playlist.component";
import { YoutubeProfileComponent } from "../youtube-profile/youtube-profile.component";
import { YoutubePurposesComponent } from "../youtube-purpose/youtube-purpose.component";
import { YoutubeSubscriptionComponent } from "../youtube-subscription/youtube-subscription.component";

@Component({
  selector: 'prioss-youtube-dashboard',
  templateUrl: './youtube-dashboard.component.html',
  styleUrls: ['./youtube-dashboard.component.less'],
  standalone: true,
  imports: [
    AccordionComponent,
    DashCardComponent,
    HelpButtonComponent,
    NzButtonModule,
    NzDividerModule,
    NzGridModule,
    NzImageModule,
    NzTypographyModule,
    OfflineIndicatorComponent,
    SettingsFormComponent,
    StepperComponent,
    WelcomeMessageComponent,
    YoutubeProfileComponent,
    YoutubeChannelVideoComponent,
    YoutubeSubscriptionComponent,
    YoutubeCommentComponent,
    YoutubeChatComponent,
    YoutubePlaylistComponent,
    YoutubeHistoryComponent,
    YoutubePurposesComponent,
  ]
})
export class YoutubeDashboardComponent implements OnInit {
  userData: YouTubeUserDataModel;
  #introductionService = inject(YouTubeDashboardIntroductionService);
  currentStep = 0;

  /**
   * Rectification-Steps for the Stepper-Component.
   * Detailed and user-friendly step descriptions.
   */
  rectificationSteps: Step[] = [
    { description: "Navigate to the YouTube Help Center and select 'My YouTube account or channel' for specific account issues.", imageUrl: "/assets/images/youtube-rectification/step1.png" },
    { description: "Choose the option 'I want to contact YouTube support' to proceed with submitting your query.", imageUrl: "/assets/images/youtube-rectification/step2.png" },
    { description: "Fill out the form detailing your issue and attach any relevant files that support your case.", imageUrl: "/assets/images/youtube-rectification/step3.png" },
    { description: "Check this box if you'd like to receive email updates about your support inquiry. This will allow Google to send you feedback requests once your case is resolved", imageUrl: "/assets/images/youtube-rectification/step4.png" },
    { description: "If you need further assistance, consider posting to the Help Community to get answers from other users.", imageUrl: "/assets/images/youtube-rectification/step5.png" }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userData = this.store.selectSnapshot(YouTubeState.getUserData);
  }

  /**
   * Restarts the dashboard-tour.
   */
  startTour() {
    this.#introductionService.start(true);
  }
}

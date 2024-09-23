import { Component, inject, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import YouTubeUserDataModel from "../../state/models/youtube-user-data.model";
import { YouTubeDashboardIntroductionService } from '../../features/dashboard-introduction/youtube-dashboard-introduction.service';
import { YouTubeState } from "../../state/youtube.state";
import {AccordionComponent} from "../../../features/accordion/accordion.component";
import {DashCardComponent} from "../../../features/dash-card/dash-card.component";
import {HelpButtonComponent} from "../../../features/help-button/help-button.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {OfflineIndicatorComponent} from "../../../features/offline-indicator/offline-indicator.component";
import {SettingsFormComponent} from "../../../features/settings-form/settings-form.component";
import {WelcomeMessageComponent} from "../../../framework/pages/welcome/welcome.component";
import {YoutubeProfileComponent} from "../youtube-profile/youtube-profile.component";
import {YoutubeChannelVideoComponent} from "../youtube-channel-video/youtube-channel-video.component";
import {YoutubeSubscriptionComponent} from "../youtube-subscription/youtube-subscription.component";
import {YoutubeCommentComponent} from "../youtube-comment/youtube-comment.component";
import {YoutubeChatComponent} from "../youtube-chat/youtube-chat.component";
import {YoutubePlaylistComponent} from "../youtube-playlist/youtube-playlist.component";
import {YoutubeHistoryComponent} from "../youtube-history/youtube-history.component";
import {YoutubePurposesComponent} from "../youtube-purpose/youtube-purpose.component";

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
    NzStepsModule,
    NzTypographyModule,
    OfflineIndicatorComponent,
    SettingsFormComponent,
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

  // Detailed and user-friendly step descriptions
  steps = [
    { text: "Navigate to the YouTube Help Center and select 'My YouTube account or channel' for specific account issues.", picture: "/assets/images/youtube-rectification/step1.png" },
    { text: "Choose the option 'I want to contact YouTube support' to proceed with submitting your query.", picture: "/assets/images/youtube-rectification/step2.png" },
    { text: "Fill out the form detailing your issue and attach any relevant files that support your case.", picture: "/assets/images/youtube-rectification/step3.png" },
    { text: "Check this box if you'd like to receive email updates about your support inquiry. This will allow Google to send you feedback requests once your case is resolved", picture: "/assets/images/youtube-rectification/step4.png" },
    { text: "If you need further assistance, consider posting to the Help Community to get answers from other users.", picture: "/assets/images/youtube-rectification/step5.png" }
  ];
  rectificationInstructionText: string;
  rectificationInstructionPicture: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userData = this.store.selectSnapshot(YouTubeState.getUserData);
    this.updateRectificationContent();
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateRectificationContent();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateRectificationContent();
    }
  }

  updateRectificationContent(): void {
    const currentStepData = this.steps[this.currentStep];
    this.setRectificationContent(currentStepData.text, currentStepData.picture);
  }

  setRectificationContent(text: string, picture: string): void {
    this.rectificationInstructionText = text;
    this.rectificationInstructionPicture = picture;
  }


  /**
   * Restarts the dashboard-tour.
   */
  startTour() {
    this.#introductionService.start(true);
  }
}

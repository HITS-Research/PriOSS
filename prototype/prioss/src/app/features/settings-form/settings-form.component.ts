import { Component, Input, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpotPrivacySettingsService } from '../../spotify/features/privacy/spot-privacy-settings.service';
import { InstaPrivacySettingsService } from '../../instagram/features/privacy/insta-privacy-settings.service';
import { FacePrivacySettingsService } from '../../facebook/features/privacy/face-privacy-settings.service';

/**
 * This component displayes the currently named "privacy judge" in a tile on the dashbooard. This tile first displays a question to the user.
 * Based on these questions a "How to Check" Tutorial is displayed so the user can answer the question.
 * Below that, a user can choose an answer and receive advice that corresponds to the initial question and the user's answer.
 * The Data for this component is loaded thorugh the facebook/instagram/spot-privacy-settings.service.ts files in the parent directory.
 *
 * @author: Maximilian (maxy@mail.upb.de)
 *
 */
@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SettingsFormComponent implements OnInit{
  settingsForm: UntypedFormGroup;
  index = 0
  panel = {name: "How to Check ?"}
  @Input() service: string;

  settings = [
    {
      question : "",
      howToCheck : "",
      options : [
        { label: '', value: '', advice: "" },
        { label: '', value: '', advice: "" }
                ]
    }]

    finish = [ //used to display the finish-message and clear advice and options fields. The above settings is changed by then.
      {
        question : "Good Job! You properly checked all your privacy settings",
        howToCheck : "",
        options : []
      }]

    isFinish = false

  optionList = this.settings?.[this.index]["options"]
  question = this.settings[this.index]["question"]
  howToCheck = this.settings[this.index]["howToCheck"]
  selectedValue : { label: string, value: string, advice?: string } | null = null // needed for clearing the forms options (choices)

  constructor(private fb: FormBuilder, private spotPrivacySettingsService: SpotPrivacySettingsService,
    private instaPrivacySettingsService: InstaPrivacySettingsService, private facePrivacySettingsService: FacePrivacySettingsService) {
  }

  /**
   * This method is needed, becausea the "service" value is not available on class initialization. Only later (when the ngOnInit method is started) will it be available
   * Initializes the privacy settings judge with values for the corresponding service. E.g. Spotify
   *
   * @author: Maximilian (maxy@mail.upb.de)
   *
   */
  ngOnInit() {
    if(this.service === "Spotify") {
      this.settings = this.spotPrivacySettingsService.settings
    }
    else if(this.service === "Instagram") {
      this.settings = this.instaPrivacySettingsService.settings
    }
    else if(this.service === "Facebook") {
      this.settings = this.facePrivacySettingsService.settings
    }
    this.optionList = this.settings[this.index]["options"]
    this.question = this.settings[this.index]["question"]
    this.howToCheck = this.settings[this.index]["howToCheck"]
    this.selectedValue = null
  }


  /**
   * Called by a "Forward" button in the front-end to go to the next question.
   * This Method uses an index to shift the displayed information in the privacy settings judge by one option to the next element.
   *
   * @author: Maximilian (maxy@mail.upb.de)
   *
   */
  onNext() {
    if(this.index < this.settings.length) {
      this.index++;
    }
    if(this.index >= this.settings.length) {
      this.optionList = this.finish[0]["options"]
      this.question = this.finish[0]["question"]
      this.howToCheck = this.finish[0]["howToCheck"]
      this.selectedValue = null
      this.isFinish = true
    }
    else{
      this.optionList = this.settings[this.index]["options"]
      this.question = this.settings[this.index]["question"]
      this.howToCheck = this.settings[this.index]["howToCheck"]
      this.selectedValue = null
    }

  }

  /**
   * Called by a "Backward" button in the front-end to go to the previous question.
   * This Method uses an index to shift the displayed information in the privacy settings judge by one option to the previous element.
   *
   * @author: Maximilian (maxy@mail.upb.de)
   *
   */
  onPrev() {
    if(this.index > 0) {
      this.index--;
    }
    if(this.index < this.settings.length) {
      this.isFinish = false
    }
    this.optionList = this.settings[this.index]["options"]
    this.question = this.settings[this.index]["question"]
    this.howToCheck = this.settings[this.index]["howToCheck"]
    this.selectedValue = null
  
  }

}

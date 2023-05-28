import { Component, Input } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpotPrivacySettingsService } from '../spot-privacy-settings.service';
import { InstaPrivacySettingsService } from '../insta-privacy-settings.service';
import { FacePrivacySettingsService } from '../face-privacy-settings.service';


@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.less']
})
export class SettingsFormComponent {
  settingsForm: UntypedFormGroup;
  index = 0
  selectedOption: any;
  panel = {name: "How to Check ?"}
  @Input("service") service: string;

  settings = [
    {
      Question : "",
      HowToCheck : "",
      Options : [
        { label: '', value: '', advice: "" },
        { label: '', value: '', advice: "" }
                ]
    }]
  optionList = this.settings[this.index]["Options"]
  question = this.settings[this.index]["Question"]
  howToCheck = this.settings[this.index]["HowToCheck"]
  selectedValue = { label: 'Option 1', value: 'option1', advice: "" } // needed for clearing the forms options (choices)
  
  /**
   * This method is needed, becausea the "service" value is not available on class initialization. Only later (when the ngOnInit method is started) will it be available
   * Initializes the privacy settings judge with values for the corresponding service. E.g. Spotify
   * 
   * @author: Maximilian (maxy@mail.upb.de)
   *
   */
  ngOnInit() {
    console.log("service:" + this.service)
    if(this.service === "Spotify") {
      this.settings = this.spotPrivacySettingsService.settings
    }
    else if(this.service === "Instagram") {
      this.settings = this.instaPrivacySettingsService.settings
    }
    else if(this.service === "Facebook") {
      this.settings = this.facePrivacySettingsService.settings
    }
    this.optionList = this.settings[this.index]["Options"]
    this.question = this.settings[this.index]["Question"]
    this.howToCheck = this.settings[this.index]["HowToCheck"]
    this.selectedValue = { label: 'Option 1', value: 'option1', advice: "" }
  }

  constructor(private fb: FormBuilder, private spotPrivacySettingsService: SpotPrivacySettingsService, 
    private instaPrivacySettingsService: InstaPrivacySettingsService, private facePrivacySettingsService: FacePrivacySettingsService) {
  }


  onNext() {
    this.index++;
    if(this.index >= this.settings.length) {
      this.index = 0;
    }
    this.optionList = this.settings[this.index]["Options"]
    this.question = this.settings[this.index]["Question"]
    this.howToCheck = this.settings[this.index]["HowToCheck"]
    this.selectedValue = { label: 'Option 1', value: 'option1', advice: "" }
  }

  onPrev() {
    this.index--;
    if(this.index < 0) {
      this.index = this.settings.length-1;
    }
    this.optionList = this.settings[this.index]["Options"]
    this.question = this.settings[this.index]["Question"]
    this.howToCheck = this.settings[this.index]["HowToCheck"]
    this.selectedValue = { label: 'Option 1', value: 'option1', advice: "" }
  }

  log2(selectedOption: any): void {
    console.log(selectedOption);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpotPrivacySettingsService } from '../spot-privacy-settings.service';


@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.less']
})
export class SettingsFormComponent {
  settingsForm: UntypedFormGroup;
  panel = {name: "How to Check ?"}

  settings = {
    setting1: {
      Question : "Public Profile?",
      HowToCheck : "Go to your Spotify settings ... 1",
      Options : [
        { label: 'Option 23', value: 'option23', advice: "dont kill yourself" },
        { label: 'Option 22', value: 'option2', advice: "change it" }
                ]
    },
    setting2: {
      Question : "Sharing User Data with Spotify ?",
      HowToCheck : "Go to your Spotify settings ... 2",
      Options : [
        { label: 'Option 99', value: 'option23', advice: "welp now google knows it too" },
        { label: 'Option 98', value: 'option2', advice: "dont care" }
      ]
    } }

  selectedOption: any;
  optionList = this.settings["setting1"]["Options"]
  question = this.settings["setting2"]["Question"]
  howToCheck = this.settings["setting2"]["HowToCheck"]
  selectedValue = { label: 'Option 1', value: 'option1', advice: "" }

  constructor(private fb: FormBuilder, private spotPrivacySettingsService: SpotPrivacySettingsService) {
  }

  onSubmit() {
      this.selectedValue = { label: 'Option 1', value: 'option1', advice: "" }
      this.optionList = this.settings["setting2"]["Options"]
      this.question = this.settings["setting2"]["Question"]
      this.howToCheck = this.settings["setting2"]["HowToCheck"]
  }

  log2(selectedOption: any): void {
    console.log(selectedOption);
  }
}

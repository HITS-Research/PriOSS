import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacePrivacySettingsService {
  settings = [
    {
      Question : "Public Profile?",
      HowToCheck : "",
      Options : [
        { label: "Option 1", value: "option1", advice: "Bad" },
        { label: "Option 2", value: "option2", advice: "Good" }
                ]
    },
    {
      Question : "",
      HowToCheck : "",
      Options : [
        { label: "", value: "", advice: "" },
        { label: "", value: "", advice: "" }
      ]
    } ]
}

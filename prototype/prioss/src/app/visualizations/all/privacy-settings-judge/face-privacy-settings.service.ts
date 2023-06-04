import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacePrivacySettingsService {
  settings = [
    {
      question : "Public Profile?",
      howToCheck : "",
      options : [
        { label: "option 1", value: "option1", advice: "Bad" },
        { label: "option 2", value: "option2", advice: "Good" }
                ]
    },
    {
      question : "",
      howToCheck : "",
      options : [
        { label: "", value: "", advice: "" },
        { label: "", value: "", advice: "" }
      ]
    } ]
}

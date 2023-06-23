import { Injectable } from '@angular/core';

/**
 * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook and Instragram)
 * For detailed information on the variable and on how to embed the privacy settings module to the Dashboard please refer to the documentation
 * Documentation File: "Privacy-Settings Module information.md"
 * 
 * @author: Maximilian (maxy@mail.upb.de)
 *
 */
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

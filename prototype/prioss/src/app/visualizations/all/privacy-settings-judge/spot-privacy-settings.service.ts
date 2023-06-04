import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotPrivacySettingsService {
  /**
   * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook and Instragram)
   * For detailed information on the variable and on how to embed the privacy settings module to the Dashboard please refer to the documentation
   * Documentation File: "Privacy-Settings Module information.md"
   * 
   * @author: Maximilian (maxy@mail.upb.de)
   *
   */

  settings = [
    {
      question : "Are you getting tailored advertisments ?",
      howToCheck : "<strong>Text Guide:</strong> Go to <a target='_blank' href='https://Spotify.com'>Spotify.com</a> &#8594 On the top-right press on the small icon of a person &#8594 click on 'Account' &#8594 Privacy settings <br> <br> <strong>Picture Guide:</strong> -- Link Here --",
      options : [
        { label: "Yes", value: "yes", advice: "No Idea if its Good" },
        { label: "No", value: "no", advice: "change it" }
                ]
    },
    {
      question : "Is your Facebook data linked to your acount?",
      howToCheck : "<strong>Text Guide:</strong> Go to <a target='_blank' href='https://Spotify.com'>Spotify.com</a> &#8594 On the top-right press on the small icon of a person &#8594 click on 'Account' &#8594 Privacy settings <br> <br> <strong>Picture Guide:</strong> -- Link Here --",
      options : [
        { label: "Yes", value: "yes", advice: "welp now google knows it too" },
        { label: "No", value: "no", advice: "Doesnt really matter" }
      ]
    } ]

}

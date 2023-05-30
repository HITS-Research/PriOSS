import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotPrivacySettingsService {
  settings = [
    {
      Question : "Are you getting tailored advertisments ?",
      HowToCheck : "<strong>Text Guide:</strong> Go to <a target='_blank' href='https://Spotify.com'>Spotify.com</a> &#8594 On the top-right press on the small icon of a person &#8594 click on 'Account' &#8594 Privacy settings <br> <br> <strong>Picture Guide:</strong> -- Link Here --",
      Options : [
        { label: "Yes", value: "yes", advice: "No Idea if its Good" },
        { label: "No", value: "no", advice: "change it" }
                ]
    },
    {
      Question : "Is your Facebook data linked to your acount?",
      HowToCheck : "<strong>Text Guide:</strong> Go to <a target='_blank' href='https://Spotify.com'>Spotify.com</a> &#8594 On the top-right press on the small icon of a person &#8594 click on 'Account' &#8594 Privacy settings <br> <br> <strong>Picture Guide:</strong> -- Link Here --",
      Options : [
        { label: "Yes", value: "yes", advice: "welp now google knows it too" },
        { label: "No", value: "no", advice: "Doesnt really matter" }
      ]
    } ]

}

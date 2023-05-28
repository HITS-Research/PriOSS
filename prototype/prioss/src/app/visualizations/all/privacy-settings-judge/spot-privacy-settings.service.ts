import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotPrivacySettingsService {
  settings = [
    {
      Question : "Public Profile?",
      HowToCheck : "Go to your Spotify settings ... 1",
      Options : [
        { label: "Option 23", value: "option23", advice: "No Idea if its Good" },
        { label: "Option 22", value: "option22", advice: "change it" }
                ]
    },
    {
      Question : "Sharing User Data with Spotify ?",
      HowToCheck : "Go to your Spotify settings ... 2",
      Options : [
        { label: "Option 99", value: "option99", advice: "welp now google knows it too" },
        { label: "Option 98", value: "option98", advice: "Doesnt really matter" }
      ]
    } ]

}

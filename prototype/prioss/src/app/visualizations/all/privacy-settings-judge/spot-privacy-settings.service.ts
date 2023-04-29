import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotPrivacySettingsService {
  settings = {
    setting1: {
      Question : "Public Profile?",
      HowToCheck : "Go to your Spotify settings ...",
      Choices : ["choice1", "choice2"],
      Advices : ["advice1", "advice2"] // Advices correspond with choices. Hence advice 1 will be given if the user selects choice 1 and so on.
    },
    setting2: {
      Question : "Sharing User Data with Spotify ?",
      HowToCheck : "Go to your Spotify settings ...",
      Choices : ["choice1", "choice2"],
      Advices : ["advice1", "advice2"]
    }
  };
}

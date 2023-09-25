import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacePrivacySettingsService {
  /**
   * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook and Instragram)
   * For detailed information on the variable and on how to embed the privacy settings module to the Dashboard please refer to the documentation
   * Documentation File: "Privacy-Settings Module information.md"
   * 
   * @author: Maximilian (maxy@mail.upb.de)
   *
   */

  /***
   * Questions are in-line with the instructions provided in the Privacy Recommendations section.
   * More questions will be added as and when they are explored.
   * 
   *  @author: Deepa Belvi (dbelvi@mail.upb.de)
   */

  
  settings = [
    {
      question : "Is your Facebook account password strong enough?",
      howToCheck : "Facebook doesn't provide a direct feature to check the strength of your password.",
      options : [
        { label: "Yes", value: "yes", advice: "Good. Enable 2-Factor authentication for strong security." },
        { label: "No", value: "no", advice: "Set your password using some general guidelines: use a unique sequence of characters, avoid using personal information like your name or date-of-birth, avoid using common and guessable passwords like 'password' or '123456' etc. " }
      ]
    },
    {
      question : "Do you review your Privacy settings often?",
      howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 Go to 'Settings and Privacy' &#8594 Go to 'Privacy Checkup'. <br> <br> <strong> Facebook Link: </strong> Please look <a target='_blank' href='https://www.facebook.com/privacy/checkup/?source=settings_and_privacy'>here</a> for detailed instructions. <br> Go to <a target='_blank' href='https://www.facebook.com/settings?tab=privacy&view'> this link </a> to review and modify your privacy settings.",
      options : [
        { label: "Yes", value: "yes", advice: "Good. It is a good practice to review your privacy settings and be aware of your rights." },
        { label: "No", value: "no", advice: "Need attention! It is recommended to be aware of the available Privacy settings and excercise your rights. Please look at the link under 'How to Check' for detailed instructions." }
                ]
    },
    {
      question : "Is your profile Public or Private?",
      howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 Go to 'Settings and Privacy' &#8594 Go to 'Settings' &#8594 Click on 'Profile & Tagging' on side menu bar. <br> <br> <strong>Facebook Link:</strong> Please look at this <a target='_blank' href='https://www.facebook.com/settings?tab=timeline'>link</a> to excercise your privacy settings",
      options : [
        { label: "Private", value: "private", advice: "Good. It is recommended to keep your profile private and control the visibility." },
        { label: "Public", value: "public", advice: "Need attention! Control who can view your profile information by adjusting the privacy settings. You can choose to make your profile visible to friends only or customize it further." }
      ]
    },
    {
      question : "Are your posts public or private?",
      howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 Go to 'Settings and Privacy' &#8594 Go to 'Settings' &#8594 Click on 'Public posts' on side menu bar.<br> <br> <strong>Facebook Link:</strong> Please look at this <a target='_blank' href='https://www.facebook.com/settings?tab=followers'>link</a> to change Posts related settings",
      options : [
        { label: "Private", value: "private", advice: "Good. It is best practice to control who views your posts based on their sensitivity." },
        { label: "Public", value: "public", advice: "Need attention! Consider sharing personal updates and sensitive information with a smaller audience by using the 'Friends' or 'Custom' privacy settings." }
      ]
    },
    {
      question : "Do you control your data used to show you personalized ads?",
      howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 Go to 'Settings and Privacy' &#8594 Go to 'Settings' &#8594 Click on 'Your Facebook Information' on the left menu &#8594 Click on 'Off-Facebook Activity' &#8594 Choose to 'Clear Previous Activity' and 'Manage Future Activity'.<br> <br> <strong>Picture Guide:</strong> You can click <a target='_blank' href='https://www.facebook.com/off_facebook_activity'> here</a> or follow the guided instructions <a target='_blank' href='face/configure-off-facebook-activity'>here</a>",
      options : [
        { label: "Yes", value: "yes", advice: "Good. It is best practice to control what personal data you share with Facebook." },
        { label: "No", value: "no", advice: "Need attention! It is recommended to be aware of what personal data is been monitored to show you personalized ads. It is your right to control what Facebook is allowed to know about your activities online." }
      ]
    },
    {
      question : "Are you aware of App Privacy Settings?",
      howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 Go to 'Settings and Privacy' &#8594 Go to 'Settings' &#8594 Click on 'Apps and websites' on the left menu &#8594 Click on 'Turn off' for 'Apps, websites and games'<br> <br> <strong>Facebook Link:</strong> You can click <a target='_blank' href='https://www.facebook.com/settings?tab=applications&ref=settings'>here</a> to make changes.",
      options : [
        { label: "Yes", value: "yes", advice: "Good. Be aware of what third-party apps are accessing your personal data and control the data sharing. " },
        { label: "No", value: "no", advice: "Need attention! It is recommended to regularly review and manage the privacy settings of apps you have authorized to access your Facebook account. Remove any unnecessary or outdated apps from the list." }
      ]
    }
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // },
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // },
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // },
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // },
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // },
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // },
    // {
    //   question : "",
    //   howToCheck : "<strong>Text Guide:</strong> Login to your Facebook account &#8594 Click on you Account on the top right corner &#8594 <br> <br> <strong>Picture Guide:</strong>",
    //   options : [
    //     { label: "", value: "", advice: "" },
    //     { label: "", value: "", advice: "" }
    //   ]
    // }
  ]
}

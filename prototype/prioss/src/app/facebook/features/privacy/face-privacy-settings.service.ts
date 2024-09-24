import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
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
      question: "Is your Facebook account password strong enough?",
      howToCheck: "Use your favorite Password Manager. Never check your password strength on random websites. You can checkout current password recommendations by the Electronic Frontier Foundation <a target='_blank' href='https://www.eff.org/de/dice'>here</a>",
      options: [
        {
          label: "Yes",
          value: "yes",
          advice: "Good job. For even better security, think about turning on two-factor authentication.",
        },
        {
          label: "No",
          value: "no",
          advice: `Please view the "How To Check" section for a link to password recommendations.`,
        },
      ],
    },
    {
      question: "Do you often check your Privacy settings?",
      howToCheck: `<strong>How to do it:</strong> Log into Facebook → Click on your Account in the top right → Go to 'Settings and Privacy' → Click 'Privacy Checkup'. <br><br> <strong>Facebook links:</strong> For step-by-step help, go to <a target='_blank' href='https://www.facebook.com/privacy/checkup/?source=settings_and_privacy'>this page</a>. <br> To look at and change your privacy settings, use <a target='_blank' href='https://www.facebook.com/settings?tab=privacy&view'>this link</a>.`,
      options: [
        {
          label: "Yes",
          value: "yes",
          advice: "Good job. It's smart to keep an eye on your privacy settings and know your rights.",
        },
        {
          label: "No",
          value: "no",
          advice: "It's important to know about your Privacy settings and use them. Check out the 'How to do it' section for help.",
        },
      ],
    },
    {
      question: "Is your Facebook profile Public or Private?",
      howToCheck: `<strong>How to do it:</strong> Log into Facebook → Click on your Account in the top right → Go to 'Settings and Privacy' → Click 'Settings' → Click 'Profile & Tagging' on the left side. <br><br> <strong>Facebook link:</strong> To change your settings, go to <a target='_blank' href='https://www.facebook.com/settings?tab=timeline'>this page</a>.`,
      options: [
        {
          label: "Private",
          value: "private",
          advice: "Good job. It's smart to keep your profile private and control who can see it.",
        },
        {
          label: "Public",
          value: "public",
          advice: "You might want to change this. Try limiting who can see your profile info by updating your privacy settings. You can make it visible to just friends or set it up how you want.",
        },
      ],
    },
    {
      question: "Are your Facebook posts Public or Private?",
      howToCheck: `<strong>How to do it:</strong> Log into Facebook → Click on your Account in the top right → Go to 'Settings and Privacy' → Click 'Settings' → Click 'Public posts' on the left side. <br><br> <strong>Facebook link:</strong> To change your post settings, go to <a target='_blank' href='https://www.facebook.com/settings?tab=followers'>this page</a>.`,
      options: [
        {
          label: "Private",
          value: "private",
          advice: "Good job. It's smart to control who sees your posts, especially personal ones.",
        },
        {
          label: "Public",
          value: "public",
          advice: "You might want to change this. For personal updates or private info, think about sharing with just friends or a custom group of people.",
        },
      ],
    },
    {
      question: "Do you control what data is used to show you personalized ads?",
      howToCheck: `<strong>How to do it:</strong> Log into Facebook → Click on your Account in the top right → Go to 'Settings and Privacy' → Click 'Settings' → Click 'Your Facebook Information' on the left → Click 'Off-Facebook Activity' → Choose 'Clear Previous Activity' and 'Manage Future Activity'. <br><br> <strong>Facebook links:</strong> You can go straight there <a target='_blank' href='https://www.facebook.com/off_facebook_activity'>here</a> or follow the step-by-step guide <a target='_blank' href='facebook/configure-off-facebook-activity'>here</a>.`,
      options: [
        {
          label: "Yes",
          value: "yes",
          advice: "Good job. It's smart to control what personal info you share with Facebook.",
        },
        {
          label: "No",
          value: "no",
          advice: "You might want to look into this. It's good to know what personal info Facebook uses for ads. You have the right to control what Facebook knows about what you do online.",
        },
      ],
    },
    {
      question: "Do you know about App Privacy Settings?",
      howToCheck: `<strong>How to do it:</strong> Log into Facebook → Click on your Account in the top right → Go to 'Settings and Privacy' → Click 'Settings' → Click 'Apps and websites' on the left → Click 'Turn off' for 'Apps, websites and games'. <br><br> <strong>Facebook link:</strong> You can make changes <a target='_blank' href='https://www.facebook.com/settings?tab=applications&ref=settings'>here</a>.`,
      options: [
        {
          label: "Yes",
          value: "yes",
          advice: "Good job. Keep an eye on which apps can see your personal info and control what you share.",
        },
        {
          label: "No",
          value: "no",
          advice: "It's a good idea to check and manage the privacy settings for apps that can use your Facebook account. Remove any apps you don't use or need anymore.",
        },
      ],
    },
  ];
}

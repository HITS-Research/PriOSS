import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotPrivacySettingsService {
  /**
   * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook and Instragram)
   * For detailed information on the variable and on how to embed the privacy settings module to the Dashboard please refer to the documentation
   * Documentation File: "Privacy-Settings Module information.md"
   */

  settings = [
    {
      question: 'Are you receiving personalized ads?',
      howToCheck: "<strong>Text Guide:</strong> Log in to <a target='_blank' href='https://accounts.spotify.com/en/login'>Spotify</a> &#8594 Privacy settings &#8594 Check if tailored ads are enabled. <br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Spotify and its partners serve tailored ads based on inferred interests, but the criteria are unclear. Our dashboard shows these inferences, though Spotify offers no further explanation. Consider disabling this option.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'From a privacy perspective, this is a smart choice, as the ads you receive won\'t rely on opaque profiling',
        },
      ],
    },
    {
      question: 'Is your Facebook data linked to your account?',
      howToCheck: "<strong>Text Guide:</strong> Log in to <a target='_blank' href='https://accounts.spotify.com/en/login'>Spotify</a> &#8594 Privacy settings &#8594 Check if Facebook data processing is enabled. <br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'This option lets you find Facebook friends on Spotify and vice versa. However, it\'s unclear what additional data is shared. We recommend disabling this feature.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'It\'s a good idea to deactivate this option to protect your privacy. While it helps connect with Facebook friends, the extent of data sharing is unclear, so turning it off adds an extra layer of security.'
        },
      ],
    },
    {
      question: 'Do you share your registration data for marketing purposes?',
      howToCheck:
        "<strong>Text Guide:</strong> Log in to <a target='_blank' href='https://accounts.spotify.com/en/login'>Spotify</a> &#8594 Edit profile &#8594 Check if sharing registration data is enabled.<br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>. Registration data are for example username, date of birth, gender, country or your region, your profile-picture, your social media info, preferences or your device information.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'You are currently sharing your registration data for marketing purposes, which may include your name, email, or other account and private details. For better privacy protection, consider disabling this option to limit data sharing.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'You are not sharing your registration data for marketing purposes, which helps protect your personal information. To enhance your privacy further, regularly review your settings and remain vigilant about data sharing.'
        },
      ],
    },
    {
      question: 'Can other people see your followers and the people you follow?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click the icon in the top right corner, select settings &#8594 Scroll to the Social section &#8594 Check if sharing your follower lists is enabled. <br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'You are currently sharing your follower lists, which may expose your social connections. To enhance your privacy, consider disabling this option to limit what others can see.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'You are not sharing your follower lists, which helps protect your social connections. For further privacy, regularly review your settings and be cautious about any data sharing options.',
        },
      ],
    },
    {
      question: 'Do you share what songs you are listening to with your followers?',
      howToCheck: "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click the icon in the top right corner, select settings &#8594 Scroll to the Social section &#8594 Check if sharing your listening activity is enabled. <br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'The songs you listen to can reveal hints about your mood, and there may be tracks you prefer to keep private. While this information is only shared with your followers, anyone can follow you without your prior permission. To enhance your privacy, consider turning this option off.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'You are not sharing your listening activity, which helps protect your music preferences from others. To further safeguard your privacy, periodically review your settings and be cautious about any data sharing features.',
        },
      ],
    },
    {
      question: 'Can other people see your recently played artists?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click the icon in the top right corner, select settings &#8594 Scroll to the Social section &#8594 Check if sharing your recently played artists is enabled. <br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'You are currently sharing your recently played artists, which can reveal your music tastes and preferences. To maintain your privacy and keep your listening habits discreet, consider turning off this option.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'You are not sharing your recently played artists, which helps protect your music preferences from others. To further enhance your privacy, regularly review your settings and be mindful of any potential data sharing options.'
        },
      ],
    },
    {
      question: 'Are some of your playlists public?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click the icon in the top right corner, select profile &#8594 Check if any of your playlists are public. <br><br> <strong>Picture Guide:</strong> Detailed instructions <a target='_blank' href='/spotify/privacy-instructions'>here</a>.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'You currently have public playlists, which can allow others to see your music selections. To protect your privacy and keep your musical preferences private, consider making your playlists private.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'You do not have any public playlists, which helps safeguard your music choices from others. To further enhance your privacy, regularly review your settings and be cautious about any playlist sharing options.'
        },
      ],
    },
  ];
}

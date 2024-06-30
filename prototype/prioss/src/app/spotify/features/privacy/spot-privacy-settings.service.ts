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
      question: 'Are you getting tailor made advertisments?',
      howToCheck:
        "<strong>Text Guide:</strong> Login to the <a target='_blank' href='https://accounts.spotify.com/en/login'>Spotify</a> website &#8594 Choose Privacy settings &#8594 See if the option to process your personal data for tailored ads is enabled. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'Based on what Spotify and its advertising partners think might be interesting to you or apply to you, you receive tailored ads. It is usually not known on what basis these interests or attributes are assigned. In our dashboard you can see the list of inferences Spotify uses for tailored ads. But the meaning of these inferences is not clear and no further explanation is provided by Spotify. Consider turning this option off.',
        },
        {
          label: 'No',
          value: 'no',
          advice:
            'Privacy-wise, this is a good choice. The ads you receive are not based on non-transparent profiling.',
        },
      ],
    },
    {
      question: 'Is your Facebook data linked to your account?',
      howToCheck:
        "<strong>Text Guide:</strong> Login to the <a target='_blank' href='https://accounts.spotify.com/en/login'>Spotify</a> website &#8594 Choose Privacy settings &#8594 See if the option to process of your Facebook data is enabled. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'This option allows you to find Facebook friends on Spotify and vice versa. However, it is not clear what other data is shared. We recommend deactivating this option.',
        },
        { label: 'No', value: 'no', advice: 'Very good.' },
      ],
    },
    {
      question: 'Do you share your registration data for marketing purposes?',
      howToCheck:
        "<strong>Text Guide:</strong> Login to the <a target='_blank' href='https://accounts.spotify.com/en/login'>Spotify</a> website &#8594 Choose Edit profile &#8594 See if the option to share your registration data is enabled. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'Since it is not known what data exactly is shared with whom, we recommend deactivating this option.',
        },
        { label: 'No', value: 'no', advice: 'A good choice.' },
      ],
    },
    {
      question:
        'Can other people see your followers and the people you follow?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click on the icon in the top right corner and choose settings &#8594 Scroll down to the Social section &#8594 See if the option to share your follower lists is enabled. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'Everyone can see who you follow and who follows you. This allows everyone to see who you might be connected to. Consider turning this option off.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'Great. Not everyone needs to know who you are connected to.',
        },
      ],
    },
    {
      question:
        'Do you share what songs you are listening to with your followers?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click on the icon in the top right corner and choose settings &#8594 Scroll down to the Social section &#8594 See if the option to share your listening activity is enabled. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'The songs you listen to can give hints about your mood. With some songs, you may not want other people to know that you have heard them. Note that although this will only be shared with your followers, anyone can follow you without your prior permission. Consider turning this option off.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'Great. The songs you listen to are not publicly visible.',
        },
      ],
    },
    {
      question: 'Can other people see your recently played artists?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click on the icon in the top right corner and choose settings &#8594 Scroll down to the Social section &#8594 See if the option to share your recently played artists is enabled. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'You may do not want that everyone can see the artists you listen to. Consider turning this option off.',
        },
        { label: 'No', value: 'no', advice: 'Great.' },
      ],
    },
    {
      question: 'Are some of your playlists public?',
      howToCheck:
        "<strong>Text Guide:</strong> Open your Spotify app &#8594 Click on the icon in the top right corner and choose profile &#8594 See if any of your playlists are public. <br> <br> <strong>Picture Guide:</strong> Please look <a target='_blank' href='/spot/privacy-instructions'>here</a> for detailed instructions.",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice:
            'If you have intentionally shared your playlists, this is not a problem. Consider checking if all your public playlists should remain public. You can select for each playlist whether it should be public.',
        },
        { label: 'No', value: 'no', advice: 'Good.' },
      ],
    },
  ];
}

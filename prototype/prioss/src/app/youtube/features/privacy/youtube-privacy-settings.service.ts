import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubePrivacySettingsService {
  /**
   * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook, Instragram, Youtube)
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
      question: 'Do you regularly review your privacy settings?',
      howToCheck: `
        <p><strong>How to Check:</strong></p>
        <ol>
          <li><strong>Sign in to YouTube</strong> ➔ Click on your profile picture ➔ Select 'Your channel'.</li>
          <li><strong>On your channel page</strong>, click on 'Settings' in the bottom of left Navigation Menu.</li>
          <li>Select <strong>'Privacy'</strong>.</li>
          <li>There can find the available privacy options, that you can adjust/review.</li>
        </ol>
      `,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Good practice! Regular reviews ensure your settings align with your privacy needs.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'Consider reviewing your privacy settings periodically to stay informed and protected. See "How to check" section.',
        },
      ],
    },
    {
      question: 'Are you aware of what videos are set to public, private or unlisted?',
      howToCheck: `
      <p><strong>How to Check Video Privacy Settings on YouTube:</strong></p>
      <ol>
        <li><strong>Sign in to YouTube</strong>, click your profile picture, and select "YouTube Studio".</li>
        <li>In YouTube Studio, Click on the Content Left Nav Menu -> go to <strong>"Videos"</strong> tab.</li>
        <li>Review your videos list; each video's privacy setting (<strong>Public</strong>, <strong>Unlisted</strong>, <strong>Private</strong>) is indicated next to its title.</li>
        <li>To change a video's privacy setting, is indicated in the visibility column, click on the cell in <strong>Visibility</strong> Column, and choose a new setting</li>
        <li>Click <strong>"Save"</strong> to apply your changes.</li>
      </ol>
      `,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Good practice! You must be aware of what content you have set to Private or Public.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'Not a good pratice ! Follow the steps in "How to check" section and consider reviewing your published videos and adjust their visibility settings accordingly.',
        },
      ],
    },
    {
      question: 'Are you aware that you can enable/disable comments on your videos?',
      howToCheck: `
     <p><strong>How to Enable/Disable Comments on a Video on YouTube:</strong></p>
      <ol>
        <li>Sign in to YouTube ➔ Click your profile picture ➔ Select "YouTube Studio".</li>
        <li>In YouTube Studio, click on "Content" Nav Option then click "Videos" tab (default) in the table.</li>
        <li>Find the video ➔ Click on its title or thumbnail to open details.</li>
        <li>Go to the "Details" tab ➔ Scroll down to "Comments and ratings". (Click show more if its not expanded already)</li>
        <li><strong>To enable comments:</strong> Ensure the toggle next to "Allow comments" is on (blue).<br>
            <strong>To disable comments:</strong> Turn the toggle off (gray).</li>
        <li>Scroll to the bottom ➔ Click "Save" to apply changes.</li>
      </ol>
      `,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Nice ! You have the privacy right to allow/disallow comments.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'No worries ! follow steps in "How to check" in order to enable/disable comments.',
        },
      ],
    },
    {
      question: 'Are you aware that you can enable/disable personalized ad"s in your account?',
      howToCheck: `
     <p><strong>How to Enable/Disable Personalized Ads on YouTube:</strong></p>
      <ol>
        <li>Sign in to your Google Account ➔ Go to <a href="https://myaccount.google.com" target="_blank">myaccount.google.com</a>.</li>
        <li>In your Google Account settings, navigate to "Data & privacy" from the left sidebar.</li>
        <li>Scroll down to the "Personalized ads" section ➔ Click on "Partner ads settings".</li>
        <li>Toggle the switch next to "Get personalized ads when you visit sites that partner with Google":<br>
          <strong>To disable personalized ads:</strong> Turn the toggle off (gray).<br>
          <strong>To enable personalized ads:</strong> Turn the toggle on (blue).</li>
        <li>Follow any prompts to confirm your choice.</li>
      </ol>
      `,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Nice ! You have the privacy right to enable/disable personalized ad"s',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'No worries ! follow steps in "How to check" in order to enable/disable personalized ad"s',
        },
      ],
    },
    {
      question: 'Are you aware that you can allow/disallow sharing/embedding of your videos on other sites?',
      howToCheck: `
      <p><strong>How to Allow/Disallow Sharing and Embedding of Your Videos on Other Sites:</strong></p>
      <ol>
        <li>Sign in to YouTube ➔ Click your profile picture ➔ Select "YouTube Studio".</li>
        <li>In YouTube Studio, click on "Content" Nav Option then click "Videos" tab (default) in the table.</li>
        <li>Find the video ➔ Click on its title or thumbnail to open details.</li>
        <li>Scroll to the "License" section on the details page.</li>
        <li>Check/Uncheck the "Allow embedding" option.</li>
      </ol>
      `,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Nice ! You have the privacy right to allow/disallow sharing/embedding of your videos on other sites.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'Not good! follow steps in "How to check" to allow/disallow sharing/embedding of your videos on other sites.',
        },
      ],
    },
    {
      question: 'Are you aware of all the devices currently logged into your YouTube account?',
      howToCheck: 
      `<p><strong>How to Check Linked Devices for Your Google Account:</strong></p>
        <ol>
          <li>Sign in to your Google Account ➔ Go to <a href="https://myaccount.google.com" target="_blank">myaccount.google.com</a>.</li>
          <li>In your Google Account settings, click on "Security" from the left sidebar menu.</li>
          <li>Scroll down to the "Your devices" section ➔ View a list of devices that recently accessed your account.</li>
          <li>Click on a device to review details like type, last activity, and location.</li>
          <li>To manage a device, click its name and follow the prompts to sign out or remove it.</li>
        </ol>`,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Nice ! Its also important sometimes see the linked devices, so that only devices that you use have access to your account.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'It would be a good option to review the connected devices for your safety, follow the step in "How to check".'
        },
      ],
    },
    {
      question: 'Do you regularly update your account password?',
      howToCheck: 
      `<p><strong>How to Update Your YouTube Password:</strong></p>
      <ol>
        <li>Sign in to YouTube ➔ Go to <a href="https://www.youtube.com" target="_blank">youtube.com</a>.</li>
        <li>Click your profile picture at the top-right ➔ Select "Manage your Google Account".</li>
        <li>In Google Account settings, click on "Security" from the left sidebar.</li>
        <li>Under "Signing in to Google", click on "Password".</li>
        <li>Verify your identity by entering your current password.</li>
        <li>Create a new password that meets security requirements.</li>
        <li>Confirm the new password ➔ Click "Change Password" or "Save".</li>
        <li>You'll see a confirmation that your password has been updated.</li>
      </ol>`,
      options: [
        {
          label: 'Yes',
          value: 'yes',
          advice: 'Good practice! It"s recommeded to update your password at regular intervals.',
        },
        {
          label: 'No',
          value: 'no',
          advice: 'Not a good practice ! It"s recommeded to update your password at regular intervals. Follow steps in "How to check" to update the password.'
        },
      ],
    }
  ];
}

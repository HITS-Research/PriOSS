import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstaPrivacySettingsService {
  /**
   * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook and Instragram)
   * For detailed information on the variable and on how to embed the privacy settings module to the Dashboard please refer to the documentation.
   * Documentation File: "Privacy-Settings Module information.md"
   *  
   * Questions are in-line with the instructions provided in the Privacy Recommendations section.
   * More questions will be added as and when they are explored.
   * 
   * @author: aayushma (aayushma@mail.uni-paderborn.de)
   *
   */

  settings = [
    {
      question : "Is your Instagram account private?",
      howToCheck :"<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Go to <strong>Settings</strong>. <br> 3. Tap on <Strong>Setings and privacy</Strong>. <br> 4. Click to check the box next to Private Account or under Account Privacy, toggle on <strong>Private Account</strong>. <br><br> <strong>Picture Guide:</strong><br> Please look <a  target='_blank' href=/insta/account-private><strong>here </a> </strong> for the picture guide to make your Instagram account private.",
        options : [
        { label: "Account is Private", value: "Yes", advice: "Great! Your account is set to private." },
        { label: "Account is not Private", value: "No", advice: "Maintaining privacy allows individulas to have better control over their online presence and choose who can view and interact with their content, enhancing their overall digital privacy and peace of mind." }
                ]
    },
    {
      question : "Is your Instagram account's profile information private?",
      howToCheck : "<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Click on <strong>Profile Icon</strong>. <br> 3.  Now, click on <strong>Edit Profile</strong> option. <br><br> <strong>Picture Guide:</strong><br> Please look <a target='_blank' href=/insta/profile-info-private> <strong>here</a></strong> for the picture guide to make your Instagram profile information private.",
      options : [
        { label: "Profile information is private", value: "Yes", advice: "Great! You did well." },
        { label: "Profile information is not private", value: "No", advice: "By limiting access to this information, individuals can reduce the risk of identity theft, online scams, and unauthorized account access, ensuring the safety and integrity of their online presence and digital assets."}
      ]
    },
    {
      question : "Is your two-factor authentication for Instagram turned ON?",
      howToCheck : "<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Go to <strong>Settings</strong>. <br> 3. Tap on <strong>Settings and privacy </strong>. <br> 4. Scroll down to Two-factor authentication, then tap Edit two-factor authentication setting. <br> 5. Choose the security method you want to add and follow the on-screen instructions.  <br><br> <strong>Picture Guide:</strong> <br> Please look <a target='_blank' href=/insta/two-factor-authentication> <strong> here </a></strong>for the picture guide to turn ON two-factor authentication for Instagram.",
      options : [
        { label: "Two-factor authentication is ON", value: "Yes", advice: "Nice! It protects your privacy."},
        { label: "Two-factor authentication is OFF", value: "No", advice: "Enabling two-factor authentication provides an additional security layer, making it harder for unauthorized individuals to access online accounts and safeguarding sensitive information from potential breaches."}
      ]
    },
    {
      question : "Do you get tailored advertisements for your Instagram account ?",
      howToCheck : "<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Go to <strong>Settings</strong>. <br> 3. Now click on <strong>Account Center</strong>. <br> 4. Choose the option <strong>Ad preferences</strong>. <br> 5. Now click on option <strong>Ad Topics</strong>. <br> 6. Now click on <strong>View and manage topics</strong>. <br> 7. Now you can sort and filter the advertisements. <br> <br> <strong>Picture Guide:</strong> <br>  Please look <a target='_blank' href=/insta/add-manager> <strong> here </a></strong> for the picture guide to manage advertisements for your Instagram account.",
      options : [
        { label: "Yes", value: "Yes", advice: "If you have concerns about tailored ads, we suggest adjusting your Instagram settings for enhanced privacy and content control."},

        { label: "No", value: "No", advice: "Managing advertisements for users on Instagram is important to ensure a relevant and engaging user experience while maximizing the effectiveness of ad campaigns."}
      ]
    },
    {
      question : "Have you revoked access to third-party apps for your Instagram account?",
      howToCheck : "<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Open <strong>Instagram settings</strong>. <br> 3. Now, click on Apps and website option. <br> 4. Here, you'll find a list of the services you've previously given permission to access your Instagram account. <br> <br> <strong>Picture Guide:</strong><br> Please look <a target='_blank' href=/insta/revoke-access> <strong> here </a></strong> for the picture guide to revoke access to third-party apps for your Instagram account. </a></strong> ",
      options : [
        { label: "Yes, I have revoked the access", value: "Yes", advice: "Well Done! You have already moved one step ahead to protect the privacy for your Instagram account."},
        { label: "No, I have revoked the access", value: "No", advice: "Revoking third-party app access for Instagram users is important to protect their privacy and data security."}
      ]
    },
    {
      question : "Is your Instagram account's Activity Status hidden?",
      howToCheck : "<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Open <strong>Instagram settings</strong>. <br> 3. Go to the <strong>Privacy settings</strong>. <br> 4. Look for <strong>Activity Status</strong>. <br> 5. Tap on it, and tap on the slider next to <strong>Show activity status</strong>. <br> This will hide your status from everyone and it can prevent others from tracking your online activity. <br> <br> <strong>Picture Guide:</strong><br> Please look <a target='_blank' href=/insta/activity-hidden> <strong> here </a></strong> for the picture guide to hide Instagram's activity status. </a></strong>",
      options : [
        { label: "Yes, Activity Status for my account is hidden", value: "Yes", advice: "Well Done! You are aware about your privacy concerns."},
        { label: "No, Activity Status for my account is not hidden", value: "No", advice: "Hiding your Instagram account's activity status is important for privacy and security reasons. It prevents other users from knowing when you were last active on the platform, which can help protect your online presence and keep your interactions more private. This can be particularly valuable if you want to control who knows when you are online, avoid unwanted attention, or simply maintain a level of anonymity on the platform."}
      ]
    },
    {
      question : "Are non-essential cookies disabled for your Instagram's account?",
      howToCheck : "<strong>Text Guide:</strong> <br> 1. Open your <strong>Instagram account</strong>. <br> 2. Open <strong>Instagram settings</strong>. <br> 3. Go to <strong>Privacy</strong>, and scroll down to the bottom of the list. <br> 4. Under Data permissions, click on <strong>Cookies</strong>. <br> 5. Disable <strong>Our Cookies on Other Apps and Websites</strong> and <strong>Cookies From Other Companies</strong>. <br> This will stop other companies from sharing data about you with Instagram. You will also stop getting personalized ads from Meta on other sites you visit. <br> <br> <strong>Picture Guide:</strong><br> Please look <a target='_blank' href=/insta/disable-cookies> <strong> here </a></strong> for the picture guide to disable non-essential cookies for your Instagram's account. </a></strong>",
      options : [
        { label: "Yes, non-essential cookies are disabled", value: "Yes", advice: "Great! Disabling non-essentail cookies is a good step towards privacy and security for your account."},
        { label: "No, non-essential cookies are not disabled", value: "No", advice: "Disabling non-essential cookies for an Instagram account is important because it helps protect user privacy and data security. Non-essential cookies are often used for tracking user behavior and collecting personal information for targeted advertising and analytics. By disabling these cookies, users can limit the amount of data being collected about them, reducing the risk of their information being shared with third parties without their consent. This measure promotes a more secure and private online experience for Instagram users."}
      ]
    }] 
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstaPrivacySettingsService {
  /**
   * Interface for that is used for the settings variable, that may differ for the different services (Spotify, Facebook and Instragram)
   * For detailed information on the variable and on how to embed the privacy settings module to the Dashboard please refer to the documentation
   * Documentation File: "Privacy-Settings Module information.md"
   * 
   * @author: aayushma (aayushma@mail.uni-paderborn.de)
   *
   */

  settings = [
    {
      question : "Is your Instagram account private?",
      howToCheck :"Please look <a href=/insta/account-private><strong>here </a> </strong> for the picture guide to make Instagram account private.",
        options : [
        { label: "Account is Private", value: "Yes", advice: "Great! Your account is set to private." },
        { label: "Account is not Private", value: "No", advice: "Maintaining privacy allows individulas to have better control over their online presence and choose who can view and interact with their content, enhancing their overall digital privacy and peace of mind." }
                ]
    },
    {
      question : "Is your Instagram account's profile information private?",
      howToCheck : "Please look <a href=/insta/profile-info-private> <strong>here</a></strong> for the picture guide to make Instagram profile information private.",
      options : [
        { label: "Profile information is private", value: "Yes", advice: "Great! You did well." },
        { label: "Profile information is not private", value: "No", advice: "By limiting access to this information, individuals can reduce the risk of identity theft, online scams, and unauthorized account access, ensuring the safety and integrity of their online presence and digital assets."}
      ]
    },
    {
      question : "How to turn ON two-factor authentication for Instagram?",
      howToCheck : "Please look <a href=/insta/two-factor-authentication> <strong> here </a></strong>for the picture guide to turn ON two-factor authentication for Instagram.",
      options : [
        { label: "Two-factor authentication is ON", value: "Yes", advice: "Nice! It protects your privacy."},
        { label: "Two-factor authentication is OFF", value: "No", advice: "Enabling two-factor authentication provides an additional security layer, making it harder for unauthorized individuals to access online accounts and safeguarding sensitive information from potential breaches."}
      ]
    },
    {
      question : "Do you get tailored advertisements for your Instagram account ?",
      howToCheck : "Please look <a href=/insta/add-manager> <strong> here </a></strong> for the picture guide to manage advertisements for your Instagram account.",
      options : [
        { label: "Yes", value: "Yes", advice: "Great! You get the advertisements according to your interest."},
        { label: "No", value: "No", advice: "Managing advertisements for users on Instagram is important to ensure a relevant and engaging user experience while maximizing the effectiveness of ad campaigns."}
      ]
    },
    {
      question : "Have you revoked access to third-party apps for your Instagram account?",
      howToCheck : "Please look <a href=/insta/revoke-access> <strong> here </a></strong> for the picture guide to revoke access to third-party apps for your Instagram account. </a></strong> ",
      options : [
        { label: "Yes, I have revoked the access", value: "Yes", advice: "Well Done! You have already moved one step ahead to protect the privacy for your Instagram account."},
        { label: "No, I have revoked the access", value: "No", advice: "Revoking third-party app access for Instagram users is important to protect their privacy and data security."}
      ]
    },
    {
      question : "Do you know which devices are logged into your Instagram?",
      howToCheck : "<strong>Text Guide:</strong> Go to Settings> Security> Login> Activity, you will see what devices from which geographical areas and when your account was logged in.",
      options : [
        { label: "Yes, I know the logged IN devices", value: "Yes", advice: "Well Done! You are quite aware about your account's details."},
        { label: "No, I do not know the logged IN devices", value: "No", advice: "Revoking third-party app access for Instagram users is important to protect their privacy and data security."}
      ]
    }] 
}

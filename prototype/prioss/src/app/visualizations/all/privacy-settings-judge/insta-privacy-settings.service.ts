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
      question : "How to make Instagram private?",
      howToCheck : "<strong> Picture Guide:</strong> -- Link Here --",
      options : [
        { label: "Account is Private", value: "Yes", advice: "Great! Your account is set to private." },
        { label: "Account is not Private", value: "No", advice: "Maintaining privacy allows individulas to have better control over their online presence and choose who can view and interact with their content, enhancing their overall digital privacy and peace of mind." }
                ]
    },
    {
      question : "How to keep your Profile Information Private?",
      howToCheck : "<strong> Picture Guide:</strong> -- Link Here --",
      options : [
        { label: "Profile information is private", value: "Yes", advice: "Great! You did well." },
        { label: "Profile information is not private", value: "No", advice: "By limiting access to this information, individuals can reduce the risk of identity theft, online scams, and unauthorized account access, ensuring the safety and integrity of their online presence and digital assets."}
      ]
    },
    {
      question : "How to turn on two-factor authentication on Instagram?",
      howToCheck : "<strong> Picture Guide:</strong> -- Link Here --",
      options : [
        { label: "Two-factor authentication is on", value: "Yes", advice: "Nice! It protects your privacy."},
        { label: "Two-factor authentication is off", value: "No", advice: "Enabling two-factor authentication provides an additional security layer, making it harder for unauthorized individuals to access online accounts and safeguarding sensitive information from potential breaches."}
      ]
    } ] 
}

import { Component,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-face-purposes',
  templateUrl: './face-purposes.component.html',
  styleUrls: ['./face-purposes.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * This component is for Facebook's Purposes on dashboard.
 * This page is shown once a user visits the instagram dashboard
 *
 * @author: Subhadeep Debnath (sdebnath@mail.uni-paderborn.de)
 *
 */
export class FacePurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      detailedPurpose:
        'By customizing the platform, Facebook tries to match your preferences and interests which means suggesting content or recommendations that fit you better, based on what you do, how you interact, and what is in your profile. But there is always a risk that your data could be used in ways you did not agree to, affecting your control and consent.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Tailor the ads you see',
      detailedPurpose:
        'Facebook analyzes your activity on the platform, including the pages you follow, the posts you react to, and the groups you engage with. They use this data to display ads tailored to your interests, aiming to enhance your experience on the platform. However, these targeted ads raise concerns about potentially influencing your thoughts and decisions.',
      dataCollected:
        'User Profile Data, Likes, Shares, HashTags, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Sharing information with third parties',
      detailedPurpose:
        'Facebook shares your information with organizations that you may not be directly interacting with, for purposes such as advertising, measurement, and analytics. This could involve sharing details about your platform activity or interests to assist advertisers in refining their ad targeting. Nevertheless, these actions increase the likelihood of your data being compromised by adversaries revealing your sensitive information.',
      dataCollected: 'User Profile Data, Likes, Viewed Content, Location Data, Searched Content, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Information from device settings',
      detailedPurpose:
        'Facebook also gathers data from your device settings to enhance app functionality and offer you an improved user experience. This may encompass details like your device model, operating system, and network connectivity, location. However, these practices can diminish your anonymity and potentially result in the misuse of sensitive data, sparking concerns regarding surveillance and digital rights.',
      dataCollected: 'User Profile Data, Type of Device Used, Network Information, Location Data, Device Settings Information',
    },
    {
      shortPurpose: 'To communicate with you',
      detailedPurpose:
        'For Facebook, accessing your data to communicate with you involves obtaining your contact details, phone book information, settings data, and other data linked to your Facebook friends and followers. While this enables smoother communication and connectivity on the platform, it also raises privacy concerns as it grants access to personal contact information, potentially compromising your privacy. ',
      dataCollected: 'User Profile Data, Phonebook Information, Survey and Research Data, Device Settings Information',
    },
  ];

  dataIcons: { [key: string]: string } = {
    'User Profile Data': 'user',
    'Likes': 'like',
    'Comments': 'comment',
    'Voice Data': 'audio',
    'Time Spent on Platform': 'clock-circle',
    'Shares': 'send',
    'HashTags': 'number',
    'Viewed Content': 'eye',
    'Location Data': 'environment',
    'Searched Content': 'file-search',
    'Type of Device Used': 'desktop',
    'Network Information': 'wifi',
    'Device Settings Information': 'setting',
    'Payment and Purchase Data': 'credit-card',
    'Survey and Research Data': 'form',
    'Phonebook Information': 'phone'
  };
}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-face-purposes',
  templateUrl: './face-purposes.component.html',
  styleUrls: ['./face-purposes.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacePurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      bulletPoints: [
        'Customize content and recommendations based on your activity and profile to enhance your experience.',
        'Match your preferences and interests for a more personalized platform.',
        'Your data could be used in ways you did not agree to, leading to a loss of control over your personal information.'
      ],
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Tailor the ads you see',
      bulletPoints: [
        'Analyze your platform activity, including pages followed and posts reacted to, to show relevant ads.',
        'Improve ad targeting to match your interests and enhance your experience.',
        'Targeted ads may influence your thoughts and decisions, raising concerns about manipulation and privacy.'
      ],
      dataCollected: 'User Profile Data, Likes, Shares, Used HashTags, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Sharing information with third parties',
      bulletPoints: [
        'Share your data with advertisers and partners for analytics and ad targeting.',
        'Include information about your activity and interests to help advertisers refine their strategies.',
        'Increased likelihood of data breaches and privacy issues, as your data could be exposed to unauthorized parties.'
      ],
      dataCollected: 'User Profile Data, Likes, Viewed Content, Location Data, Searched Content, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Information from device settings',
      bulletPoints: [
        'Collect device information, such as model, OS, and network connectivity, to improve app functionality.',
        'Enhance user experience by gathering details from your device settings.',
        'Potential misuse of sensitive data, leading to surveillance concerns and loss of anonymity.'
      ],
      dataCollected: 'User Profile Data, Type of Device Used, Network Information, Location Data, Device Settings Information',
    },
    {
      shortPurpose: 'To communicate with you',
      bulletPoints: [
        'Use your contact details and phone book information for communication on the platform.',
        'Facilitate better connectivity and interaction with friends and followers.',
        'Access to personal contact information could compromise your privacy and lead to unwanted communication.'
      ],
      dataCollected: 'User Profile Data, Phonebook Information, Survey & Research Data, Device Settings Information',
    },
  ];

  dataIcons: { [key: string]: string } = {
    'User Profile Data': 'user',
    'Likes': 'like',
    'Comments': 'comment',
    'Voice Data': 'audio',
    'Time Spent on Platform': 'clock-circle',
    'Shares': 'send',
    'Used HashTags': 'number',
    'Viewed Content': 'eye',
    'Location Data': 'environment',
    'Searched Content': 'file-search',
    'Type of Device Used': 'desktop',
    'Network Information': 'wifi',
    'Device Settings Information': 'setting',
    'Payment and Purchase Data': 'credit-card',
    'Survey & Research Data': 'form',
    'Phonebook Information': 'phone'
  };
}

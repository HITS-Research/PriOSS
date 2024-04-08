import { Component } from '@angular/core';

/**
 * This component is for instagram's Purposes on dashboard.
 * This page is shown once a user visits the instagram dashboard
 * 
 * @author: Subhadeep (sdebnath@mail.uni-paderborn.de)
 * 
 */


@Component({
  selector: 'app-insta-purposes',
  templateUrl: './insta-purposes.component.html',
  styleUrls: ['./insta-purposes.component.less']
})
export class InstaPurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      detailedPurpose: 'Customizing the platform to suit your preferences and interests involves showing you content or recommendations that are more relevant to you based on your activity, interactions, and profile information. However, there is always a threat of your data being misused or a lack of control on how your data should be used, impacting your consent and autonomy.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Tailor the ads you see',
      detailedPurpose: 'Instagram analyzes your activity on the platform, such as the accounts you follow, the posts you like, and the hashtags you interact with. They use this information to show you ads that are more likely to appeal to you, making your experience on the platform more personalized. But these advertisements raise concerns of manipulating your mindset and influencing decision-making processes.',
      dataCollected: 'User Profile Data, Likes, Shares, HashTags, Time Spent on Platform, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Sharing information with third parties',
      detailedPurpose: 'Instagram shares your information with organizations which you might not be using, for various reasons such as advertising, measurement, and analytics. This could include sharing data about your activity on the platform or your interests to help advertisers target their ads more effectively. However, these steps heighten the risk of your data being breached by adversaries compromising personal information.',
      dataCollected: 'User Profile Data, Likes, Viewed Content, Location Data, Searched Content, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Information from device settings',
      detailedPurpose: 'Instagram also collects information from your device settings to improve the app performance and provide you with a better user experience. This could include information such as your device type, operating system, and network connection. But these measures can lower your anonymity or lead to misuse of sensitive information raising concerns about surveillance and digital rights.',
      dataCollected: 'User Profile Data, Type of Device Used, Network Information, Device Settings Information'
    }
  ];

  dataIcons: { [key: string]: string } = {
    'User Profile Data': 'user',
    'Likes': 'heart',
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
    'Survey and Research Data': 'form'
  };
}

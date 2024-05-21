import { Component } from '@angular/core';

@Component({
  selector: 'prioss-spotify-purposes',
  templateUrl: './purposes.component.html',
  styleUrls: ['./purposes.component.less']
})
export class PurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      detailedPurpose: 'Customizing the spotify platform to suit your preferences and interests involves showing you content or recommendations that are more relevant to you based on your activity, interactions, and profile information. However, there is always a threat of your data being misused or a lack of control on how your data should be used, impacting your consent and autonomy.',
      dataCollected: 'User Profile Data, Likes, Shares, Voice Data, Time Spent on Platform, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Voluntary Features',
      detailedPurpose: 'Spotify seeks explicit consent from you when offering additional voluntary features, ensuring transparency and user control over data usage such as enabling location-based recommendations. However, accepting consent exposes your personal information and anonymity.',
      dataCollected: 'User Profile Data, Location Data, Network Information, Survey and Research Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Issue Diagnosis and Troubleshooting',
      detailedPurpose: 'Spotify utilizes your data for diagnosing, troubleshooting, and resolving issues related to the service, enhancing user experience and platform reliability like analyzing error logs, user feedback, etc. but this may involve accessing your data related to app usage and performance, potentially compromising your privacy.',
      dataCollected: 'User Profile Data, Type of Device Used, Device Settings Information, Network Information'
    },
    {
      shortPurpose: 'Marketing and Promotion',
      detailedPurpose: 'Spotify employs your data for marketing, promotion, and advertising purposes, targeting you with relevant content and offers like using your listening habits data and preferences to show personalize ads, potentially raising concerns about targeted advertising and user tracking.',
      dataCollected: 'User Profile Data, Searched Content, Viewed Content, Voice Data, Payment and Purchase Data, HashTags'
    },
    {
      shortPurpose: 'Compliance with Authorities',
      detailedPurpose: 'Spotify complies with requests from law enforcement, courts, or other competent authorities, which may involve accessing and sharing your data without informing you. For example, Spotify may provide your data in response to a valid court order or subpoena, potentially compromising your privacy and data security.',
      dataCollected: 'User Profile Data, Location Data, Voice Data, Payment and Purchase Data, Survey and Research Data'
    }
    // {
    //   shortPurpose: 'Business Planning and Reporting',
    //   detailedPurpose: 'Conducting business planning, reporting, and forecasting activities using user data.',
    //   dataCollected: 'User Data, Usage Data, Payment and Purchase Data'
    // }
  ];

  dataIcons: { [key: string]: string } = {
    'User Profile Data': 'user',
    'Likes': 'like',
    'Comments': 'comment',
    'Voice Data': 'audio',
    'Time Spent on Platform': 'clock-circle',
    'Shares': 'share-alt',
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

import { Component } from '@angular/core';

@Component({
  selector: 'app-purposes',
  templateUrl: './purposes.component.html',
  styleUrls: ['./purposes.component.less']
})
export class PurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      detailedPurpose: 'To provide the Spotify Service in accordance with the user contract, including personalizing your account.',
      dataCollected: 'User Data, Street Address Data, Usage Data, Voice Data, Payment and Purchase Data.'
    },
    {
      shortPurpose: 'Voluntary Features',
      detailedPurpose: 'When offering additional voluntary features of the Spotify Service, explicit consent will be sought from Spotify users.',
      dataCollected: 'User Data, Usage Data, Survey and Research Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Issue Diagnosis and Troubleshooting',
      detailedPurpose: 'Diagnosing, troubleshooting, and resolving issues related to the Spotify Service.',
      dataCollected: 'User Data, Usage Data'
    },
    {
      shortPurpose: 'Marketing and Promotion',
      detailedPurpose: 'Utilizing user data for marketing, promotion, and advertising purposes.',
      dataCollected: 'User Data, Street Address Data, Usage Data, Voice Data, Payment and Purchase Data, Survey and Research Data'
    },
    {
      shortPurpose: 'Compliance with Authorities',
      detailedPurpose: 'Complying with requests from law enforcement, courts, or other competent authorities.',
      dataCollected: 'User Data, Street Address Data, Usage Data, Voice Data, Payment and Purchase Data, Survey and Research Data'
    },
    {
      shortPurpose: 'Business Planning and Reporting',
      detailedPurpose: 'Conducting business planning, reporting, and forecasting activities using user data.',
      dataCollected: 'User Data, Usage Data, Payment and Purchase Data'
    }
  ];

  dataIcons: { [key: string]: string } = {
    'User Data': 'user',
    'Street Address Data': 'home',
    'Usage Data': 'line-chart',
    'Voice Data': 'audio',
    'Payment and Purchase Data': 'credit-card',
    'Survey and Research Data': 'form'
  };
}

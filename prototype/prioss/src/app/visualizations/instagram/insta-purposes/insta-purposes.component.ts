import { Component } from '@angular/core';

/**
 * This component is for instagram's Purposes on dashboard.
 * This page is shown once a user visits the instagram dashboard
 * 
 * @author: Aayushma (aayushma@mail.uni-paderborn.de)
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
      detailedPurpose: 'Activity information and information you provide like posts or comments.',
      dataCollected: 'User Data, Usage Data, Voice Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Tailor the ads you see',
      detailedPurpose: 'Information from third parties or vendors. That could for example be device information or apps you use.',
      dataCollected: 'User Data, Usage Data, Survey and Research Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Sharing information with third parties',
      detailedPurpose: 'Content you create, like your contact, profile or other information, like posts or comments.',
      dataCollected: 'User Data, Usage Data, Voice Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Information from device settings',
      detailedPurpose: 'Provide the features or services through collecting information you allow them to receive.',
      dataCollected: 'User Data, Usage Data, Survey and Research Data'
    }
  ];

  dataIcons: { [key: string]: string } = {
    'User Data': 'user',
    'Usage Data': 'line-chart',
    'Voice Data': 'audio',
    'Payment and Purchase Data': 'credit-card',
    'Survey and Research Data': 'form'
  };
}

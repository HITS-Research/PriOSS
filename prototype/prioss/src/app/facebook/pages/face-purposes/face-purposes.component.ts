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
 * @author: Deepa Belvi (dbelvi@mail.uni-paderborn.de)
 * 
 */

export class FacePurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalized and Improved Facebook Interaction',
      detailedPurpose: ' Your posts, comments, messages, hashtags, time of activity, frequency and duration of your activities.',
      dataCollected: 'User Data, Phone, Usage Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'For personalized advertisements',
      detailedPurpose: ' Your profile information, Your activity on and off Meta products, information that Facebook receive through cookies, things Facebook infer about you such as topics, information about your friends including their activity or interests.',
      dataCollected: 'User Data, Survey and Research Data, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Sharing information with third parties',
      detailedPurpose: ' Your device information, websites that you visit and cookie data, apps you use, games you play, purchases and transactions you make online, the ads you see and how you interact with them.',
      dataCollected: 'User Data, Purchases, Payment and Purchase Data'
    },
    {
      shortPurpose: 'Information from device settings',
      detailedPurpose: ' Your device and software you are using, signals from your device, and GPS locations. ',
      dataCollected: 'User Data, Locations, Survey and Research Data'
    },
    {
      shortPurpose: 'To communicate with you',
      detailedPurpose: ' Your contact information, your phone book, settings data and other information related to your friends and followers on Facebook. ',
      dataCollected: 'User Data, Survey and Research Data'
    }
  ];

  dataIcons: { [key: string]: string } = {
    'User Data': 'user',
    'Usage Data': 'line-chart',
    'Purchases': 'shopping-cart',
    'Payment and Purchase Data': 'credit-card',
    'Survey and Research Data': 'form',
    'Locations': 'environment',
    'Phone': 'phone'
  };

}

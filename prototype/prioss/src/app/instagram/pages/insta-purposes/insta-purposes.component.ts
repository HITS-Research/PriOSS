import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AccordionComponent } from 'src/app/features/accordion/accordion.component';

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
  styleUrls: ['./insta-purposes.component.less'],
  standalone: true,
  imports: [
    AccordionComponent,
    NgFor,
    NgIf,
    NzCardModule,
    NzIconModule,
    NzTableModule,
  ]
})
export class InstaPurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      bulletPoints: [
        'Customize content and recommendations based on your activity, interactions, and profile information to enhance your experience.',
        'Match your preferences and interests for a more personalized platform.',
        'Your data could be used in ways you did not agree to, leading to a loss of control over your personal information and impacting your consent and autonomy.'
      ],
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Tailor the ads you see',
      bulletPoints: [
        'Analyze your activity on the platform, such as accounts followed, posts liked, and hashtags interacted with, to show relevant ads.',
        'Improve ad targeting to match your interests and enhance your experience.',
        'Targeted ads may influence your thoughts and decisions, raising concerns about manipulation and privacy.'
      ],
      dataCollected: 'User Profile Data, Likes, Shares, HashTags, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Sharing information with third parties',
      bulletPoints: [
        'Share your information with organizations for advertising, measurement, and analytics.',
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
      dataCollected: 'User Profile Data, Type of Device Used, Network Information, Device Settings Information',
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

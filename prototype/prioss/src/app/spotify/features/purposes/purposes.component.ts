import { NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AccordionComponent } from 'src/app/features/accordion/accordion.component';

@Component({
  selector: 'prioss-spotify-purposes',
  templateUrl: './purposes.component.html',
  styleUrls: ['./purposes.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AccordionComponent,
    NgFor,
    NgIf,
    NzCardModule,
    NzIconModule,
    NzTableModule,
  ],
})
export class PurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Personalizing Account Experience',
      bulletPoints: [
        'Customize content and recommendations based on your activity, interactions, and profile information to enhance your experience.',
        'Match your preferences and interests for a more personalized platform.',
        'Your data could be used in ways you did not agree to, leading to a loss of control over your personal information and impacting your consent and autonomy.',
      ],
      dataCollected:
        'User Profile Data, Likes, Shares, Voice Data, Time Spent on Platform, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Voluntary Features',
      bulletPoints: [
        'Seek explicit consent when offering additional voluntary features, ensuring transparency and user control over data usage.',
        'Enable features like location-based recommendations by using your data.',
        'Accepting consent exposes your personal information and anonymity, raising concerns about privacy.',
      ],
      dataCollected:
        'User Profile Data, Location Data, Network Information, Survey and Research Data, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Issue Diagnosis and Troubleshooting',
      bulletPoints: [
        'Utilize your data for diagnosing, troubleshooting, and resolving issues related to the service.',
        'Enhance user experience and platform reliability by analyzing error logs and user feedback.',
        'Accessing your data related to app usage and performance may compromise your privacy.',
      ],
      dataCollected:
        'User Profile Data, Type of Device Used, Device Settings Information, Network Information',
    },
    {
      shortPurpose: 'Marketing and Promotion',
      bulletPoints: [
        'Employ your data for marketing, promotion, and advertising purposes.',
        'Target you with relevant content and offers using your listening habits and preferences.',
        'Personalized ads may raise concerns about targeted advertising and user tracking.',
      ],
      dataCollected:
        'User Profile Data, Searched Content, Viewed Content, Voice Data, Payment and Purchase Data, HashTags',
    },
    {
      shortPurpose: 'Compliance with Authorities',
      bulletPoints: [
        'Comply with requests from law enforcement, courts, or other competent authorities.',
        'Access and share your data without informing you in response to valid court orders or subpoenas.',
        'Compliance may compromise your privacy and data security.',
      ],
      dataCollected:
        'User Profile Data, Location Data, Voice Data, Payment and Purchase Data, Survey and Research Data',
    },
  ];

  dataIcons: { [key: string]: string } = {
    'User Profile Data': 'user',
    Likes: 'like',
    Comments: 'comment',
    'Voice Data': 'audio',
    'Time Spent on Platform': 'clock-circle',
    Shares: 'share-alt',
    HashTags: 'number',
    'Viewed Content': 'eye',
    'Location Data': 'environment',
    'Searched Content': 'file-search',
    'Type of Device Used': 'desktop',
    'Network Information': 'wifi',
    'Device Settings Information': 'setting',
    'Payment and Purchase Data': 'credit-card',
    'Survey and Research Data': 'form',
  };
}

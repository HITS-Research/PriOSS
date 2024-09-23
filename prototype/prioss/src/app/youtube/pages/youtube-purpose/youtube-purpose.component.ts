import { Component,ChangeDetectionStrategy } from '@angular/core';
import {AccordionComponent} from "../../../features/accordion/accordion.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-youtube-purposes',
  templateUrl: './youtube-purpose.component.html',
  styleUrls: ['./youtube-purpose.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AccordionComponent,
    NzCardComponent,
    NzTableComponent,
    NgForOf,
    NgIf,
    NzIconDirective,
    NzThMeasureDirective
  ],
  standalone: true
})


export class YoutubePurposesComponent {
  dataRows = [
    {
      shortPurpose: 'Provide our services',
      detailedPurpose:
        'Youtube uses your information to deliver their services, like processing the terms you search for in order to return results or helping you share content by suggesting recipients from your contacts.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Viewed Content, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Maintain & improve our services',
      detailedPurpose:
        'Youtube also use your information to ensure their services are working as intended, such as tracking outages or troubleshooting issues that you report to them. And they use your information to make improvements to their services — for example, understanding which search terms are most frequently misspelled helps them improve spell-check features used across their services.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Viewed Content, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Develop new services',
      detailedPurpose:
        'Youtube uses the information they collect in existing services to help them develop new ones. For example, understanding how people organized their photos in Picasa, Google’s first photos app, helped them design and launch Google Photos.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Viewed Content, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Provide personalized services, including content and ads',
      detailedPurpose:
        'Youtube uses the information they collect to customize their services for you, including providing recommendations, personalized content, and customized search results. For example, Security Checkup provides security tips adapted to how you use Google products. And, depending on your available settings, Google Play could use information like apps you’ve already installed and videos you’ve watched on YouTube to suggest new apps you might like.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Viewed Content, Payment and Purchase Data',
    },
    {
      shortPurpose: 'Measure performance',
      detailedPurpose:
        'Youtube uses data for analytics and measurement to understand how their services are used. For example, they analyze data about your visits to their sites to do things like optimize product design. And they also use data about the ads you interact with, including your related Google Search activity, to help advertisers understand the performance of their ad campaigns.',
      dataCollected: 'User Profile Data, Likes, Comments, Voice Data, Time Spent on Platform, Viewed Content, Payment and Purchase Data',
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

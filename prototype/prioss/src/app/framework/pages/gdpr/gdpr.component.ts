import { Component,ChangeDetectionStrategy } from '@angular/core';

/**
 * This component includes an array with the title, description, and an icon for all rights which should
 * be presented to the user. They are shown in a grid where each right is a single card.
 *
 * @author: Jonathan (jvn@mail.upb.de)
 *
 */
@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdprComponent {
  dataProtectionRights = [
    {
      title: 'Consent',
      description: 'Companies must obtain explicit and informed consent from individuals to collect, process, and store their personal data.',
      icon: 'check-circle'
    },
    {
      title: 'Right to Access',
      description: 'Individuals have the right to access their personal data that has been collected and stored by companies.',
      icon: 'user'
    },
    {
      title: 'Right to Rectification',
      description: 'Individuals have the right to have their personal data corrected if it is inaccurate or incomplete.',
      icon: 'edit'
    },
    {
      title: 'Right to be Forgotten',
      description: 'Individuals have the right to request the deletion of their personal data.',
      icon: 'delete'
    },
    {
      title: 'Right to Data Portability',
      description: 'Individuals have the right to receive their personal data in a format that is easily transferable to another company.',
      icon: 'swap'
    },
    {
      title: 'Right to Object',
      description: 'Individuals have the right to object to the processing of their personal data in certain circumstances.',
      icon: 'stop'
    },
    {
      title: 'Data Protection Officers (DPOs)',
      description: 'Companies that process large amounts of personal data or sensitive personal data must appoint a DPO.',
      icon: 'security-scan'
    },
    {
      title: 'Data Breach Notification',
      description: 'Companies must notify individuals and the relevant authorities within 72 hours of a data breach.',
      icon: 'alert'
    },
    {
      title: 'Penalties',
      description: 'Non-compliance with the GDPR can result in fines of up to 4% of a company\'s annual global revenue or €20 million (whichever is greater).',
      icon: 'dollar'
    },
    {
      title: 'Rights Related to Automated Decision-Making',
      description: 'Individuals have the right not to be subject to a decision based solely on automated processing, including profiling.',
      icon: 'robot'
    }
  ];
}

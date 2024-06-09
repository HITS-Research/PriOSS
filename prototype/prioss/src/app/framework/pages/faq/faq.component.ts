import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Faq {
  name: string;
  content: string;
  link?: string;
  linkLabel?: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  faqs: Faq[] = [
    {
      name: 'What is the purpose of this website?',
      content: 'This website serves as a Privacy One-stop Shop for users. Our primary objective is to empower users who provide their data by offering them valuable insights and enabling them to make informed decisions. By utilizing our platform, users can gain a better understanding of how their data is collected and take appropriate actions if they are dissatisfied with the current data collection practices. Additionally, we provide comprehensive information about the purposes behind data collection and educate users about their privacy rights. Our goal is to promote transparency and empower individuals to have greater control over their personal information.'
    },
    {
      name: 'What types of user data does this website collect?',
      content: 'Our website operates with full offline functionality which means that none of the user data available through uploaded data-downloads is sent to any server. All data processing occurs locally on your device, ensuring that your information remains secure and under your control. Furthermore, when you leave the Dashboard, you have the option to delete all locally processed data. Still not fully convinced ? No worries ! Just disconnect your internet before uploading your data and turn it back on after leaving the website. The application works fully offline after loading it once.'
    },
    {
      name: 'Why was this application created?',
      content: 'Users often lack awareness of their rights regarding data downloads under the General Data Protection Regulation (GDPR). Our platform not only offers data visualization but also assists users in rectifying inaccurate data and enhancing transparency. This includes providing additional context information such as explanations regarding the purposes for which user data is collected by specific services as well as guidance on how to exercise the right to erasure within those services or sharing information of dark patterns that services practice. Through these measures, we aim to empower users to adopt privacy-conscious behaviors while using the social media platforms.',
    },
    {
      name: 'How to download your data?',
      content: 'Please visit the below link and select the application for which you want to download your data',
      link: '../serviceSelection',
      linkLabel: 'Service Selection'
    },
    {
      name: 'Is downloading my data compulsory to use the website?',
      content: 'No. This website offers sample data for the respective social media platforms. You can explore how your data might look, by using the sample data.'
    },
    {
      name: 'Is this application really offline?',
      content: 'Yes, the application offers offline functionality. However, to correctly showcase your data we need internet connection just once when you are uploading your zip file for a specific service.',
    }
  ];

  instagramFaqs: Faq[] = [
    {
      name: 'How can I improve my Instagram account security?',
      content: 'Instagram provides some information and security tips at their help center (linked below). This can help you to improve the security for your Instagram account.',
      link: 'https://help.instagram.com/369001149843369/?helpref=hc_fnav',
      linkLabel: 'Instagram help center'
    }
  ];

  spotifyFaqs: Faq[] = [
    {
      name: 'What is an inference?',
      content: 'An inference is a category in which you are placed. Those categories should indicate your interests and preferences. To assign you to a category, Spotify analyses your usage behavior and collects data from advertising partners such as Facebook. Inferences are used for tailored advertising. If you opt out of tailored advertising, Spotify will not serve ads based on your inferences. Spotify also uses inferences to evaluate the use of their service, for example, the popularity of a feature like the Discover Weekly playlist. The exact meaning of the inferences Spotify draws about you cannot be determined, as Spotify does not provide any information on this.',
    }
  ];

  facebookFaqs: Faq[] = [
    {
      name: 'How does this dashboard help me improve my privacy on Facebook?',
      content: 'You can go to each visualization tile and inspect your data for its correctness. You can also see how your activities are being tracked. If you do not intend Facebook to know any of your particular personal data, you can follow the instructions mentioned in \'Manage Privacy\' section to manage your permissions and/or privacy.',
    },
    {
      name: 'Can I exercise my Facebook privacy rights on this platform?',
      content: 'No. This platform helps you exercise your privacy rights through appropriate instructions. You have to go to your logged-in Facebook account and follow the instructions. Since this platform works offline, without internet, you can not click something here to make changes in your Facebook account!',
    },
    {
      name: 'Does this platform have any privacy recommendations for my personal Facebook account?',
      content: 'Yes. Please refer to \'Privacy Settings Judge\' in \'Privacy Recommendations\' section.'
    }
  ];
}

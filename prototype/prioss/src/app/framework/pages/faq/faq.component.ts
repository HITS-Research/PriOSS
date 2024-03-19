import { Component, Input ,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {

  @Input()
  serviceName = "";

  // General FAQs for all services
  faqs = [
    {
      active: false,
      name: 'What is the purpose of this website?',
      content: 'This website serves as a Privacy One-stop Shop for users. Our primary objective is to empower users who provide their data by offering them valuable insights and enabling them to make informed decisions. By utilizing our platform, users can gain a better understanding of how their data is collected and take appropriate actions if they are dissatisfied with the current data collection practices. Additionally, we provide comprehensive information about the purposes behind data collection and educate users about their privacy rights. Our goal is to promote transparency and empower individuals to have greater control over their personal information.'
    },
    {
      active: false,
      name: 'What types of user data does this website collect?',
      content: 'Our website operates with full offline functionality which means that none of the user data available through uploaded data-downloads is sent to any server. All data processing occurs locally on your device, ensuring that your information remains secure and under your control. Furthermore, when you leave the Dashboard, you have the option to delete all locally processed data. Still not fully convinced ? No worries ! Just disconnect your internet before uploading your data and turn it back on after leaving the website. The application works fully offline after loading it once.'
    },
    {
      active: false,
      name: 'Who developed this website?',
      content: 'You can find information about this section in "About" part of application or by visiting the link below.',
      link: '../about',
      linkLabel: 'About Page'
    },
    {
      active: false,
      name: 'Why was this application created?',
      content: 'Users often lack awareness of their rights regarding data downloads under the General Data Protection Regulation (GDPR). Our platform not only offers data visualization but also assists users in rectifying inaccurate data and enhancing transparency. This includes providing additional context information such as explanations regarding the purposes for which user data is collected by specific services as well as guidance on how to exercise the right to erasure within those services. Through these measures, we aim to empower users to adopt privacy-conscious behaviors while using the social media platforms.',
    },
    {
      active: false,
      name: 'How to download your data? ',
      content: 'Please visit the below link and select the application for which you want to download your data',
      link: '../serviceSelection',
      linkLabel: 'Service Selection'
    },
    {
      active: false,
      name: 'Is downloading my data compulsory to use the website?',
      content: 'No. This website offers sample data for the respective social media platforms. You can explore how your data might look, by using the sample data.'
    },
    {
      active: false,
      name: 'How to traverse inside the data? ',
      content: 'Users can navigate through their downloaded JSON data. The data is collected and grouped based on various interests such as ads_and_businesses, ads_and_topics, posts, and more. User data is organized into different folders and sorted alphabetically. To comprehend the contents of these JSON files, a basic understanding of JSON is required beforehand. This application simplifies the process and makes it straightforward to comprehend the data.',
    },
    {
      active: false,
      name: 'Is this application really offline?',
      content: 'Yes, the application is offline. We have used SQLite which is a local database. For more detail, users can contact the University of Paderborn. „Project Group: a Privacy One-Stop Shop“ over the course of one year between October 2022 and September 2023. To get more information about us and the project, visit our About Us page',
    },
    {
      active: false,
      name: 'What are my privacy rights?',
      content: 'We recommend you to read your rights as explained in \'GDPR Rights\' section of the respective social media platform.'
    }
  ];

  // Service Specific FAQs
  instagram_faqs = [
    {
      active: false,
      name: 'How can I improve my Instagram account security?',
      content: 'Instagram provides some information and security tips at their help center (linked below). This can help you to improve the security for your Instagram account.',
      link: 'https://help.instagram.com/369001149843369/?helpref=hc_fnav',
      linkLabel: 'Instagram help center'
    }
  ];
  spotify_faqs = [
    {
      active: false,
      name: 'What is an inference?',
      content: 'An inference is a category in which you are placed. Those categories should indicate your interests and preferences. To assign you to a category, Spotify analyses your usage behavior and collects data from advertising partners such as Facebook. Inferences are used for tailored advertising. If you opt out of tailored advertising, Spotify will not serve ads based on your inferences. Spotify also uses inferences to evaluate the use of their service, for example, the popularity of a feature like the Discover Weekly playlist. The exact meaning of the inferences Spotify draws about you cannot be determined, as Spotify does not provide any information on this.',
      link: undefined,
      linkLabel: undefined
    }
  ];
  facebook_faqs = [
    {
      active: false,
      name: 'How does this dashboard help me improve my privacy on Facebook?',
      content: 'You can go to each visualization tile and inspect your data for its correctness. You can also see how your activities are being tracked. If you do not intend Facebook to know any of your particular personal data, you can follow the instructions mentioned in \'Manage Privacy\' section to manage your permissions and/or privacy.',
      link: undefined,
      linkLabel: undefined
    },
    {
      active: false,
      name: 'Can I excercise my Facebook privacy rights on this platform?',
      content: 'No. This platform helps you excercise your privacy rights through appropriate instructions. You have to go to your logged-in Facebook account and follow the instructions. Since this platform works offline, without internet, you can not click something here to make changes in your Facebook account!',
      link: undefined,
      linkLabel: undefined
    },
    {
      active: false,
      name: 'How do I excercise my privacy rights?',
      content: 'By following the instructions mentioned in the \'Privacy Recommendations\' Section.',
      link: undefined,
      linkLabel: undefined
    },
    {
      active: false,
      name: 'Does this platform has any privacy recommedations for my personal Facebook account?',
      content: 'Yes. Please refer to \'Privacy Settings Judge\' in \'Privacy Recommendations\' section.',
      link: undefined,
      linkLabel: undefined
    }
  ];
}

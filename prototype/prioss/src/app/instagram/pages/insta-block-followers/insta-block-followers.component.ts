import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

@Component({
  selector: 'app-insta-block-followers',
  templateUrl: './insta-block-followers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzTypographyModule,
    StepperComponent,
    TitleBarComponent,
  ]
})
export class InstaBlockFollowersComponent {

  contentTailoredAdsSteps: Step[] = [
    {
      title: 'Step 1',
      description: 'First, you have to visit Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/login.png",
    },
    {
      title: 'Step 2',
      description: 'You need to click "profile" icon and then, click "followers". Now select the follower you want to block.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/6.png",
    },
    {
      title: 'Step 3',
      description: 'Click on the three dots at the top right corner and now choose the "Block" option.',
      imageUrl: "../../assets/images/insta-privacy-recommendations/7.png",
    }
  ];

}

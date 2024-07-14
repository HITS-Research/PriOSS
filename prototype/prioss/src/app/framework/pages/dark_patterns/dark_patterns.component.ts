import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NzCarouselModule, NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { CommonModule } from '@angular/common';

interface Step {
  title: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-dark-patterns',
  templateUrl: './dark_patterns.component.html',
  styleUrls: ['./dark_patterns.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCarouselModule, CommonModule],
})
export class DarkPatternsComponent {
  @ViewChild(NzCarouselComponent, { static: false }) carousel!: NzCarouselComponent;

  initialIndex: number = 0;

  steps: Step[] = [
    {
      title: 'Sneak Into Basket',
      imageUrl: '../assets/images/dark_patterns/DP1.png',
      description: 'Websites use a sneaky tactic to add items or additional costs to your shopping cart without you realizing it.',
    },
    {
      title: 'Hidden Information',
      imageUrl: '../assets/images/dark_patterns/DP2.png',
      description: 'Important information and options are hidden or displayed in such a way that they are hardly noticeable to obtain your consent for increased data access.',
    },
    {
      title: 'Activity Notifications',
      imageUrl: '../assets/images/dark_patterns/DP3.png',
      description: 'Websites notify you with urgent messages such as "Offer ends in 5 minutes," creating a sense of pressure and scarcity to manipulate decision making.',
    },
    {
      title: 'Preselection',
      imageUrl: '../assets/images/dark_patterns/DP4.png',
      description: 'Some options in a webpage or a pop-up will be pre-selected or ticked to take more advantage of you and earn profit.',
    },
    {
      title: 'Forced Continuity',
      imageUrl: '../assets/images/dark_patterns/DP5.png',
      description: 'Some websites make it hard for you to cancel subscriptions in order to change your decision.',
    },
    {
      title: 'No Reject Button',
      imageUrl: '../assets/images/dark_patterns/DP6.png',
      description: 'Websites do not give you an option to reject agreements, subscriptions or policies by not providing it to have more data access about you.',
    }
  ];

  goToPrevious(): void {
    if (this.carousel) {
      this.carousel.pre();
    }
  }

  goToNext(): void {
    if (this.carousel) {
      this.carousel.next();
    }
  }
}

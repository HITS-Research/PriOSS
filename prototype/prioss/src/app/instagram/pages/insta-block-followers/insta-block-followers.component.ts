import { AfterViewInit, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

@Component({
  selector: 'app-insta-block-followers',
  templateUrl: './insta-block-followers.component.html',
  styleUrls: ['./insta-block-followers.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstaBlockFollowersComponent implements AfterViewInit {
  BlockFollowersWeb = 0;
  instructionTextBlockFollowers = 'First, you have to visit Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
  instructionPictureBlockFollowers = "../../assets/images/insta-privacy-recommendations/login.png";
  @Input()
  previewMode = false;

  async ngAfterViewInit() {
    scrollToTop();
  }

  preBlockFollowers(): void {
    this.BlockFollowersWeb -= 1;
    this.changeContentTailoredAds();
  }

  nextBlockFollowers(): void {
    this.BlockFollowersWeb += 1;
    this.changeContentTailoredAds();
  }

  changeContentTailoredAds(): void {
    switch (this.BlockFollowersWeb) {
      case 0: {
        this.instructionTextBlockFollowers = 'First, you have to visit Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
        this.instructionPictureBlockFollowers = "../../assets/images/insta-privacy-recommendations/login.png";
        break;
      }
      case 1: {
        this.instructionTextBlockFollowers = 'You need to click "profile" icon and then, click "followers". Now select the follower you want to block.';
        this.instructionPictureBlockFollowers = "../../assets/images/insta-privacy-recommendations/6.png";
        break;
      }
      case 2: {
        this.instructionTextBlockFollowers = 'Click on the three dots at the top right corner and now choose the "Block" option.';
        this.instructionPictureBlockFollowers = "../../assets/images/insta-privacy-recommendations/7.png";
        break;
      }
      default: {
        this.instructionTextBlockFollowers = 'Error';
      }
    }
  }
}

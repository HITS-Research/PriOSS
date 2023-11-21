import { AfterViewInit, Component, Input } from '@angular/core';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';
/**
  * This component is responsible for providing guidelines to block followers.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */

@Component({
  selector: 'app-insta-block-followers',
  templateUrl: './insta-block-followers.component.html',
  styleUrls: ['./insta-block-followers.component.less']
})
export class InstaBlockFollowersComponent implements AfterViewInit{
  BlockFollowersWeb = 0;
  instructionTextBlockFollowers='First, you have to visit Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
  instructionPictureBlockFollowers="../../assets/images/insta-privacy-recommendations/login.png";
  @Input()
  previewMode = false;

  async ngAfterViewInit(){
    scrollToTop();
  }
   /**
   * Callback function to decrement the "BlockFollowersWeb" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
   preBlockFollowers(): void {
    this.BlockFollowersWeb -= 1;
    this.changeContentTailoredAds();
  }

    /**
   * Callback function to increment the "BlockFollowersWeb" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
    nextBlockFollowers(): void {
      this.BlockFollowersWeb += 1;
      this.changeContentTailoredAds();
    }
/**
   * This method shows the instruction text and picture depending on the step the Web browser user is in.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
changeContentTailoredAds(): void {
  switch (this.BlockFollowersWeb) {
    case 0: {
      this.instructionTextBlockFollowers='First, you have to visit Instagram website- https://www.instagram.com/ on your computer or mobile browser and log in. This will get you to your account overview.';
      this.instructionPictureBlockFollowers="../../assets/images/insta-privacy-recommendations/login.png";
      break;
    }
    case 1: {
      this.instructionTextBlockFollowers='You need to click "profile" icon and then, click "followers". Now select the follower you want to block.';
      this.instructionPictureBlockFollowers="../../assets/images/insta-privacy-recommendations/6.png";
      break;
    }
    case 2: {
      this.instructionTextBlockFollowers='Click on the three dots at the top right corner and now choose the "Block" option.';
      this.instructionPictureBlockFollowers="../../assets/images/insta-privacy-recommendations/7.png";
      break;
    }
    default: {
      this.instructionTextBlockFollowers='Error';
    }
  }
}

BlockFollowersMobile = 0;
  instructionTextBlockFollowersMobile='First, open your Instagram application on your mobile phone and log into your account.';
  instructionPictureBlockFollowerssMobile="../../assets/images/insta-privacy-recommendations/40.png";

  /**
   * Callback function to decrement the "BlockFollowersMobile" variable.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preBlockFollowersMobile(): void {
    this.BlockFollowersMobile -= 1;
    this.BlockFollowerschangeMobile();
  }

  /**
   * Callback function to increment the "BlockFollowersMobile" variable.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextBlockFollowersMobile(): void {
    this.BlockFollowersMobile += 1;
    this.BlockFollowerschangeMobile();
  }

  /**
   * This method shows the instruction text and picture depending on the step the Mobile user is in.
   *  @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  BlockFollowerschangeMobile(): void {
    switch (this.BlockFollowersMobile ) {
      case 0: {
        this.instructionTextBlockFollowersMobile='First, open your Instagram application on your mobile phone and log into your account.';
        this.instructionPictureBlockFollowerssMobile="../../assets/images/insta-privacy-recommendations/40.png";
        break;
      }
      case 1: {
        this.instructionTextBlockFollowersMobile='Go to your Followers list and check out the people who follow you.';
        this.instructionPictureBlockFollowerssMobile="../../assets/images/insta-privacy-recommendations/39.png";
        break;
      }
      case 2: {
        this.instructionTextBlockFollowersMobile='Tap on the user that you want to block and from the top-right corner, tap on the menu button now choose the "Block" option.';
        this.instructionPictureBlockFollowerssMobile="../../assets/images/insta-privacy-recommendations/7.png";
        break;
      }
      default: {
        this.instructionTextBlockFollowersMobile='Error';
      }
    }
  }
}




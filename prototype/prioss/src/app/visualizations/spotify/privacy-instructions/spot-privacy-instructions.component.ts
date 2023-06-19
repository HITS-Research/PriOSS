import { Component } from '@angular/core';

@Component({
  selector: 'spot-privacy-instructions',
  templateUrl: './spot-privacy-instructions.component.html',
  styleUrls: ['./spot-privacy-instructions.component.less']
})
export class SpotPrivacyInstructionsComponent {
  isMobile = false;

  currentTailoredAds = 0;
  instructionTextTailoredAds='First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.';
  instructionPictureTailoredAds="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/1.png";
  preTailoredAds(): void {
    this.currentTailoredAds -= 1;
    this.changeContentTailoredAds();
  }

  nextTailoredAds(): void {
    this.currentTailoredAds += 1;
    this.changeContentTailoredAds();
  }

  changeContentTailoredAds(): void {
    switch (this.currentTailoredAds) {
      case 0: {
        this.instructionTextTailoredAds='First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.';
        this.instructionPictureTailoredAds="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/1.png";
        break;
      }
      case 1: {
        this.instructionTextTailoredAds='Select the "Privacy settings" menu.';
        this.instructionPictureTailoredAds="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/2-privacy-settings.png";
        break;
      }
      case 2: {
        this.instructionTextTailoredAds='Now you can opt-out of tailored ads and stop the processing of your Facebook data.';
        this.instructionPictureTailoredAds="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/3.png";
        break;
      }
      default: {
        this.instructionTextTailoredAds='Error';
      }
    }
  }

  currentTailoredAdsMobile = 0;
  instructionTextTailoredAdsMobile='First, open https://accounts.spotify.com/en/login in your browser and log in.';
  instructionPictureTailoredAdsMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_1_login.png";

  preTailoredAdsMobile(): void {
    this.currentTailoredAdsMobile -= 1;
    this.changeContentTailoredAdsMobile();
  }

  nextTailoredAdsMobile(): void {
    this.currentTailoredAdsMobile += 1;
    this.changeContentTailoredAdsMobile();
  }

  changeContentTailoredAdsMobile(): void {
    switch (this.currentTailoredAdsMobile) {
      case 0: {
        this.instructionTextTailoredAdsMobile='First, open https://accounts.spotify.com/en/login in your browser and log in.';
        this.instructionPictureTailoredAdsMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_1_login.png";
        break;
      }
      case 1: {
        this.instructionTextTailoredAdsMobile='Choose "Account overview".';
        this.instructionPictureTailoredAdsMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_2_choose_overview.png";
        break;
      }
      case 2: {
        this.instructionTextTailoredAdsMobile='Expand the list of menus and choose "Privacy Settings".';
        this.instructionPictureTailoredAdsMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_4_overview.png";
        break;
      }
      case 3: {
        this.instructionTextTailoredAdsMobile='Opt-out of tailored ads';
        this.instructionPictureTailoredAdsMobile="/../../assets/images/spot-privacy-instructions/mobile/web/web_privacy_settings_tailored_ads.png";
        break;
      }
      case 4: {
        this.instructionTextTailoredAdsMobile='Stop the processing of your Facebook data.';
        this.instructionPictureTailoredAdsMobile="/../../assets/images/spot-privacy-instructions/mobile/web/web_privacy_settings_facebook.png";
        break;
      }
      default: {
        this.instructionTextTailoredAdsMobile='Error';
      }
    }
  }

  currentRegistrationData = 0;
  instructionTextRegistrationData='First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.';
  instructionPictureRegistrationData="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/1.png";

  preRegistrationData(): void {
    this.currentRegistrationData -= 1;
    this.changeContentRegistrationData();
  }

  nextRegistrationData(): void {
    this.currentRegistrationData += 1;
    this.changeContentRegistrationData();
  }

  changeContentRegistrationData(): void {
    switch (this.currentRegistrationData) {
      case 0: {
        this.instructionTextRegistrationData='First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.';
        this.instructionPictureRegistrationData="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/1.png";
        break;
      }
      case 1: {
        this.instructionTextRegistrationData='Select the "Edit profile" menu.';
        this.instructionPictureRegistrationData="/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/2-edit-profile.png";
        break;
      }
      case 2: {
        this.instructionTextRegistrationData='Now you can opt-out of sharing your registration data for marketing purposes.';
        this.instructionPictureRegistrationData="/../../assets/images/spot-privacy-instructions/desktop/spot-registration-data/3.png";
        break;
      }
      default: {
        this.instructionTextRegistrationData='Error';
      }
    }
  }

  currentRegistrationDataMobile = 0;
  instructionTextRegistrationDataMobile='First, open https://accounts.spotify.com/en/login in your browser and log in.';
  instructionPictureRegistrationDataMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_1_login.png";

  preRegistrationDataMobile(): void {
    this.currentRegistrationDataMobile -= 1;
    this.changeContentRegistrationDataMobile();
  }

  nextRegistrationDataMobile(): void {
    this.currentRegistrationDataMobile += 1;
    this.changeContentRegistrationDataMobile();
  }

  changeContentRegistrationDataMobile(): void {
    switch (this.currentRegistrationDataMobile) {
      case 0: {
        this.instructionTextRegistrationDataMobile='First, open https://accounts.spotify.com/en/login in your browser and log in.';
        this.instructionPictureRegistrationDataMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_1_login.png";
        break;
      }
      case 1: {
        this.instructionTextRegistrationDataMobile='Choose "Account overview".';
        this.instructionPictureRegistrationDataMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_2_choose_overview.png";
        break;
      }
      case 2: {
        this.instructionTextRegistrationDataMobile='Expand the list of menus and choose "Edit Profile".';
        this.instructionPictureRegistrationDataMobile="/../../assets/images/spot-privacy-instructions/mobile/web/general/web_4_overview.png";
        break;
      }
      case 3: {
        this.instructionTextRegistrationDataMobile='Now you can opt-out of sharing your registration data for marketing purposes.';
        this.instructionPictureRegistrationDataMobile="/../../assets/images/spot-privacy-instructions/mobile/web/web_edit_profile.png";
        break;
      }
      default: {
        this.instructionTextRegistrationDataMobile='Error';
      }
    }
  }


  currentSocial = 0;
  instructionTextSocial='First, open the Spotify application. Click on the icon in the top right corner and then choose "Settings".';
  instructionPictureSocial="/../../assets/images/spot-privacy-instructions/desktop/spot-social/1.png";

  preSocial(): void {
    this.currentSocial -= 1;
    this.changeContentSocial();
  }

  nextSocial(): void {
    this.currentSocial += 1;
    this.changeContentSocial();
  }

  changeContentSocial(): void {
    switch (this.currentSocial) {
      case 0: {
        this.instructionTextSocial='First, open the Spotify application. Click on the icon in the top right corner and then choose "Settings".';
        this.instructionPictureSocial="/../../assets/images/spot-privacy-instructions/desktop/spot-social/1.png";
        break;
      }
      case 1: {
        this.instructionTextSocial='Scroll down to the "Social" section and opt-out of the corresponding options.';
        this.instructionPictureSocial="/../../assets/images/spot-privacy-instructions/desktop/spot-social/2.png";
        break;
      }
      case 2: {
        this.instructionTextSocial='Now you can opt out for tailored ads and stop the processing of your Facebook data.';
        this.instructionPictureSocial="/../../assets/images/spot-privacy-instructions/desktop/spot-social/2.png";
        break;
      }
      default: {
        this.instructionTextSocial='Error';
      }
    }
  }

  currentSocialMobile = 0;
  instructionTextSocialMobile='First, open the Spotify application. Click on the icon in the top right corner and choose settings.';
  instructionPictureSocialMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_1_home.png";

  preSocialMobile(): void {
    this.currentSocialMobile -= 1;
    this.changeContentSocialMobile();
  }

  nextSocialMobile(): void {
    this.currentSocialMobile += 1;
    this.changeContentSocialMobile();
  }

  changeContentSocialMobile(): void {
    switch (this.currentSocialMobile) {
      case 0: {
        this.instructionTextSocialMobile='First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.';
        this.instructionPictureSocialMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_1_home.png";
        break;
      }
      case 1: {
        this.instructionTextSocialMobile='Scroll down to the "Social" section and opt-out of the corresponding options.';
        this.instructionPictureSocialMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_2_settings_privacy.png";
        break;
      }
      default: {
        this.instructionTextSocialMobile='Error';
      }
    }

  }


  currentPlaylist = 0;
  instructionTextPlaylist='First, open the Spotify application. Click on the icon in the top right corner and then choose "Profile".';
  instructionPicturePlaylist="/../../assets/images/spot-privacy-instructions/desktop/spot-public-playlists/1.png";

  prePlaylist(): void {
    this.currentPlaylist -= 1;
    this.changeContentPlaylist();
  }

  nextPlaylist(): void {
    this.currentPlaylist += 1;
    this.changeContentPlaylist();
  }

  changeContentPlaylist(): void {
    switch (this.currentPlaylist) {
      case 0: {
        this.instructionTextPlaylist='First, open the Spotify application. Click on the icon in the top right corner and then choose "Profile".';
        this.instructionPicturePlaylist="/../../assets/images/spot-privacy-instructions/desktop/spot-public-playlists/1.png";
        break;
      }
      case 1: {
        this.instructionTextPlaylist='Here you find an overview of your public playlists. You can configure for each playlist whether it should be public or not.';
        this.instructionPicturePlaylist="/../../assets/images/spot-privacy-instructions/desktop/spot-public-playlists/2.png";
        break;
      }
      default: {
        this.instructionTextPlaylist='Error';
      }
    }
  }

  currentPlaylistMobile = 0;
  instructionTextPlaylistMobile='First, open the Spotify application. Click on the icon in the top right corner and choose settings.';
  instructionPicturePlaylistMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_1_home.png";

  prePlaylistMobile(): void {
    this.currentPlaylistMobile -= 1;
    this.changeContentPlaylistMobile();
  }

  nextPlaylistMobile(): void {
    this.currentPlaylistMobile += 1;
    this.changeContentPlaylistMobile();
  }

  changeContentPlaylistMobile(): void {
    switch (this.currentPlaylistMobile) {
      case 0: {
        this.instructionTextPlaylistMobile='First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.';
        this.instructionPicturePlaylistMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_1_home.png";
        break;
      }
      case 1: {
        this.instructionTextPlaylistMobile='Click on "View Profile" right at the top.';
        this.instructionPicturePlaylistMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_3_settings.png";
        break;
      }
      case 2: {
        this.instructionTextPlaylistMobile='Here you find an overview of your public playlists. You can configure for each playlist whether it should be public or not.';
        this.instructionPicturePlaylistMobile="/../../assets/images/spot-privacy-instructions/mobile/app/app_4_profile_preview.png";
        break;
      }
      default: {
        this.instructionTextPlaylistMobile='Error';
      }
    }

  }

  onTabSwitch() {
    this.isMobile = !this.isMobile;
  }
}


import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Step } from 'src/app/features/stepper/step.type';
import { StepperComponent } from 'src/app/features/stepper/stepper.component';

/**
 * This component contains privacy instructions. The instructions show users how to
 * change privacy-related settings in Spotify.
 */
@Component({
  templateUrl: './spot-privacy-instructions.component.html',
  styleUrls: ['./spot-privacy-instructions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StepperComponent, NzTabsModule, NzTypographyModule],
})
export class SpotPrivacyInstructionsComponent {

  tailormadeAdsSteps = signal<Step[]>([
    {
      title: 'Step 1',
      description:
        'First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/1.png',
    },
    {
      title: 'Step 2',
      description: 'Select the "Privacy settings" menu.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/2-privacy-settings.png',
    },
    {
      title: 'Step 3',
      description:
        'Now you can opt-out of tailored ads and stop the processing of your Facebook data.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/3.png',
    },
  ]);

  tailoredAdsMobile = signal<Step[]>([
    {
      title: 'Step 1',
      description:
        'First, open https://accounts.spotify.com/en/login in your browser and log in.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/general/web_1_login.png',
    },
    {
      title: 'Step 2',
      description: 'Choose "Account overview".',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/general/web_2_choose_overview.png',
    },
    {
      title: 'Step 3',
      description: 'Expand the list of menus and choose "Privacy Settings".',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/general/web_4_overview.png',
    },
    {
      title: 'Step 4',
      description: 'Opt-out of tailored ads.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/web_privacy_settings_tailored_ads.png',
    },
    {
      title: 'Step 5',
      description: 'Stop the processing of your Facebook data.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/web_privacy_settings_facebook.png',
    },
  ]);

  registrationData = signal<Step[]>([
    {
      title: 'Step 1',
      description:
        'First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/1.png',
    },
    {
      title: 'Step 2',
      description: 'Select the "Edit profile" menu.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/desktop/spot-tailored-ads/2-edit-profile.png',
    },
    {
      title: 'Step 3',
      description:
        'Now you can opt-out of sharing your registration data for marketing purposes.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/desktop/spot-registration-data/3.png',
    },
  ]);

  registrationDataMobile = signal<Step[]>([
    {
      title: 'Step 1',
      description:
        'First, open https://accounts.spotify.com/en/login in your browser and log in.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/general/web_1_login.png',
    },
    {
      title: 'Step 2',
      description: 'Choose "Account overview".',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/general/web_2_choose_overview.png',
    },
    {
      title: 'Step 3',
      description: 'Expand the list of menus and choose "Edit Profile".',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/general/web_4_overview.png',
    },
    {
      title: 'Step 4',
      description:
        'Now you can opt-out of sharing your registration data for marketing purposes.',
      imageUrl:
        '/../../assets/images/spot-privacy-instructions/mobile/web/web_edit_profile.png',
    },
  ]);

  social = signal<Step[]>([
    {
      title: 'Step 1',
      description: 'First, open the Spotify application. Click on the icon in the top right corner and then choose "Settings".',
      imageUrl: '/../../assets/images/spot-privacy-instructions/desktop/spot-social/1.png',
    },
    {
      title: 'Step 2',
      description: 'Scroll down to the "Social" section and opt-out of the corresponding options.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/desktop/spot-social/2.png',
    },
    {
      title: 'Step 3',
      description: 'Now you can opt out for tailored ads and stop the processing of your Facebook data.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/desktop/spot-social/2.png',
    },
  ]);

  socialMobile = signal<Step[]>([
    {
      title: 'Step 1',
      description: 'First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/mobile/app/app_1_home.png',
    },
    {
      title: 'Step 2',
      description: 'Scroll down to the "Social" section and opt-out of the corresponding options.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/mobile/app/app_2_settings_privacy.png',
    },
  ]);

  playlist = signal<Step[]>([
    {
      title: 'Step 1',
      description: 'First, open the Spotify application. Click on the icon in the top right corner and then choose "Profile".',
      imageUrl: '/../../assets/images/spot-privacy-instructions/desktop/spot-public-playlists/1.png',
    },
    {
      title: 'Step 2',
      description: 'Here you find an overview of your public playlists. You can configure for each playlist whether it should be public or not.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/desktop/spot-public-playlists/2.png',
    },
  ]);

  playlistMobile = signal<Step[]>([
    {
      title: 'Step 1',
      description: 'First, open https://accounts.spotify.com/en/login in your browser and log in. This will get you to your account overview.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/mobile/app/app_1_home.png',
    },
    {
      title: 'Step 2',
      description: 'Click on "View Profile" right at the top.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/mobile/app/app_3_settings.png',
    },
    {
      title: 'Step 2',
      description: 'Here you find an overview of your public playlists. You can configure for each playlist whether it should be public or not.',
      imageUrl: '/../../assets/images/spot-privacy-instructions/mobile/app/app_4_profile_preview.png',
    },
  ]);

}

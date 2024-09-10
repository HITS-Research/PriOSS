import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { SpotifyInferencesInterpretationComponent } from '../../features/inferences/spotify-inferences-interpretation/spotify-inferences-interpretation.component';
import { SpotifyInferencesRawDataComponent } from '../../features/inferences/spotify-inferences-raw-data/spotify-inferences-raw-data.component';
import { Router } from '@angular/router';

/**
 * The Component processes the inferences, makes them searchable,
 * assigns a checkbox to each item, and enables the user to send
 * the inferences to Spotify support with a template to rectify selected inferences.
 */

@Component({
  selector: 'prioss-spotify-inferences',
  templateUrl: './inferences.component.html',
  styleUrls: ['./inferences.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzTabsModule,
    SpotifyInferencesRawDataComponent,
    SpotifyInferencesInterpretationComponent,
    TitleBarComponent,
  ],
})
export class InferencesComponent {

  #router = inject(Router);

  previewMode = input<boolean>(false);

  /**
   * Navigates to the dashboard of the current feature.
   */
  navigateToDashboard() {
    this.#router.navigate(['dashboard']);
  }
}

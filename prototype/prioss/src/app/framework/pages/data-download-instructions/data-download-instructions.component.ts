import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DataDownloadFacebookComponent } from 'src/app/facebook/features/data-download-facebook/data-download-facebook.component';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { DataDownloadInstagramComponent } from 'src/app/instagram/features/data-download-instagram/data-download-instagram.component';
import { DataDownloadSpotifyComponent } from 'src/app/spotify/features/data-download-spotify/data-download-spotify.component';

/**
  * This component is responsible for displaying the Data-Download instructions
  * for the different services in a single page. It integrates the tutorials
  * that were previously displayed directly on the Service Selection page. It
  * Adepts the step-by-step apporach for the instructions initially used by
  * Instagram to the other services
  *
  * @author Alexander Nickel (nickela(at)mail.uni-paderborn.de)
  */
@Component({
  templateUrl: './data-download-instructions.component.html',
  styleUrl: './data-download-instructions.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DataDownloadFacebookComponent,
    DataDownloadInstagramComponent,
    DataDownloadSpotifyComponent,
    NzButtonModule,
    NzTabsModule,
    RouterModule,
    TitleBarComponent,
  ]
})
export class DataDownloadInstructionsComponent {

  #router = inject(Router);

  /**
   * This method returns the User back to the ServiceSelection page upon beeing
   * called.
   * @author Max (maxy(at)mail.upb.de)
   */
  returnToServiceSelection(): void {
    this.#router.navigate(['serviceSelection']);
  }

}

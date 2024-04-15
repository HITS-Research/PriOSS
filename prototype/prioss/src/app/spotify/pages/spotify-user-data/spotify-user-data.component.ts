import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Observable } from 'rxjs';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { SpotifyUserdataViewComponent } from '../../features/user/spotify-userdata-view.component';
import { SpotifyUserState } from '../../features/user/user.state';
import { SpotifyUserStateModel } from '../../features/user/user.statemodel';

@Component({
  selector: 'prioss-spotify-user-data',
  templateUrl: './spotify-user-data.component.html',
  styleUrl: './spotify-user-data.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NzCardModule,
    SpotifyUserdataViewComponent,
    TitleBarComponent,
  ],
})
export class SpotifyUserDataComponent {

  #router = inject(Router);

  /**
   * The mode of this view. Removes some elements when true.
   */
  preview = input(false);

  /**
   * The current user-data.
   */
  @Select(SpotifyUserState)
  userData$: Observable<SpotifyUserStateModel>;

  /**
   * Navigates to the dashboard of the current feature.
   */
  navigateToDashboard() {
    this.#router.navigate(['dashboard']);
  }

}

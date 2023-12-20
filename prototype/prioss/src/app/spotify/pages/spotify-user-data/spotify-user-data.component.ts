import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NzListModule } from 'ng-zorro-antd/list';
import { Observable } from 'rxjs';
import { CapitalizePipe } from 'src/app/features/naming/capitalize.pipe';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
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
    CapitalizePipe,
    KeyValuePipe,
    NzListModule,
    TitleBarComponent,
  ],
})
export class SpotifyUserDataComponent {

  #router = inject(Router);

  /**
   * The mode of this view. Removes some elements when true.
   */
  @Input()
  preview: boolean = false;

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

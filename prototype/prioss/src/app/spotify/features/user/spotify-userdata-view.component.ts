import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { CapitalizePipe } from 'src/app/features/naming/capitalize.pipe';
import { SpotifyUserStateModel } from './user.statemodel';

@Component({
  selector: 'prioss-spotify-userdata-view',
  templateUrl: './spotify-userdata-view.component.html',
  styleUrl: './spotify-userdata-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CapitalizePipe,
    KeyValuePipe,
    NzEmptyModule,
    NzListModule,
  ],
})
export class SpotifyUserdataViewComponent {

  userData = input.required<SpotifyUserStateModel>();

}

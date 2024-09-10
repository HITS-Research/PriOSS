import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';

@Component({
  selector: 'prioss-spotify-privacy-information',
  templateUrl: './spotify-privacy-information.component.html',
  styleUrl: './spotify-privacy-information.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TitleBarComponent, NzCardModule, NzImageModule],
})
export class SpotifyPrivacyInformationComponent {
  previewMode = input<boolean, string>(false, { transform: booleanAttribute });
}

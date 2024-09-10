import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'prioss-network-status-icon',
  templateUrl: './network-status-icon.component.html',
  styleUrl: './network-status-icon.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconModule],
})
export class NetworkStatusIconComponent {
  networkStatus = inject(Store).selectSignal(AppState.networkStatus);

  networkStatusText = computed(() =>
    this.networkStatus() ? 'Online' : 'Offline',
  );

  networkStatusColor = computed(() =>
    this.networkStatus() ? '#07f112' : '#e81209',
  );
}

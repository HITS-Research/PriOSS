import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { HeaderMenuService } from '../dashboard-menu/header-menu.service';

@Component({
  selector: 'prioss-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DashboardMenuComponent, NzButtonModule, NzIconModule, RouterModule],
})
export class HeaderComponent {

  headerMenuService = inject(HeaderMenuService);

  serviceName = input<string | null>(null);

}

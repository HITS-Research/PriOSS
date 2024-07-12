import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  inject,
  input, OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { HeaderMenuService } from '../dashboard-menu/header-menu.service';
import {Select} from "@ngxs/store";
import {AppState} from "../../../state/app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'prioss-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DashboardMenuComponent, NzButtonModule, NzIconModule, RouterModule],
})
export class HeaderComponent implements OnInit{
  @Select(AppState.getNetworkStatus) networkStatus$: Observable<boolean>;
  headerMenuService = inject(HeaderMenuService);
  networkStatus: boolean = false;
  serviceName = input<string | null>(null);

  constructor(private cd:ChangeDetectorRef) {
  }

  ngOnInit() {
    this.networkStatus$.subscribe((flag:boolean)=>{
      this.networkStatus = flag;
      this.cd.markForCheck();
    })
  }
}

import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentMsg } from './features/messaging/app-component-msg/app-component-msg.enum';
import { AppComponentMsgService } from './features/messaging/app-component-msg/app-component-msg.service';
import { HeaderMenuService } from './framework/features/dashboard-menu/header-menu.service';

/**
 * This is the base component of the application that is always shown. It
 * includes the side menu and the router outlet, which gets replaced by the
 * page component that the user currently navigated to
 *
 * @author: Paul (pasch(at)mail.upb.de), Simon (scg(at)mail.upb.de)
 */
@Component({
  selector: 'prioss-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'prioss';

  router = inject(Router);

  headerMenuService = inject(HeaderMenuService);

  #appComponentMsgService = inject(AppComponentMsgService);

  breakpointObserver = inject(BreakpointObserver);

  serviceName = signal<string | null>(null);

  ngOnInit(): void {
    this.#appComponentMsgService.appMsg$.subscribe(msg => {
      this.parseAppMsg(msg);
    });
  }

  /**
   * This method sets the service name property depending on the current dashboard.
   *
   * @author: Paul (pasch(at)mail.upb.de)
   */
  setServiceName(): void {
    switch (this.router.url) {
      case '/facebook/dashboard':
        this.serviceName.set('facebook');
        break;

      case '/instagram/dashboard':
        this.serviceName.set('instagram');
        break;

      case '/spotify/dashboard':
        this.serviceName.set('spotify');
        break;

      case '/serviceSelection':
        this.serviceName.set(null);
        break;
    }
  }

  /**
   * This method navigates to the current Dashboard.
   * If serviceName is not defined, it redirects to home page
   *
   * @author: Paul (pasch(at)mail.upb.de)
   *
   */
  routeToDashboard(): void {
    const navigationPath = this.serviceName()
      ? `/${this.serviceName()}/dashboard`
      : '/home';
    this.router.navigateByUrl(navigationPath);
  }

  /**
   * Reacts to messages received from the app component msg service
   *
   * @param msg The message received from the msg service
   *
   * @author: Simon (scg(at)mail.upb.de)
   */
  parseAppMsg(msg: AppComponentMsg): void {
    switch (msg) {
      case AppComponentMsg.backToDashboard:
        this.routeToDashboard();
        break;

      case AppComponentMsg.none:
        break;

      default:
        break;
    }
  }

  /**
   * Returns the current full year 'YYYY'.
   */
  fullYear = signal(new Date().getFullYear());
}

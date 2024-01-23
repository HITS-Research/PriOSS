import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import * as utilities from 'src/app/features/utils/generalUtilities.functions';
import { SQLiteService } from './db/sqlite/sqlite.service';
import { AppComponentMsgService } from './features/messaging/app-component-msg/app-component-msg.service';
import { AppComponentMsg } from './features/messaging/app-component-msg/app-component-msg.enum';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'prioss';

  pRouter: Router;

  isCollapsed = false;

  serviceName: string | null;

  showServiceButton = false;

  navigateAndScroll: (router: Router, url: string) => void = utilities.navigateAndScroll;

  /**
   * Determine the width in px of the side menu when it is collapsed.
   * This is set via a call in ngOnInit depending on the device's screensize.
   */
  collapseWidth: number;

  public isWeb = false;

  constructor(
    private router: Router,
    private sqlite: SQLiteService,
    private appComponentMsgService: AppComponentMsgService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.pRouter = router;

    appComponentMsgService.appMsg$.subscribe((msg) => {
      this.parseAppMsg(msg);
    });

    this.sqlite.initializePlugin().then(async () => {
      if (this.sqlite.platform === "web") {
        this.isWeb = true;
        await customElements.whenDefined('jeep-sqlite');
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if (jeepSqliteEl != null) {
          await this.sqlite.initWebStore();
          await jeepSqliteEl.isStoreOpen();
        }
      }
    });
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.collapseWidth = 80;
        } else {
          this.collapseWidth = 0;
        }
      });
  }

  /**
   * This method sets the service name property depending on the current dashboard.
   *
   * @author: Paul (pasch(at)mail.upb.de)
   */
  setServiceName(): void {
    switch (this.router.url) {
      case '/face/dashboard':
        this.serviceName = 'face';
        break;

      case '/insta/dashboard':
        this.serviceName = 'insta';
        break;

      case '/spot/dashboard':
        this.serviceName = 'spot';
        break;

      case '/serviceSelection':
        this.serviceName = null;
        break;
    }
    this.recalculateShowServiceButton();
  }

  /**
   * This method checks if the current url contains a specific fragment
   *
   * @param fragment the fragment or section to be checked
   * @returns true, if the fragment is contained in the dashboard url
   *          false, if not
   *
   * @author: Paul (pasch(at)mail.upb.de)
   */
  isSelected(fragment: string): boolean {
    return this.router.url === '/' + this.serviceName + '/dashboard' + fragment;
  }

  /**
   * This method navigates to the current Dashboard. 
   * If serviceName is not defined, it redirects to home page
   * 
   * @author: Paul (pasch(at)mail.upb.de)
   *
   */
  routeToDashboard(): void {
    const navigationPath = this.serviceName ? `/${this.serviceName}/dashboard` : '/home'
    this.router.navigateByUrl(navigationPath)   
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
   * This method is responsible for setting the variables that determine if the
   * navbar is closed and buttons should be shown.
   *
   * @author: Paul (pasch(at)mail.upb.de)
   */
  handleNavbarFold(): void {
    this.isCollapsed = !this.isCollapsed;
    this.recalculateShowServiceButton();
  }

  /**
   * Caclulates whether the Switch Service Button should be shown and writes the
   * result in this.showServiceButton
   *
   * @author: Simon (scg(at)mail.upb.de)
   */
  recalculateShowServiceButton(): void {
    this.showServiceButton = !this.router.url.includes('contact') && !this.router.url.includes('about') && !this.router.url.includes('known-issues')
      && !this.router.url.includes('serviceSelection') && !this.router.url.includes('home');
  }
}

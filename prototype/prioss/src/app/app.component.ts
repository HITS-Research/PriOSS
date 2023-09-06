import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { SQLiteService } from './services/sqlite/sqlite.service';
import { AppComponentMsgService } from './services/app-component-msg/app-component-msg.service';
import { AppComponentMsg } from './utilities/enum/app-component-msg.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'prioss';
  pRouter: Router;
  isCollapsed = false;
  serviceName: string | null;
  isDashboard = false;
  showServiceButton = false;
  navigateAndScroll: (router: Router, url: string) => void = utilities.navigateAndScroll;

  /**
   * Determine the width in px of the side menu when it is collapsed.
   * This is set via a call in ngOnInit depending on the device's screensize.
   */
  collapseWidth: number;

  public isWeb = false;
  private initPlugin: boolean;

  constructor(private router: Router, private sqlite: SQLiteService, private appComponentMsgService: AppComponentMsgService, public breakpointObserver: BreakpointObserver) {
    this.pRouter = router;

    appComponentMsgService.appMsg$.subscribe((msg) =>
    {
      this.parseAppMsg(msg);
    });

    this.sqlite.initializePlugin().then(async (ret) => {
      this.initPlugin = ret;

      if( this.sqlite.platform === "web") {
        this.isWeb = true;
        await customElements.whenDefined('jeep-sqlite');
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if(jeepSqliteEl != null) {
          await this.sqlite.initWebStore();
          console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
        } else {
          console.log('>>>> jeepSqliteEl is null');
        }
      }

      console.log('>>>> in App  this.initPlugin ' + this.initPlugin);
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
  * @author: Paul (pasch@mail.upb.de)
  *
  */
  setServiceName(): void {
    console.log(this.router.url);
    switch ( this.router.url ) {
      case '/face/dashboard':
        this.serviceName = 'face';
        this.isDashboard = true;
        break;
      case '/insta/dashboard':
        this.serviceName = 'insta';
        this.isDashboard = true;
        break;
      case '/spot/dashboard':
        this.serviceName = 'spot';
        this.isDashboard = true;
        break;
      case '/serviceSelection':
        this.serviceName = null;
        this.isDashboard = false;
        break;
    }
    this.showServiceButton = !this.router.url.includes('contact') && !this.router.url.includes('about') && !this.router.url.includes('known-issues') 
                              && !this.router.url.includes('serviceSelection') && !this.router.url.includes('home');
  }

  /**
   * This method checks if the current url contains a specific fragment
   * 
   * @param fragment the fragment or section to be checked
   * @returns true, if the fragment is contained in the dashboard url
   *          false, if not
   *
   * @author: Paul (pasch@mail.upb.de)
   * 
   */
  isSelected(fragment: string): boolean {
    return this.router.url === '/' + this.serviceName + '/dashboard' + fragment;
  }

  /**
   * This method navigates to the current Dashboard.
   * 
   * @author: Paul (pasch@mail.upb.de)
   * 
   */
  routeToDashboard(): void {
    this.router.navigateByUrl('/' + this.serviceName + '/dashboard');
  }

  /**
   * Reacts to messages received from the app component msg service
   * 
   * @param msg The message received from the msg service
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  parseAppMsg(msg: AppComponentMsg): void {
    switch(msg) {
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
   * This method is responsible for setting the variables that determine if the navbar is closed and buttons should be shown.
   * 
   * @author: Paul (pasch@mail.upb.de)
   */
  handleNavbarFold(): void {
    this.isCollapsed = !this.isCollapsed;
    this.showServiceButton = !this.router.url.includes('serviceSelection') && !this.router.url.includes('home');
  }
}

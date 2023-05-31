import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { SQLiteService } from './services/sqlite/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: string = 'prioss';
  pRouter: Router;
  isCollapsed: boolean = false;
  serviceName: string | null;
  isDashboard: boolean = false;
  showBackButton: boolean = false;
  showServiceButton: boolean = false;
  navigateAndScroll: (router: Router, url: string) => void = utilities.navigateAndScroll;

  public isWeb: boolean = false;
  private initPlugin: boolean;

  constructor(private router: Router, private sqlite: SQLiteService) {
    this.pRouter = router;

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
    this.showBackButton = !this.router.url.includes('dashboard')  && this.serviceName != null;
    this.showServiceButton = !this.router.url.includes('serviceSelection') && !this.isCollapsed;
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
    this.router.navigate(['/' + this.serviceName + '/dashboard']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as utilities from 'src/app/utilities/generalUtilities.functions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: string = 'prioss';
  pRouter: Router;
  isCollapsed: boolean = false;
  serviceName: string;
  isDashboard: boolean = false;
  navigateAndScroll: (router: Router, url: string) => void = utilities.navigateAndScroll;

  constructor(private router: Router) {
    this.pRouter = router;
  }

  /**
  * This method sets the service name property depending on the current dashboard.
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
  setServiceName(): void {
    console.log(this.router.url)
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
    }
  }
}

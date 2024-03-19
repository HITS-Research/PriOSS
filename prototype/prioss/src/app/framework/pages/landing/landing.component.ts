import { Component,ChangeDetectionStrategy } from '@angular/core';
import { Router} from '@angular/router';
//Icons
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

/**
  * This component is responsible displaying the initial landing page of the application from which the user can navigate to the service-selection page
  *
  * @author: Rishma (rishmamn@mail.uni-paderborn.de ) 
  *
  */
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {

  faChevronDown = faChevronDown;

  constructor(
    private router: Router
  ){}

  goToServiceSelection()
  {
    this.router.navigate(['serviceSelection']);
  }
}

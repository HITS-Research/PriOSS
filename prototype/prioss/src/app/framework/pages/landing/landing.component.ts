import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IconDefinition,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

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
  router = inject(Router);

  faChevronDown: IconDefinition = faChevronDown;

  goToServiceSelection(): void {
    this.router.navigate(['serviceSelection']);
  }
}

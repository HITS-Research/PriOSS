import { Component, EventEmitter, Output } from '@angular/core';
import { Router} from '@angular/router';

/**
 * Component that displays a help button and emits an event when clicked.
 * Use the `buttonClick` event to listen for when the button is clicked and perform any desired actions.
 * @example
 * <app-help-button (buttonClick)="onClick()"></app-help-button>
 * 
 * @author: Sven (svenf@mail.upb.de)
 */
@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.less']
})


export class HelpButtonComponent {


  /**
   * @param {Router} router - The router service used for navigation.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  constructor(
    private router: Router
  ) { }

  /**
   * Navigates to the About page.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  goToAbout() {
    this.router.navigate(['about']);
  }
  /**
   * This property will emit an event when the button is clicked, and the parent component can listen for this event.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  @Output() startTourClick = new EventEmitter();


  /**
   * To use the component with service specific tour function you can add the function in the component and html file.
   * <app-help-button (startTourClick)="function()"></app-help-button>
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  startTour() {
    this.startTourClick.emit();
  }

}

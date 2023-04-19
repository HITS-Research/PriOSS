import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.less']
})
export class HelpButtonComponent {
  /**
   * This property will emit an event when the button is clicked, and the parent component can listen for this event.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  @Output() buttonClick = new EventEmitter();


  /**
   * To use the component with service specific tour function you can add the function in the component and html file.
   * <app-help-button (buttonClick)="function()"></app-help-button>
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  onClick() {
    this.buttonClick.emit();
  }

}

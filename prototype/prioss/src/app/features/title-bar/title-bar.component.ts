import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppComponentMsg } from 'src/app/features/messaging/app-component-msg/app-component-msg.enum';
import { AppComponentMsgService } from 'src/app/features/messaging/app-component-msg/app-component-msg.service';

/**
 * renders a page title with a back to dashboard button above it and an optional info icon besides the title.
 * Text of the info-button-tooltip and the title can be set in the html tag via the tooltipText and titleText attributes.
 *
 * @author Simon (scg@mail.upb.de)
 */
@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.less']
})
export class TitleBarComponent {

  @Input()
  titleText = "Default Title";
  @Input()
  tooltipText = "";
  @Input()
  includeButton = true;
  /**
   * Hook a function up to this Event Emitter and set overrideBackButtonFunction to true via html attributes
   * to change the functionality of the back button above the title
   */
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onButtonClickedEventOverride: EventEmitter<any> = new EventEmitter()
  /**
   * If this is set to true, the onButtonClickedEventOverride event emitter emits an event when the back button is clicked
   * and the component does not navigate back to the dashboard
   */
  @Input()
  overrideBackButtonFunction = false;
  /**
   * Pass a text to this variable via a html attribute to change the text that is displayed in the back button above the title
   */
  @Input()
  backButtonTextOverride = "";

  constructor(private appMsgService: AppComponentMsgService) {

  }

  /**
   * Checks if there was an override function given for the functionality of the back button.
   * If so, that function is called. If not, the routeToDashboard member is called.
   *
   * @author Simon (scg@mail.upb.de)
   */
  onClickedBackButton() {
    if(this.overrideBackButtonFunction) {
      this.onButtonClickedEventOverride.emit();
    }
    else {
      this.routeToDashboard();
    }
  }

  /**
   * Sends a message to the AppComponent to route back to the dashboard.
   * This has to be done in the AppComponent because only the AppComponent knows which service - and thereby dashboard - is the current one
   *
   * @author Simon (scg@mail.upb.de)
   */
  routeToDashboard(): void {
    this.appMsgService.msgAppComponent(AppComponentMsg.backToDashboard);
  }
}

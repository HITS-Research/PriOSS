import { Component, Input } from '@angular/core';
import { AppComponentMsg } from 'src/app/enum/app-component-msg.enum';
import { AppComponentMsgService } from 'src/app/services/app-component-msg/app-component-msg.service';

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
  titleText: string = "Default Title";
  @Input()
  tooltipText: string = "";

  constructor(private appMsgService: AppComponentMsgService) {

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

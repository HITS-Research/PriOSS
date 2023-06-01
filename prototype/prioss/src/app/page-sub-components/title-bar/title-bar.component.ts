import { Component, Input } from '@angular/core';
import { AppComponentMsg } from 'src/app/enum/app-component-msg.enum';
import { AppComponentMsgService } from 'src/app/services/app-component-msg/app-component-msg.service';

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

  routeToDashboard(): void {
    this.appMsgService.msgAppComponent(AppComponentMsg.backToDashboard);
  }
}

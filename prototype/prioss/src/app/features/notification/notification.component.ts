import { Component,ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from './notification.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NgIf } from '@angular/common';

/**
  * This component displays an error/notification message in the top right corner
  * when it gets a message via the NotificationService
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NzAlertModule,
  ]
})
export class NotificationComponent {

  notificationMsg = "";

  constructor(protected notifyService: NotificationService) {
    notifyService.notificationMsg$.subscribe(msg => this.notificationMsg = msg);
  }

}


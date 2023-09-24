import { Component, Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

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
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent 
{
  notificationMsg = "";

  constructor(protected notifyService: NotificationService)
  {
    notifyService.notificationMsg$.subscribe((msg) =>
    {
      this.notificationMsg = msg;
    });
  }
}

/**
  * A Singleton service that can be used from anywhere to display a notification message
  * Call showNotification on this service to display a notification.
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationMsgSubject = new BehaviorSubject<string>("");
  public notificationMsg$ = this.notificationMsgSubject.asObservable();


 /**
  * Sets the uploadedFileName to the given filename 
  *
  * @param msg - a string containing notification message that should be shown
  * @param durationMS - the duration in milliseconds for how long the notification should be shown. Default is 5000 (= 5 seconds)
  * @author: Simon (scg@mail.upb.de)
  *
  */
  public showNotification(msg: string, durationMS = 15000) 
  {
    this.notificationMsgSubject.next(msg);
    setTimeout(() =>
    {
      this.notificationMsgSubject.next("");
    }, durationMS);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppComponentMsg } from 'src/app/features/messaging/app-component-msg/app-component-msg.enum';

/**
 * A Service that can be used to send a message to the AppComponent from anywhere in the application out of a set of predefined messages.
 *
 * @author: Simon (scg@mail.upb.de)
 */
@Injectable({
  providedIn: 'root'
})
export class AppComponentMsgService {
  private appMsgSubject = new BehaviorSubject<AppComponentMsg>(AppComponentMsg.none);
  public appMsg$ = this.appMsgSubject.asObservable();

 /**
  * Messages the app component. The component will respond to specific messages in different ways.
  *
  * @param msg - a string containing the message that should be passed to the app component
  * @author: Simon (scg@mail.upb.de)
  */
  public msgAppComponent(msg: AppComponentMsg)
  {
    this.appMsgSubject.next(msg);
  }
}

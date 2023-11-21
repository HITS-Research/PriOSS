import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

/**
 * A Singleton service that can be used from anywhere to display a notification message
 * Call showNotification on this service to display a notification.
 *
 * @author: Simon (scg@mail.upb.de)
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  #notificationMsgSubject = new BehaviorSubject<string>("");

  get notificationMsg$(): Observable<string> {
    return this.#notificationMsgSubject.asObservable();
  }

  /**
   * Sets the uploadedFileName to the given filename
   *
   * @param msg - a string containing notification message that should be shown
   * @param durationMS - the duration in milliseconds for how long the notification should be shown. Default is 5000 (= 5 seconds)
   * @author: Simon (scg@mail.upb.de)
   *
   */
  public showNotification(msg: string, durationMS = 15000) {
    this.#notificationMsgSubject.next(msg);
    setTimeout(() => this.#notificationMsgSubject.next(""), durationMS);
  }

}

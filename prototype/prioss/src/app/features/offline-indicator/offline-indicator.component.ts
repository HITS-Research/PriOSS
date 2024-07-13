import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {SetNetworkStatus} from "../../state/app.action";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";


/**
 * Component that displays a wlan icon.
 * Changes its color depending on the connectivity.
 *
 * @author: Sven (svenf@mail.upb.de)
 */
@Component({
  selector: 'app-offline-indicator',
  templateUrl: './offline-indicator.component.html',
  styleUrls: ['./offline-indicator.component.less']
})
export class OfflineIndicatorComponent implements OnInit {
  onlineStatus: boolean;
  @Input() bottom: string | null = null;
  @Input() right: string | null = null;
  @Select(AppState.getNetworkStatus) networkStatus$: Observable<boolean>;

  constructor(private store:Store, private cd:ChangeDetectorRef) {
  }

  /**
   * This method calls @updateOnlineStatus() on init and adds eventlisteners to wlan icon.
   *
   * @author: Sven (svenf@mail.upb.de)
   */
  ngOnInit() {
    this.updateOnlineStatus();
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    this.networkStatus$.subscribe((flag:boolean)=>{
      this.onlineStatus = flag;
      this.cd.markForCheck();
    })

  }

  /**
   * This method changes the online status based on the connectivity.
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
   *
   * @author: Sven (svenf@mail.upb.de)
   */
  updateOnlineStatus() {
    this.store.dispatch(new SetNetworkStatus(navigator.onLine));
  }
}

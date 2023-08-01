import { Component, Input, OnInit } from '@angular/core';


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

  /**
   * This method calls @updateOnlineStatus() on init and adds eventlisteners to wlan icon.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  ngOnInit() {
    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  /**
   * This method changes the online status based on the connectivity. 
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  updateOnlineStatus() {
    this.onlineStatus = navigator.onLine;
  }
}

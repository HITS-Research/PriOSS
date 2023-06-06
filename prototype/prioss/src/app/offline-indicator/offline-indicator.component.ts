import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline-indicator',
  templateUrl: './offline-indicator.component.html',
  styleUrls: ['./offline-indicator.component.less']
})
export class OfflineIndicatorComponent implements OnInit {
  onlineStatus: boolean;

  ngOnInit() {
    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  updateOnlineStatus() {
    this.onlineStatus = navigator.onLine;
  };
}

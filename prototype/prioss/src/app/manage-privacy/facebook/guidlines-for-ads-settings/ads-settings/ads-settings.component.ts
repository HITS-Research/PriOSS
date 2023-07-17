import { Component } from '@angular/core';
import { scrollToTop } from 'src/app/utilities/generalUtilities.functions';

@Component({
  selector: 'app-ads-settings',
  templateUrl: './ads-settings.component.html',
  styleUrls: ['./ads-settings.component.less']
})
export class AdsSettingsComponent {
  
  async ngAfterViewInit(){
    scrollToTop();
  }
}



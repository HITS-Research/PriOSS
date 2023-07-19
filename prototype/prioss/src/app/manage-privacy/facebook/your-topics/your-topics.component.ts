import { Component } from '@angular/core';
import { scrollToTop } from 'src/app/utilities/generalUtilities.functions';

@Component({
  selector: 'app-your-topics',
  templateUrl: './your-topics.component.html',
  styleUrls: ['./your-topics.component.less']
})
export class YourTopicsComponent {
  
  async ngAfterViewInit(){
    scrollToTop();
  }
}

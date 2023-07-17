import { Component } from '@angular/core';
import { scrollToTop } from 'src/app/utilities/generalUtilities.functions';

/**
  * This component is responsible for providing guidelines to turn off the off-facebook-activity in facebook 
  *
  * @author: Mukul (mukuls@mail.upb.de)
  *
  */
@Component({
  selector: 'app-off-facebook-activity',
  templateUrl: './off-facebook-activity.component.html',
  styleUrls: ['./off-facebook-activity.component.less']
})
export class OffFacebookActivityComponent {

  async ngAfterViewInit(){
    scrollToTop();
  }
}

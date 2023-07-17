import { Component } from '@angular/core';
import { scrollToTop } from 'src/app/utilities/generalUtilities.functions';

/**
  * This component is responsible for providing guidelines to hide stories and videos from specific people.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */
 
@Component({
  selector: 'app-insta-hide-stories',
  templateUrl: './insta-hide-stories.component.html',
  styleUrls: ['./insta-hide-stories.component.less']
})
export class InstaHideStoriesComponent {
  async ngAfterViewInit(){
    scrollToTop();
  }

}

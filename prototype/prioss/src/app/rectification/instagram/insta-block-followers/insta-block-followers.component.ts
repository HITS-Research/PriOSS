import { Component, Input } from '@angular/core';

/**
  * This component is responsible for providing guidelines to block followers.
  * @author: Aayushma (aayushma@mail.uni-paderborn.de)
  *
  */

@Component({
  selector: 'app-insta-block-followers',
  templateUrl: './insta-block-followers.component.html',
  styleUrls: ['./insta-block-followers.component.less']
})
export class InstaBlockFollowersComponent {
  @Input()
  previewMode: boolean = false;
}

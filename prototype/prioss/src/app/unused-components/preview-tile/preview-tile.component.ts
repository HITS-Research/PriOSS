import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
  * This component is responsible for generating a preview for components
  * The preview can be embedded in the Dashboards and redirects to the provided component path on click
  *
  * The component path has to be specified in the navigationPath input parameter
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */
@Component({
  selector: 'app-preview-tile',
  templateUrl: './preview-tile.component.html',
  styleUrls: ['./preview-tile.component.less']
})
export class PreviewTileComponent {
  constructor(private router: Router) { }
  @Input() navigationPath:string;


/**
  * goToNavigationPath() is called in the HTML of the preview-tile on click.
  * Therfore, when a user clicks the preview-tile he will be redirected to the navigationPath through this method
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */
  goToNavigationPath() {
    this.router.navigate([this.navigationPath]);
  }

}

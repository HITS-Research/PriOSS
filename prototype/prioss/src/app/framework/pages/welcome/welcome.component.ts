import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeMessageComponent {
  @Input() platform: string = 'Platform';
  @Input() description: string = 'Explore your uploaded data on this page. To see a more detailed view about your data, click on the "Explore" button on each card. Your data, your control.';
}

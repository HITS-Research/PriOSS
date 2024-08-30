import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-known-issues',
  templateUrl: './known-issues.component.html',
  styleUrls: ['./known-issues.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class KnownIssuesComponent {}

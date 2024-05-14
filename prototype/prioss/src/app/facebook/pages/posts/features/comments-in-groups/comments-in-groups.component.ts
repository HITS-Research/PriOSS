import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import type { GroupCommentsItem } from 'src/app/facebook/models/activityAcrossFacebook/Groups/CommentsInGroups';
import type { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

@Component({
  selector: 'prioss-comments-in-groups',
  standalone: true,
  imports: [
    NzBackTopModule,
    ScrollingModule,
    NzTableModule,
		CommonModule,
		NzCardModule,
    DatePipe
  ],
  templateUrl: './comments-in-groups.component.html',
  styleUrl: './comments-in-groups.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsInGroupsComponent {
  activityData = input.required<FbActivityAcrossFacebookModel>();
  groupCommentData = computed(() => {
    return this.activityData()?.groupComments?.group_comments_v2 ?? [];
  });

  sortCommentsByDate = (a: GroupCommentsItem, b: GroupCommentsItem) => {
    return b.timestamp - a.timestamp;
  }

}

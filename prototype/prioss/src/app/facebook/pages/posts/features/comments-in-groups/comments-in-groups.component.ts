import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import type { GroupCommentsItem } from 'src/app/facebook/models/activityAcrossFacebook/Groups/CommentsInGroups';
import type { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

/**
 * Component for displaying comments made in Facebook groups.
 */
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
  /**
   * Input property for Facebook activity data.
   */
  activityData = input.required<FbActivityAcrossFacebookModel>();

  /**
   * Computed property that extracts group comment data from the activity data.
   */
  groupCommentData = computed(() => {
    return this.activityData()?.groupComments?.group_comments_v2 ?? [];
  });

  /**
   * Function to sort comments by date in descending order.
   * @param a - First GroupCommentsItem to compare
   * @param b - Second GroupCommentsItem to compare
   * @returns Number indicating the sort order
   */
  sortCommentsByDate = (a: GroupCommentsItem, b: GroupCommentsItem) => {
    return b.timestamp - a.timestamp;
  }
}
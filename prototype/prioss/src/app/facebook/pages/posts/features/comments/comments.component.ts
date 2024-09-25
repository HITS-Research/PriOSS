import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import type { CommentsItem } from 'src/app/facebook/models/activityAcrossFacebook/CommentsAndReactions/Comments';
import type { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

/**
 * Component for displaying user comments on Facebook.
 */
@Component({
  selector: 'prioss-comments',
  standalone: true,
  imports: [
    NzBackTopModule,
    ScrollingModule,
    NzTableModule,
    CommonModule,
    NzCardModule,
    DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {

  /**
   * Input property for Facebook activity data.
   */
  activityData = input.required<FbActivityAcrossFacebookModel>();

  /**
   * Computed property that extracts comment data from the activity data.
   */
  commentData = computed(() => {
    return this.activityData()?.comments?.comments_v2 ?? [];
  })

  /**
   * Computed property that extracts group comment data from the activity data.
   */
  groupCommentData = computed(() => {
    return this.activityData()?.groupComments?.group_comments_v2 ?? [];
  });

  /**
   * Function to sort comments by date in descending order.
   * @param a - First CommentsItem to compare
   * @param b - Second CommentsItem to compare
   * @returns Number indicating the sort order
   */
  sortCommentsByDate = (a: CommentsItem, b: CommentsItem) => {
    return b.timestamp - a.timestamp;
  }
}
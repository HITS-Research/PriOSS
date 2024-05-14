import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import type { CommentsItem } from 'src/app/facebook/models/activityAcrossFacebook/CommentsAndReactions/Comments';
import type { FbActivityAcrossFacebookModel } from 'src/app/facebook/state/models';

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


  activityData = input.required<FbActivityAcrossFacebookModel>();
  commentData = computed(() => {
    return this.activityData()?.comments?.comments_v2 ?? [];
  })

  groupCommentData = computed(() => {
    return this.activityData()?.groupComments?.group_comments_v2 ?? [];
  });

  sortCommentsByDate = (a: CommentsItem, b: CommentsItem) => {
    return b.timestamp - a.timestamp;
  }

}

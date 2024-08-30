import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RemoveSpecialCharactersPipe } from 'src/app/features/remove-special-characters/remove-special-characters.pipe';
import { InstaUserMessageDataModel, Messages } from "../../../state/models";

@Component({
  selector: 'prioss-insta-chat-view',
  templateUrl: './insta-chat-view.component.html',
  styleUrl: './insta-chat-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    NgFor,
    NgIf,
    NzAvatarModule,
    NzCardModule,
    NzCommentModule,
    NzEmptyModule,
    NzFlexModule,
    NzLayoutModule,
    RemoveSpecialCharactersPipe,
  ]
})
export class InstaChatViewComponent {
  @ViewChild('messageContainer') private messageContainer: ElementRef;
  @Input() messages: InstaUserMessageDataModel[];
  @Input() user: string;
  @Input() profilePic:string;
  openChatMessages :Messages[]= [];

  openChat(title:string){
    const requestedChat:Messages[] = this.messages.find(message => message.title===title)?.messages || []
    this.openChatMessages = [...this.sortMessages(requestedChat)];
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  sortMessages(message:Messages[]): Messages[] {
    return message.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateA.getTime() - dateB.getTime();
    });
  }

  scrollToBottom(): void {
    if(this.messageContainer){
      try {
      this.messageContainer.nativeElement.animate({
          scrollTop: this.messageContainer.nativeElement.scrollHeight
        }, 500);
      } catch (err) {
        console.error('Scroll error:', err);
      }
    }
  }
}

import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {YouTubeMessageDataModel,YouTubeChatData} from "../../../models"
import {NzContentComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {
  RemoveSpecialCharactersPipe
} from "../../../../features/remove-special-characters/remove-special-characters.pipe";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective} from "ng-zorro-antd/menu";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzCommentComponent, NzCommentContentDirective} from "ng-zorro-antd/comment";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
@Component({
  selector: 'prioss-youtube-chat-view',
  templateUrl: './youtube-chat-view.component.html',
  styleUrl: './youtube-chat-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzLayoutComponent,
    NzSiderComponent,
    RemoveSpecialCharactersPipe,
    NzContentComponent,
    NgIf,
    NzIconDirective,
    NgForOf,
    NzMenuDirective,
    NzFlexDirective,
    NzCardComponent,
    NzCommentComponent,
    NzCommentContentDirective,
    NzAvatarComponent,
    DatePipe,
    NzEmptyComponent
  ],
  standalone: true
})
export class YoutubeChatViewComponent {
  @ViewChild('messageContainer') private messageContainer: ElementRef;
  @Input() messages: YouTubeMessageDataModel[];
  @Input() profilePic:string;
  openChatMessages :YouTubeChatData[]= [];

  openChat(videoId: string) {
    const requestedChat: YouTubeChatData[] = this.messages
      // .flatMap((message: YouTubeMessageDataModel) => message.messages)
      .filter((chat: YouTubeChatData) => chat.videoId === videoId);

    this.openChatMessages = this.sortMessages(requestedChat);
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  getUniqueVideoIds(): string[] {
    const videoIds = this.messages
      // .flatMap((message: YouTubeMessageDataModel) => message.messages)
      .map((chat: YouTubeChatData) => chat.videoId);

    return [...new Set(videoIds)];
  }
  sortMessages(message:YouTubeChatData[]): YouTubeChatData[] {
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

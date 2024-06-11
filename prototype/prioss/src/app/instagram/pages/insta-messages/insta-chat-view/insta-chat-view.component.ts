import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {InstaUserMessageDataModel, Messages} from "../../../state/models";

@Component({
  selector: 'prioss-insta-chat-view',
  templateUrl: './insta-chat-view.component.html',
  styleUrl: './insta-chat-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
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

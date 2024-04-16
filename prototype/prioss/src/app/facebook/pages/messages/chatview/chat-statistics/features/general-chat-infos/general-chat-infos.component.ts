import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";
import type { ChatData } from "../../../chatdata.type";
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from "ng-zorro-antd/grid";

@Component({
	selector: "prioss-general-chat-infos",
	standalone: true,
	imports: [NzStatisticModule, NzGridModule],
	templateUrl: "./general-chat-infos.component.html",
	styleUrl: "./general-chat-infos.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralChatInfosComponent {
	chatData = input.required<ChatData[]>();
	yourUsername = input.required<string>();

	messagesSent = computed(() => {
		let msgs = 0;
		for (const chat of this.chatData()) {
			for (const msg of chat.messages) {
				if (msg.sender === this.yourUsername()) {
					msgs++;
				}
			}
		}
		return msgs;
	});
	messagesReceived = computed(() => {
		let msgs = 0;
		for (const chat of this.chatData()) {
			for (const msg of chat.messages) {
				if (msg.sender !== this.yourUsername()) {
					msgs++;
				}
			}
		}
		return msgs;
	});
	amountOfChats = computed(() => {
		return this.chatData().length;
	});
	amountOfGroupChats = computed(() => {
		return this.chatData().filter((chat) => chat.participants.length > 2)
			.length;
	});
	totalWordsSent = computed(() => {
    let words = 0;
    for(const chat of this.chatData()){
      for(const msg of chat.messages){
        if(msg.sender === this.yourUsername()){
          words += msg.content?.split(" ").length??0
        }
      }
    }
    return words;
  });
	totalWordsReceived = computed(() => {
    let words = 0;
    for(const chat of this.chatData()){
      for(const msg of chat.messages){
        if(msg.sender !== this.yourUsername()){
          words += msg.content?.split(" ").length??0
        }
      }
    }
    return words;
  });
	medianWordsPerMessage = computed(() => {
    const words = [];
    let medianWords = 0;
    for(const chat of this.chatData()){
      for(const msg of chat.messages){
        if(msg.sender === this.yourUsername()){
          words.push(msg.content?.split(" ").length??0)
        }
      }
    }
    words.sort((a, b) => a - b);
    medianWords = words[Math.floor(words.length / 2)];
    return medianWords;
  });
}

import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	signal,
} from "@angular/core";
import type { ChatData } from "../../../chatdata.type";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";

@Component({
	selector: "prioss-average-message-length",
	standalone: true,
	imports: [
		NzStatisticModule,
		FormsModule,
		NzTableModule,
		CommonModule,
		NzSelectModule,
	],
	templateUrl: "./average-message-length.component.html",
	styleUrl: "./average-message-length.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AverageMessageLengthComponent {
	chatData = input.required<ChatData[]>();
	selectedChatID = signal<string>("0");
	yourUsername = input.required<string>();
	chatPartnerFirstName = computed(() => {
		const chat = this.selectedChat();
		let firstName = "";
		if (chat.participants.length === 2) {
			firstName = chat.participants
				.filter((participant) => participant !== this.yourUsername())[0]
				.split(" ")[0];
		}
		return firstName;
	});

	personalChats = computed(() => {
		return this.chatData().filter((chat) => chat.participants.length === 2);
	});

	selectedChat = computed(() => {
		let retChat = {} as ChatData;
		for (const chat of this.chatData()) {
			if (chat.id === this.selectedChatID()) {
				retChat = chat;
			}
		}
		return retChat;
	});
	yourAverageMessageLength = computed(() => {
		let averageMsgLength = 0;
		const msgLentghs: number[] = [];
		for (const msg of this.selectedChat().messages ?? []) {
			if (msg.content !== null && msg.content !== undefined) {
				if (msg.sender === this.yourUsername()) {
					msgLentghs.push(msg.content.split(" ").length);
				}
			}
		}
		msgLentghs.sort((a, b) => a - b);
		if (msgLentghs.length > 0) {
			averageMsgLength = msgLentghs[Math.floor(msgLentghs.length / 2)];
		}
		return averageMsgLength;
	});
	theirAverageMessageLength = computed(() => {
		let averageMsgLength = 0;
		const msgLentghs: number[] = [];
		for (const msg of this.selectedChat().messages ?? []) {
			if (msg.content !== null && msg.content !== undefined) {
				if (msg.sender !== this.yourUsername()) {
					msgLentghs.push(msg.content.split(" ").length);
				}
			}
		}
		msgLentghs.sort((a, b) => a - b);
		if (msgLentghs.length > 0) {
			averageMsgLength = msgLentghs[Math.floor(msgLentghs.length / 2)];
		}
		return averageMsgLength;
	});

	yourAverageResponsetime = computed(() => {
		let averageResponseTime = 0;
		const responseTimes: number[] = [];
		if (this.selectedChat().messages !== undefined) {
			for (let i = 0; i < this.selectedChat().messages.length; i++) {
				const currentMessage = this.selectedChat().messages[i];
				const lastMessage = this.selectedChat().messages[i - 1];
				if (currentMessage.sender === this.yourUsername()) {
					if (lastMessage !== undefined) {
						if (lastMessage.sender !== this.yourUsername()) {
							responseTimes.push(
								currentMessage.timestamp*1000 - lastMessage.timestamp*1000,
							);
						}
					}
				}
			}
		}
		responseTimes.sort((a, b) => a - b);
		if (responseTimes.length > 0) {
			averageResponseTime = responseTimes[Math.floor(responseTimes.length / 2)];
		}
		return averageResponseTime;
	});
	theirAverageResponsetime = computed(() => {
		let averageResponseTime = 0;
		const responseTimes: number[] = [];
		if (this.selectedChat().messages !== undefined) {
			for (let i = 0; i < this.selectedChat().messages.length; i++) {
				const currentMessage = this.selectedChat().messages[i];
				const lastMessage = this.selectedChat().messages[i - 1];
				if (currentMessage.sender !== this.yourUsername()) {
					if (lastMessage !== undefined) {
						if (lastMessage.sender === this.yourUsername()) {
							responseTimes.push(
								currentMessage.timestamp*1000 - lastMessage.timestamp*1000,
							);
						}
					}
				}
			}
		}
		responseTimes.sort((a, b) => a - b);
		if (responseTimes.length > 0) {
			averageResponseTime = responseTimes[Math.floor(responseTimes.length / 2)];
		}
		return averageResponseTime;
	});
}

import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
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
export class AverageMessageLengthComponent implements OnInit {

	ngOnInit(): void {
		if(this.chatData().length > 0){
			this.selectedChatID.set(this.chatData()[0].id);
		}
	}
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
		const messages = this.selectedChat().messages;
		if (!messages || messages.length === 0) return this.msToHMS(0);

		const responseTimes = messages
			.slice(0, -1) // Exclude the last message
			.map((currentMessage, index) => {
				const nextMessage = messages[index + 1];
				if (
				currentMessage.sender === this.yourUsername() &&
				nextMessage.sender !== this.yourUsername()
				) {
				const timeDiff = currentMessage.timestamp - nextMessage.timestamp;
				return timeDiff > 0 ? timeDiff : null;
				}
				return null;
			})
			.filter((time): time is number => time !== null);

		if (responseTimes.length === 0) {
			return this.msToHMS(0);
		}
		const medianResponseTime = this.getMedian(responseTimes);
		return this.msToHMS(medianResponseTime);
	});


	theirAverageResponsetime = computed(() => {
		const messages = this.selectedChat().messages;
		if (!messages || messages.length === 0) {
			return this.msToHMS(0);
		}
		const responseTimes = messages
			.slice(0, -1) // Exclude the last message
			.map((currentMessage, index) => {
				const nextMessage = messages[index + 1];
				if (
				currentMessage.sender !== this.yourUsername() &&
				nextMessage?.sender === this.yourUsername()
				) {
				return currentMessage.timestamp - nextMessage.timestamp;
				}
				return null;
			})
			.filter((time): time is number => time !== null && time > 0);

		if (responseTimes.length === 0) {
			return this.msToHMS(0);
		}

		const medianResponseTime = this.getMedian(responseTimes);
		return this.msToHMS(medianResponseTime);
	});

	private msToHMS(seconds: number): string {
	//const seconds = Math.floor(ms );
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}
	private getMedian(numbers: number[]): number {
		const sorted = numbers.sort((a, b) => a - b);
		const middle = Math.floor(sorted.length / 2);
		return sorted[middle];
	}
}

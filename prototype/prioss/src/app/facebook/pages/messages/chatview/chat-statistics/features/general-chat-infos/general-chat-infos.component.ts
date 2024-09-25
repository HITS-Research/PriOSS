import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";
import type { ChatData } from "../../../chatdata.type";
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from "ng-zorro-antd/grid";

/**
 * Component for displaying general chat statistics and information.
 * This component calculates and presents various metrics about the chat data,
 * such as number of messages sent/received, word counts, and chat counts.
 */
@Component({
	selector: "prioss-general-chat-infos",
	standalone: true,
	imports: [NzStatisticModule, NzGridModule],
	templateUrl: "./general-chat-infos.component.html",
	styleUrl: "./general-chat-infos.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralChatInfosComponent {
	/** Input property for chat data */
	chatData = input.required<ChatData[]>();

	/** Input property for the current user's username */
	yourUsername = input.required<string>();

	/**
	 * Computed property to calculate the total number of messages sent by the current user
	 * @returns The total count of messages sent
	 */
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

	/**
	 * Computed property to calculate the total number of messages received by the current user
	 * @returns The total count of messages received
	 */
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

	/**
	 * Computed property to get the total number of chats
	 * @returns The total count of chats
	 */
	amountOfChats = computed(() => {
		return this.chatData().length;
	});

	/**
	 * Computed property to get the total number of group chats
	 * @returns The count of group chats (chats with more than 2 participants)
	 */
	amountOfGroupChats = computed(() => {
		return this.chatData().filter((chat) => chat.participants.length > 2)
			.length;
	});

	/**
	 * Computed property to calculate the total number of words sent by the current user
	 * @returns The total word count of sent messages
	 */
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

	/**
	 * Computed property to calculate the total number of words received by the current user
	 * @returns The total word count of received messages
	 */
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

	/**
	 * Computed property to calculate the median number of words per message sent by the current user
	 * @returns The median word count per message
	 */
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
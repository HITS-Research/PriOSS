import {
	ChangeDetectionStrategy,
	Component,
	Input,
	type OnInit,
} from "@angular/core";
import type { ChatData, ChatMessage } from "./chatdata.type";
import { CommonModule } from "@angular/common";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzListModule } from "ng-zorro-antd/list";
import { FormsModule } from "@angular/forms";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzInputModule } from "ng-zorro-antd/input";

@Component({
	selector: "prioss-chatview",
	standalone: true,
	imports: [
		CommonModule,
		NzLayoutModule,
		NzListModule,
		FormsModule,
		NzDatePickerModule,
		NzInputModule,
	],
	templateUrl: "./chatview.component.html",
	styleUrl: "./chatview.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatviewComponent implements OnInit {
	chatDateRange: Date[] = [];
	selectedChatDateRange: any = null;
	currentChat: ChatData;
	selectedChatData: ChatData[] = [];
	@Input({ required: true })
	chatData: ChatData[];
	@Input({ required: true })
	yourUsername: string;

	async ngOnInit(): Promise<void> {
		this.selectedChatData = this.chatData.slice();
		this.currentChat = this.chatData[0];
		if (this.chatDateRange.length !== 0) {
			this.chatDateRange = this.getDateRangeOfChats(this.chatData);
			//copy min max dates into selectedDateRange first
			this.selectedChatDateRange = this.chatDateRange.slice();
		}
	}

	getDateRangeOfChats(chats: ChatData[]): Date[] {
		let minTimestamp = 9999999999999;
		let maxTimestamp = 0;
		for (const chat of chats) {
			for (const message of chat.messages) {
				minTimestamp =
					message.timestamp < minTimestamp ? message.timestamp : minTimestamp;
				maxTimestamp =
					message.timestamp > maxTimestamp ? message.timestamp : maxTimestamp;
			}
		}
		return [new Date(minTimestamp), new Date(maxTimestamp)];
	}

	getChatsInDateRange(chats: ChatData[], dateRange: Date[]): ChatData[] {
		const minTimestamp = dateRange[0].getTime();
		const maxTimestamp = dateRange[1].getTime();
		const chatsInDateRange: ChatData[] = [];
		for (const chat of chats) {
			const messagesInDateRange: ChatMessage[] = chat.messages.filter(
				(message) => {
					return (
						message.timestamp >= minTimestamp &&
						message.timestamp <= maxTimestamp
					);
				},
			);
			if (messagesInDateRange.length !== 0) {
				const chatCopy = { ...chat };
				chatCopy.messages = messagesInDateRange;
				chatsInDateRange.push(chatCopy);
			}
		}
		return chatsInDateRange;
	}
	onChange(result: Date[]): void {
		this.selectedChatDateRange = result.slice();
		this.selectedChatData = this.getChatsInDateRange(this.chatData, result);
		this.currentChat = {
			name: "",
			messages: [{ content: "", sender: "", timestamp: 0 }],
		} as ChatData;
	}

	getEmptyChat(): ChatData {
		return {} as ChatData;
	}
	setCurrentChat(chat: ChatData): void {
		this.currentChat = chat;
		if (this.currentChat.name === undefined) {
			this.currentChat.name = "";
		}
		if (this.currentChat.messages === undefined) {
			this.currentChat.messages = [];
		}

		if (this.currentChat.name === "") {
			this.currentChat.name = "Deleted User";
		}
		for (const message of this.currentChat.messages) {
			if (message.content === undefined) {
				message.content = "";
			}
			if (message.sender === undefined) {
				message.sender = "Unknown User";
			}
			if (message.timestamp === undefined) {
				message.timestamp = 0;
			}
		}
	}
	getChatPreviewName(chat: ChatData): string {
		let name = "";

		if (chat.name.length > 30) {
			name = `${chat.name.slice(0, 30)}...`;
		} else {
			name = chat.name;
		}
		return name;
	}
	getChatPreviewMessage(chat: ChatData): string {
		let content = "";
		if (chat.messages.length > 0) {
			const lastMessage = chat.messages[chat.messages.length - 1];
			if (lastMessage.content !== undefined) {
				if (lastMessage.content.length > 30) {
					content = `${lastMessage.content.slice(0, 30)}...`;
				} else {
					content = lastMessage.content;
				}
			}
		}

		return content;
	}
	getLastMessage(chat: ChatData): ChatMessage {
		let msg: ChatMessage = {} as ChatMessage;
		if (chat.messages.length !== 0) {
			msg = chat.messages[chat.messages.length - 1];
		} else {
			msg = {
				sender: "",
				timestamp: 0,
				content: "",
			};
		}
		return msg;
	}

	searchChats(event: any): void {
		const searchString: string = event.target.value.toLowerCase();
		console.debug("searchString: ", searchString);

		if (searchString === "") {
			this.selectedChatData = this.chatData.slice();
		} else {
			this.currentChat = this.getEmptyChat();
			const res: Set<ChatData> = new Set<ChatData>(
				this.filterChatMessages(searchString).concat(
					this.filterChatNames(searchString),
				),
			);
			//search in name/title of chats
			this.selectedChatData = Array.from(res);
		}
	}
	/**
	 * filter ChatData by ChatData.name
	 * @param event
	 * @returns A List of Chats, where the Title/Name includes the searchstring
	 */
	filterChatNames(searchValue: string): ChatData[] {
		const searchString: string = searchValue.toLowerCase();

		console.debug("searchString: ", searchString);
		return this.chatData.filter((chat) => {
			return chat.name.toLowerCase().includes(searchString);
		});
	}
	/**
	 * filter ChatData by ChatData.messages.content
	 * @param event
	 * @returns A List of Chats, where the Messages include the searchstring
	 */
	filterChatMessages(searchValue: string): ChatData[] {
		const searchString: string = searchValue.toLowerCase();
		console.debug("searchString: ", searchString);
		return this.chatData.filter((chat) => {
			return chat.messages.some((message) => {
				let ret = false;
				if (message.content !== undefined) {
					ret = message.content.toLowerCase().includes(searchString);
				}
				return ret;
			});
		});
	}

	customFormatDate(timestamp: number) {
		const date = new Date(timestamp);
		const formattedDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		return formattedDate;
	}
}

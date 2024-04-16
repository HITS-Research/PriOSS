import {
	type AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	type OnDestroy,
	signal,
	type OnInit,
	input,
	computed,
	ViewChild,
} from "@angular/core";
import type { ChatData, ChatMessage } from "./chatdata.type";
import { CommonModule } from "@angular/common";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzListModule } from "ng-zorro-antd/list";
import { FormsModule } from "@angular/forms";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzAffixModule } from "ng-zorro-antd/affix";
import { type NzTableComponent, NzTableModule } from "ng-zorro-antd/table";
import { Subject, takeUntil } from "rxjs";
import { NzFormModule } from "ng-zorro-antd/form";

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
		NzIconModule,
		NzAffixModule,
		NzTableModule,
		NzFormModule,
	],
	templateUrl: "./chatview.component.html",
	styleUrl: "./chatview.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatviewComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild("virtualTable", { static: false })
	nzTableComponent?: NzTableComponent<ChatMessage>;
	private destroy$ = new Subject<boolean>();

	chatDateRange = signal<Date[]>([]);
	selectedChatDateRange = signal<Date[]>([new Date(0), new Date()]);

	isChatListCollapsed = signal<boolean>(false);
	searchString = signal<string>("");
	currentChat = signal<ChatData>({} as ChatData);
	setCurrentChat = computed(() => this.currentChat.set(this.clickedChat()));
	clickedChat = signal<ChatData>({} as ChatData);
	clickedChatPreviewMessage = computed(() => {
		return this.getChatPreviewMessage(this.clickedChat());
	});
	currentChatPreviewMessage = computed(() => {
		return this.getChatPreviewMessage(this.currentChat());
	});
	clickedChatPreviewName = computed(() => {
		return this.getChatPreviewName(this.clickedChat());
	});

	selectedChatData = signal<ChatData[]>([]);
	chatData = input.required<ChatData[]>();
	yourUsername = input.required<string>();

	async ngOnInit(): Promise<void> {
		this.selectedChatData.set(this.chatData().slice());
		this.clickedChat.set(this.chatData()[0]);
		this.chatDateRange.set(this.getDateRangeOfChats());
		//copy min max dates into selectedDateRange first
		this.selectedChatDateRange.set(this.chatDateRange());
	}
	ngAfterViewInit(): void {
		this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
			.pipe(takeUntil(this.destroy$))
			.subscribe((data: number) => {
				return data;
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
	trackByID(_: number, data: ChatMessage): number {
		return data.timestamp;
	}

	getDateRangeOfChats = computed(() => {
		let minTimestamp = new Date().getTime();
		let maxTimestamp = 0;
		for (const chat of this.chatData()) {
			for (const message of chat.messages) {
				minTimestamp =
					message.timestamp < minTimestamp ? message.timestamp : minTimestamp;
				maxTimestamp =
					message.timestamp > maxTimestamp ? message.timestamp : maxTimestamp;
			}
		}
		if(maxTimestamp > new Date().getTime()){ 
			maxTimestamp = new Date().getTime();
		}
		return [new Date(minTimestamp), new Date(maxTimestamp)];
	});

	getChatsInDateRange = computed(() => {
		const minTimestamp =
			this.selectedChatDateRange()[0]?.getTime() ??
			this.chatDateRange()[0]?.getTime() ??
			0;
		const maxTimestamp =
			this.selectedChatDateRange()[1]?.getTime() ??
			this.chatDateRange()[1]?.getTime() ??
			9999999999;
		const chatsInDateRange: ChatData[] = [];
		for (const chat of this.chatData()) {
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
	});

	fixCurrentChat = computed(() => {
		if (this.currentChat().name === undefined) {
			this.currentChat().name = "";
		}
		if (this.currentChat().messages === undefined) {
			this.currentChat().messages = [];
		}

		if (this.currentChat().name === "") {
			this.currentChat().name = "Deleted User";
		}
		for (const message of this.currentChat().messages) {
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
	});
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

	filteredChats = computed(() => {
		const searchString: string = this.searchString().toLowerCase();

		
		let chats = [];
		//filter by search string
		if (searchString === "") {
			chats = this.chatData().slice();
		} else {
			const res: Set<ChatData> = new Set<ChatData>(
				this.filterChatNames().concat(this.filterChatMessages()),
			);
			//search in name/title of chats
			chats = Array.from(res);
		}
		//filter by date
		const selDateRange = this.selectedChatDateRange();
		if (selDateRange[0] !== undefined && selDateRange[1] !== undefined) {
		
			chats = chats.filter((chat) => {
				const lastMessage = this.getLastMessage(chat);
				return (
					(lastMessage.timestamp >= (selDateRange[0]?.getTime() ?? 0)) &&
					(lastMessage.timestamp <= (selDateRange[1]?.getTime() ?? 9999999999))
				);
			});
		}
		return chats;
	});

	/**
	 * filter ChatData by ChatData.name
	 * @param event
	 * @returns A List of Chats, where the Title/Name includes the searchstring
	 */
	filterChatNames = computed(() => {
		const searchString: string = this.searchString().toLowerCase();

		return this.chatData().filter((chat) => {
			return chat.name.toLowerCase().includes(searchString);
		});
	});
	/**
	 * filter ChatData by ChatData.messages.content
	 * @param event
	 * @returns A List of Chats, where the Messages include the searchstring
	 */
	filterChatMessages = computed(() => {
		const searchString: string = this.searchString().toLowerCase();
		return this.chatData().filter((chat) => {
			return chat.messages.some((message) => {
				let ret = false;
				if (message.content !== undefined) {
					ret = message.content.toLowerCase().includes(searchString);
				}
				return ret;
			});
		});
	});

	customFormatDate(timestamp: number) {
		const date = new Date(timestamp);
		const formattedDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		return formattedDate;
	}
}

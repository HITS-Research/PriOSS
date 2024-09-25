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
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzAffixModule } from "ng-zorro-antd/affix";
import { type NzTableComponent, NzTableModule } from "ng-zorro-antd/table";
import { Subject, takeUntil } from "rxjs";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzCardModule } from "ng-zorro-antd/card";
import { FacebookIndexedDBMedia } from "src/app/facebook/models/FacebookIndexDBMedia.interface";
import { ScrollingModule } from "@angular/cdk/scrolling";
import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';

/**
 * Component for displaying and managing the main chat view.
 * It handles chat selection, message display, and various filtering options.
 */
@Component({
	selector: "prioss-chatview",
	standalone: true,
	imports: [
		CommonModule,
		NzLayoutModule,
		NzListModule,
		FormsModule,
		NzDatePickerModule,
		NzSkeletonComponent,
		NzInputModule,
		NzIconModule,
		NzAffixModule,
		NzCardModule,
		NzTableModule,
		NzFormModule,
		ScrollingModule,
		ExperimentalScrollingModule,
	],
	templateUrl: "./chatview.component.html",
	styleUrl: "./chatview.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatviewComponent implements OnInit, AfterViewInit, OnDestroy {
	window = window;
	@ViewChild("virtualTable", { static: false })
	nzTableComponent?: NzTableComponent<ChatMessage>;
	private destroy$ = new Subject<boolean>();

	/** Signal for the date range of all chats */
	chatDateRange = signal<Date[]>([]);

	/** Signal for the selected date range for filtering */
	selectedChatDateRange = signal<Date[]>([new Date(0), new Date()]);

	/** Input property indicating if data is still loading */
	loading = input.required<boolean>();

	/** Signal indicating if the chat list is collapsed */
	isChatListCollapsed = signal<boolean>(false);

	/** Signal for the current search string */
	searchString = signal<string>("");

	/** Signal for the currently displayed chat */
	currentChat = signal<ChatData>({} as ChatData);

	/** Computed property to set the current chat */
	setCurrentChat = computed(() => this.currentChat.set(this.clickedChat()));

	/** Signal for the clicked chat */
	clickedChat = signal<ChatData>({} as ChatData);

	/** Computed property for the preview message of the clicked chat */
	clickedChatPreviewMessage = computed(() => {
		return this.getChatPreviewMessage(this.clickedChat());
	});

	/** Computed property for the preview message of the current chat */
	currentChatPreviewMessage = computed(() => {
		return this.getChatPreviewMessage(this.currentChat());
	});

	/** Computed property for the preview name of the clicked chat */
	clickedChatPreviewName = computed(() => {
		return this.getChatPreviewName(this.clickedChat());
	});

	/** Signal for the selected chat data */
	selectedChatData = signal<ChatData[]>([]);

	/** Input property for all chat data */
	chatData = input.required<ChatData[]>();

	/** Input property for the current user's username */
	yourUsername = input.required<string>();

	/** Input property for media files */
	mediaFiles = input<FacebookIndexedDBMedia[]>();

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

	/**
	 * Tracking function for ngFor directive
	 * @param index - The index of the current item
	 * @param data - The current ChatMessage item
	 * @returns The timestamp of the message for tracking
	 */
	trackByID(_: number, data: ChatMessage): number {
		return data.timestamp;
	}

	/**
	 * Computed property to get the date range of all chats
	 * @returns An array with the earliest and latest dates from all chats
	 */
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

	/**
	 * Computed property to get chats within the selected date range
	 * @returns An array of ChatData objects filtered by the selected date range
	 */
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

	/**
	 * Computed property to fix any issues with the current chat data
	 */
	fixCurrentChat = computed(() => {
		if (this.currentChat().name === undefined || this.currentChat().name === "") {
			this.currentChat().name = "Deleted User";
		}
		if (this.currentChat().messages === undefined) {
			this.currentChat().messages = [];
		}
		for (const message of this.currentChat().messages) {
			if (message.content === undefined) {
				message.content = "";
			}
			if (message.sender === undefined) {
				message.sender = "Deleted User";
			}
			if (message.timestamp === undefined) {
				message.timestamp = 0;
			}
		}
	});

	/**
	 * Gets a preview name for a chat
	 * @param chat - The ChatData object
	 * @returns A string with the chat name, truncated if necessary
	 */
	getChatPreviewName(chat: ChatData): string {
		let name = "";

		if (chat.name.length > 30) {
			name = `${chat.name.slice(0, 30)}...`;
		} else {
			name = chat.name;
		}
		return name;
	}

	/**
	 * Gets a preview message for a chat
	 * @param chat - The ChatData object
	 * @returns A string with the last message content, truncated if necessary
	 */
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

	/**
	 * Gets the last message of a chat
	 * @param chat - The ChatData object
	 * @returns The last ChatMessage object, or an empty message if the chat has no messages
	 */
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

	/**
	 * Computed property to filter chats based on search string and date range
	 * @returns An array of filtered ChatData objects
	 */
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
	 * Computed property to filter chats by name
	 * @returns An array of ChatData objects where the name includes the search string
	 */
	filterChatNames = computed(() => {
		const searchString: string = this.searchString().toLowerCase();

		return this.chatData().filter((chat) => {
			return chat.name.toLowerCase().includes(searchString);
		});
	});

	/**
	 * Computed property to filter chats by message content
	 * @returns An array of ChatData objects where any message content includes the search string
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

	/**
	 * Formats a timestamp into a custom date string
	 * @param timestamp - The timestamp to format
	 * @returns A formatted date string
	 */
	customFormatDate(timestamp: number) {
		const date = new Date(timestamp);
		const formattedDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		return formattedDate;
	}

	/**
	 * Gets the blob URL for a media file associated with a thread path
	 * @param thread_path - The thread path to search for
	 * @returns The blob URL of the media file, or an empty string if not found
	 */
	getMediaBlobUrl(thread_path: string){
		const blobUrl = this.mediaFiles()?.find(mediaFile => mediaFile.thread_path.includes(thread_path) || thread_path.includes(mediaFile.thread_path))?.blobURL ?? '';
		return blobUrl;
	}
}
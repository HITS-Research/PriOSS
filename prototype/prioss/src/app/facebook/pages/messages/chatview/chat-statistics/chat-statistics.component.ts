import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	computed,
	input,
	signal,
} from "@angular/core";
import type { ChatData } from "../chatdata.type";
import { NgxEchartsModule, provideEcharts } from "ngx-echarts";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";
import { ChatMessageDistributionChartComponent } from "./features/chat-message-distribution-chart/chat-message-distribution-chart.component";
import { NzCardModule } from "ng-zorro-antd/card";
import { MessagesPerDayChartComponent } from "./features/messages-per-day-chart/messages-per-day-chart.component";
import { GeneralChatInfosComponent } from "./features/general-chat-infos/general-chat-infos.component";
import { AverageMessageLengthComponent } from "./features/average-message-length/average-message-length.component";
import { AverageResponeTimeComponent } from "./features/average-respone-time/average-respone-time.component";
import { ChatWordcloudComponent } from "./features/chat-wordcloud/chat-wordcloud.component";
import { ChatSentimentAnalysisComponent } from "./features/chat-sentiment-analysis/chat-sentiment-analysis.component";
import { MessagesPerWeekdayComponent } from "./features/messages-per-weekday/messages-per-weekday.component";
import { TopChatsComponent } from "./features/top-chats/top-chats.component";
import { MessageTimeDistributionComponent } from "./features/message-time-distribution/message-time-distribution.component";
import { ChatResponsetimeGraphComponent } from "./features/chat-responsetime-graph/chat-responsetime-graph.component";
@Component({
	selector: "prioss-chat-statistics",
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
		NzGridModule,
		NzCardModule,
		NgxEchartsModule,
		NzDatePickerModule,
		NzInputModule,
		ChatMessageDistributionChartComponent,
		MessagesPerDayChartComponent,
		GeneralChatInfosComponent,
		AverageMessageLengthComponent,
		AverageResponeTimeComponent,
		ChatWordcloudComponent,
		ChatSentimentAnalysisComponent,
		MessagesPerWeekdayComponent,
		TopChatsComponent,
		MessageTimeDistributionComponent,
		ChatWordcloudComponent,
		ChatResponsetimeGraphComponent
	],
	templateUrl: "./chat-statistics.component.html",
	styleUrl: "./chat-statistics.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideEcharts()],
})
export class ChatStatisticsComponent implements OnInit{
	chatData = input.required<ChatData[]>();
	yourUsername = input.required<string>();

	selectedChatIDForMsgPercentage = signal<string>("");
	chatParticipants = signal<string[]>([]);

	ngOnInit() {
		this.getChatParticipants();
		this.selectedChatIDForMsgPercentage.set(this.chatData()[0].id);

	}

	selectedChatForMsgPercentage = computed(() => {
		let retChat = {} as ChatData;
		for (const chat of this.chatData()) {
			if (chat.id === this.selectedChatIDForMsgPercentage()) {
				retChat = chat;
			}
		}
		return retChat;
	});

	filterChats(list: string[], searchString: string): string[] {
		return list.filter((item) => item.toLowerCase().includes(searchString));
	}
	getChatParticipantsInOneChat(chat: ChatData): string[] {
		return chat.participants;
	}

	getChatParticipants() {
		const tempSet = new Set<string>();
		for (const chat of this.chatData()) {
			for (const participant of chat.participants) {
				tempSet.add(participant);
			}
		}
		this.chatParticipants.set(Array.from(tempSet));
	}

	getAmountofChatMessagesInTimeRange(
		startTime: Date,
		endTime: Date,
		groupMessagesOnly: boolean,
	): number {
		let selectedChatData: ChatData[] = [];
		const startTimeStamp: number = new Date(startTime).getTime();
		let endTimeStamp: number = new Date(endTime).getTime();
		let msgCount = 0;

		if (startTime === endTime) {
			endTimeStamp = startTime.setHours(23, 59, 59, 999);
		}
		if (groupMessagesOnly) {
			selectedChatData = this.chatData().filter(
				(chat) => chat.participants.length > 2,
			);
		}

		for (const chat of selectedChatData) {
			for (const message of chat.messages) {
				if (
					message.timestamp >= startTimeStamp &&
					message.timestamp <= endTimeStamp
				) {
					msgCount++;
				}
			}
		}
		return msgCount;
	}
}

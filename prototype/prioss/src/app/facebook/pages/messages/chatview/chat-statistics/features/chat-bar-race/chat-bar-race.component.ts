import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	type Signal,
	computed,
	input,
	signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { NgxEchartsModule, provideEcharts } from "ngx-echarts";
import type { ChatData } from "../../../chatdata.type";
import { NzButtonModule } from "ng-zorro-antd/button";
import type { EChartsOption } from "echarts";

@Component({
	selector: "prioss-chat-bar-race",
	standalone: true,
	imports: [
		NgxEchartsModule,
		FormsModule,
		NzButtonModule,
		CommonModule,
		NzSwitchComponent,
	],
	providers: [provideEcharts()],
	templateUrl: "./chat-bar-race.component.html",
	styleUrl: "./chat-bar-race.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBarRaceComponent {
	chatData = input.required<ChatData[]>();
	enableGroupChats = signal<boolean>(false);
	restartBarRace = signal<boolean>(false);
	minDate: Signal<Date> = computed(() => {
		const chats: ChatData[] = this.chatData() ?? [];
		let minTimestamp = new Date().getTime();
		for (const chat of chats) {
			for (const message of chat.messages) {
				if (message.timestamp < minTimestamp) {
					minTimestamp = message.timestamp;
				}
			}
		}
		if (minTimestamp < new Date(2004, 0, 1).getTime()) {
			minTimestamp = new Date(2004, 0, 1).getTime();
		}
		return new Date(minTimestamp);
	});
	maxDate = computed(() => {
		const chats: ChatData[] = this.chatData() ?? [];
		let maxTimestamp = 0;
		for (const chat of chats) {
			for (const message of chat.messages) {
				if (message.timestamp > maxTimestamp) {
					maxTimestamp = message.timestamp;
				}
			}
		}
		if (maxTimestamp > new Date().getTime()) {
			maxTimestamp = new Date().getTime();
		}
		return maxTimestamp;
	});
	monthsInTimeRange: Signal<Date[]> = computed(() => {
		const minDate = this.minDate();
		const maxDate = this.maxDate();
		const currMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
		const months = [];
		while (currMonth.getTime() < maxDate) {
			months.push(new Date(currMonth.getFullYear(), currMonth.getMonth(), 1));
			currMonth.setMonth(currMonth.getMonth() + 1);
		}
		return months;
	});

	getYearsInTimeRange: Signal<Date[]> = computed(() => {
		const minDate = this.minDate();
		const maxDate = this.maxDate();
		const currYear = new Date(minDate.getFullYear(), 1, 1);
		const years = [];
		while (currYear.getTime() <= maxDate) {
			years.push(new Date(currYear.getFullYear(), 1, 1));
			currYear.setMonth(currYear.getFullYear() + 1);
		}
		return years;
	});

	chatNames = computed(() => {
		const chats: { month: Date; name: string; msgsInMonth: number }[] =
			this.getMessageCountPerMonthPerChat();
		const chatNames = new Set<string>();
		for (const chat of chats) {
			chatNames.add(chat.name);
		}
		return Array.from(chatNames);
	});

	getMessageCountPerMonthPerChat = computed(() => {
		const prefilteredChats = this.getMessageCountPerYearPerChat() ?? [];
		const months = this.monthsInTimeRange();
		const messageCountPerMonthPerChat = [];
		for (const obj of prefilteredChats) {
			let count = 0;
			for (const month of months) {
				for (const message of obj.chat.messages) {
					const messageDate = new Date(message.timestamp);
					if (
						messageDate.getMonth() === month.getMonth() &&
						messageDate.getFullYear() === month.getFullYear()
					) {
						count++;
					}
				}
				if (count > 0) {
					messageCountPerMonthPerChat.push({
						month: month,
						name: obj.chat.name,
						msgsInMonth: count,
					});
				}
			}
		}
		return messageCountPerMonthPerChat;
	});

	getMessageCountPerYearPerChat: Signal<
		{ year: Date; chat: ChatData; count: number }[]
	> = computed(() => {
		const chats: ChatData[] = this.chatData() ?? [];
		const years = this.getYearsInTimeRange();
		const messageCountPerYearPerChat = [];
		for (const chat of chats) {
			let count = 0;
			for (const year of years) {
				for (const message of chat.messages) {
					const messageDate = new Date(message.timestamp);
					if (messageDate.getFullYear() === year.getFullYear()) {
						count++;
					}
				}
				if (count > 0) {
					messageCountPerYearPerChat.push({
						year: year,
						chat: chat,
						count: count,
					});
				}
			}
		}

		return messageCountPerYearPerChat;
	});

	options: Signal<EChartsOption> = computed(() => {
		const options: EChartsOption = {
			xAxis: {
				max: "dataMax",
			},
			yAxis: {
				type: "category",
				data: this.chatNames(),

				inverse: true,
				animationDuration: 300,
				animationDurationUpdate: 300,
				max: 4, // only the largest 5 bars will be displayed
			},
			series: [
				{
					realtimeSort: true,
					name: "X",
					type: "bar",
					data: this.getMessageCountPerMonthPerChat().map((x) => x.msgsInMonth),
					label: {
						show: true,
						position: "right",
						valueAnimation: true,
					},
				},
			],
			legend: {
				show: true,
			},
			animationDuration: 0,
			animationDurationUpdate: 3000,
			animationEasing: "linear",
			animationEasingUpdate: "linear",
		};
		return options;
	});
}

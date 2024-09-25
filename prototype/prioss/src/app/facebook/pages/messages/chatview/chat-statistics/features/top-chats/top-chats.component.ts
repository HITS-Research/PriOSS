import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	computed,
	input,
	signal,
} from "@angular/core";
import type { ChatData } from "../../../chatdata.type";

import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import type { EChartsOption } from "echarts";
import { NzFormModule } from "ng-zorro-antd/form";

/**
 * Component for displaying a chart of top chats based on message count.
 * This component allows users to filter and visualize the most active chats.
 */
@Component({
	selector: "prioss-top-chats",
	standalone: true,
	imports: [
		FormsModule,
		NzFormModule,
		CommonModule,
		NgxEchartsDirective,
		NzSwitchModule,
		NzInputNumberModule
	],
	providers: [provideEcharts()],
	templateUrl: "./top-chats.component.html",
	styleUrl: "./top-chats.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopChatsComponent implements OnInit{
	/** Input property for chat data */
	chatData = input.required<ChatData[]>();

	/** Signal for the number of chats to display (unused in the provided code) */
	amountofchatsshown = signal<number>(0);

	/** Signal for the number of top chats to display */
	amountOfChatsShown = signal<number>(5);

	/** Signal to toggle display of only personal chats */
	showOnlyPersonalChats = signal<boolean>(false);

	ngOnInit() {
		this.chatData().sort((a, b) => b.messages.length - a.messages.length);
	}

	/**
	 * Computed property demonstrating signal composition (unused in the provided code)
	 */
	added = computed(() => {
		return this.amountOfChatsShown() + this.amountOfChatsShown();
	})

	/**
	 * Computed property to generate the ECharts options for the top chats chart
	 * @returns EChartsOption object for configuring the chart
	 */
	drawNightingaleChart = computed(() => {
		const option: EChartsOption = {
			tooltip: {
				trigger: 'item',
				formatter: '{b}: {c}'
			},
			toolbox: {
				show: true,
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			aria: {
				enabled: true,
				decal: {
					show: true,
				},
			},
			series: [
				{
					name: 'Nightingale Chart',
					type: 'pie',
					radius: [50, 150],
					center: ['50%', '50%'],
					roseType: 'area',
					itemStyle: {
						borderRadius: 8
					},
					data: this.prepareChatsForChart()
				}
			]
		};
		return option;
	});

	/**
	 * Prepares chat data for the chart, filtering and limiting based on user settings
	 * @returns An array of objects containing chat names and message counts
	 */
	prepareChatsForChart = computed(() => {
		const chats = [];
		for (const chat of this.chatData()) {
			if (this.showOnlyPersonalChats()) {
				if (chat.participants.length === 2) {
					chats.push({
						value: chat.messages.length,
						name: chat.name,
					});
				}
			} else {
				chats.push({
					value: chat.messages.length,
					name: chat.name,
				});
			}
		}
		return chats.slice(0, this.amountOfChatsShown());
	});
}
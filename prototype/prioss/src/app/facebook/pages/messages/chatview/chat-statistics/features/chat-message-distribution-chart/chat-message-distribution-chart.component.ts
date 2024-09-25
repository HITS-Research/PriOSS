import {
	ChangeDetectionStrategy,
	Component,
	type OnInit,
	computed,
	input,
} from "@angular/core";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import type { ChatData } from "../../../chatdata.type";
import type { EChartsOption } from "echarts";

/**
 * Component for displaying a pie chart of message distribution in a chat.
 * This chart shows the percentage of messages sent by each participant in the chat.
 */
@Component({
	selector: "prioss-chat-message-distribution-chart",
	templateUrl: "./chat-message-distribution-chart.component.html",
	standalone: true,
	imports: [NgxEchartsDirective],
	providers: [provideEcharts()],
	styleUrl: "./chat-message-distribution-chart.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageDistributionChartComponent implements OnInit {
	/**
	 * Input property for the chat data to be visualized.
	 */
	chat = input.required<ChatData | undefined>({});

	ngOnInit() {
		this.drawMessagePercentageOfChat();
	}

	/**
	 * Computes the series data for the pie chart.
	 * Each data point represents a participant and their message count.
	 * @returns An array of objects containing the participant name and message count.
	 */
	getSeriesData = computed(() => {
		if(!this.chat()?.participants){
			return [];
		}
		return this.chat()?.participants.map((participant) => {
				return {
					value:
						this.chat()?.messages.filter(
							(message) => message.sender === participant,
						).length ?? 0,
					name: participant,
				};
			})
			.filter((participant) => participant.value > 0)
	});

	/**
	 * Generates the ECharts option for drawing the message distribution pie chart.
	 * @returns An EChartsOption object containing the chart configuration.
	 */
	drawMessagePercentageOfChat = computed(() => {
		if (this.chat() === undefined) {
			return {};
		}

		const options: EChartsOption = {
			toolbox: {
				show: true,
				feature: {
					saveAsImage: {},
				},
			},
			aria: {
				enabled: true,
				decal: {
					show: true,
				},
			},
			tooltip: {
				trigger: "item",
				formatter: '{b}: {c} ({d}%)'
			},
			legend: {
				top: "5%",
				left: "center",
				show: false,
			},
			series: [
				{
					name: "Chat Messages Sent",
					type: "pie",
					radius: ["40%", "70%"],
					label: {
						position: 'outside',
						formatter: '{b}'
					},
					labelLine: {
						showAbove: true,
						length: 10,
						length2: 0,
					},
					avoidLabelOverlap: true,
					data: this.getSeriesData(),
				},
			],
		};
		return options;
	});
}
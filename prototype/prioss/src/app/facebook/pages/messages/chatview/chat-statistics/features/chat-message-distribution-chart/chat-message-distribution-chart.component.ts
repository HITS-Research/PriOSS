import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	computed,
	effect,
	input,
} from "@angular/core";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import type { ChatData } from "../../../chatdata.type";
import type { EChartsOption } from "echarts";

@Component({
	selector: "prioss-chat-message-distribution-chart",
	templateUrl: "./chat-message-distribution-chart.component.html",
	standalone: true,
	imports: [NgxEchartsDirective],
	providers: [provideEcharts()],
	styleUrl: "./chat-message-distribution-chart.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChatMessageDistributionChartComponent implements OnInit{
	chat = input.required<ChatData | undefined>({});

  constructor() {
    effect(() => {
      console.log("chat in msg dist comp", this.chat())
    });
  }
	ngOnInit() {
		console.log(this.chat());
    console.log("init msg dist chart")
		this.drawMessagePercentageOfChat();
	}
	drawMessagePercentageOfChat = computed(() => {
		if (this.chat() === undefined) {
			return {};
		}

		const options: EChartsOption = {
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
          label:{
            position: 'outside',
            formatter: '{b}'
          },
					avoidLabelOverlap: true,
					data: this.chat()
						?.participants.map((participant) => {
							return {
								value:
									this.chat()?.messages.filter(
										(message) => message.sender === participant,
									).length ?? 0,
								name: participant,
							};
						})
						.filter((participant) => participant.value > 0),
				},
			],
		};
		return options;
	});
}

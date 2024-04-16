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
	chatData = input.required<ChatData[]>();

  amountofchatsshown = signal<number>(0);
	amountOfChatsShown = signal<number>(5);
	showOnlyPersonalChats = signal<boolean>(false);
	ngOnInit() {
		this.chatData().sort((a, b) => b.messages.length - a.messages.length);
	}

  added = computed(() => {
    return this.amountOfChatsShown() + this.amountOfChatsShown();
  })


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
   * If the user wants to only see personal chats, the function filters out all chats with more than 2 participants.
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

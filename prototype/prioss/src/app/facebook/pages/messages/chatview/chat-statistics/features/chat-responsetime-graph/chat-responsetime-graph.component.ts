import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, input, signal } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { ChatData } from '../../../chatdata.type';
import { EChartsOption, SeriesOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { getRndInteger } from 'src/app/features/utils/generalUtilities.functions';

/**
 * Component for displaying a graph of response times in chat conversations.
 * This component allows users to select multiple chats and view their response time distributions.
 */
@Component({
  selector: 'prioss-chat-responsetime-graph',
  standalone: true,
  imports: [NgxEchartsDirective, NzSelectModule, CommonModule, FormsModule, NzInputModule, NzFormModule],
  providers: [provideEcharts()],
  templateUrl: './chat-responsetime-graph.component.html',
  styleUrl: './chat-responsetime-graph.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatResponsetimeGraphComponent implements OnInit {

  ngOnInit(): void {
    if (this.chatData().length > 0) {
      const randomChat = getRndInteger(0, this.chatData().length - 1);
      this.selectedChatsInput.set([this.chatData()[randomChat].id]);
    }
  }

  /** Input property for all chat data */
  chatData = input.required<ChatData[]>();

  /** Signal for the currently displayed chat */
  currentChat = signal<ChatData>({} as ChatData);

  /**
   * Computed property to get the selected chats based on their IDs
   */
  selectedChats: Signal<ChatData[]> = computed(() => {
    if (this.selectedChatsInput().length === 0) {
      return [];
    }
    return this.chatData().filter((chat) => this.selectedChatsInput().includes(chat.id));
  });

  /** Signal for the cutoff value to exclude outliers */
  cutoffInput = signal<number>(0);

  /** Signal for the IDs of selected chats */
  selectedChatsInput = signal<string[]>([]);

  /**
   * Computes the response time series for the selected chats
   * @returns An array of SeriesOption objects for ECharts
   */
  getResponseTimesSeries = computed(() => {
    const allResponseTimes: SeriesOption[] = [];
    const selectedChats: ChatData[] = this.selectedChats();
    if (selectedChats.length === 0) {
      return [];
    }
    for (const selectedChat of selectedChats) {

      if (selectedChat.messages === undefined) {
        continue;
      }
      const responseTimes: number[] = [];
      const messages = selectedChat.messages;
      for (let i = 0; i < messages.length - 1; i++) {
        const message = selectedChat.messages[i];
        const nextMessage = selectedChat.messages[(i + 1)];
        if (message.sender !== nextMessage.sender) {
          responseTimes.push(message.timestamp - nextMessage.timestamp);
        }
      }
      responseTimes.sort((a, b) => a - b);
      const timesInMinutes = responseTimes.map((time) => time / 60000);
      const result: number[][] = [];
      for (let i = 0; i < timesInMinutes.length; i++) {
        // Create an array with entries showing how many messages were answered
        // in less than 1/i of the longest response time; on x we track the cutoff in minutes, 
        // on y the percentage of messages responded to in the cutoff time 

        const currentCutoff = timesInMinutes[i];
        const amountOfResponseTimes = timesInMinutes.length;
        result.push(
          [currentCutoff, i / amountOfResponseTimes],
        );
      }
      allResponseTimes.push({
        data: result.slice(0, result.length - this.cutoffInput()),
        type: 'line',
        smooth: true,
        name: selectedChat.name,
      });
    }
    return allResponseTimes;
  });

  /**
   * Computes the ECharts options for the response time graph
   */
  options: Signal<EChartsOption> = computed(() => {
    const options: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: any) => {
          const param = params[0];
          return `${Math.round(param.value[0])} minutes: ${Math.round(param.value[1] * 100)}%`;
        } 
      },
      grid: { containLabel: true },
      legend: {
        data: this.selectedChats().map((chat) => chat.name),
      },
      xAxis: {
        nameLocation: 'middle',
        name: 'Response Time in Minutes',
        nameGap: 30,
        axisLabel: {
          hideOverlap: true,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          hideOverlap: true,
        },
        name: 'Percentage of Messages',
        nameLocation: 'end',
      },
      series: this.getResponseTimesSeries(),
    };
    return options;
  });
}
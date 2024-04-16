import { ChangeDetectionStrategy, Component, Signal, computed, input, signal } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { ChatData } from '../../../chatdata.type';
import { EChartsOption, SeriesOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'prioss-chat-responsetime-graph',
  standalone: true,
  imports: [NgxEchartsDirective, NzSelectModule, CommonModule, FormsModule, NzInputModule, NzFormModule],
  providers: [provideEcharts()],
  templateUrl: './chat-responsetime-graph.component.html',
  styleUrl: './chat-responsetime-graph.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatResponsetimeGraphComponent {

  chatData = input.required<ChatData[]>();

  currentChat = signal<ChatData>({} as ChatData);

  selectedChats: Signal<ChatData[]> = computed(() => {
    if (this.selectedChatsInput().length === 0) {
      return [];
    }
    return this.chatData().filter((chat) => this.selectedChatsInput().includes(chat.id));
  });

  cutoffInput = signal<number>(0);

  

  selectedChatsInput = signal<string[]>([]);
  /**
   * this function returns a list a list of response times.
   * it includes only a respnse time from one participant to the other.
   * so if a participant writes a message and the other participant responds to it, the response time is calculated.
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
      console.log(`amount of messages: ${messages.length}`)
      for (let i = 0; i < messages.length - 1; i++) {
        const message = selectedChat.messages[i];
        const nextMessage = selectedChat.messages[(i + 1)];
        if (message.sender !== nextMessage.sender) {
          responseTimes.push(message.timestamp - nextMessage.timestamp);
        }
      }
      console.log(`amount of response times: ${responseTimes.length}`);
      responseTimes.sort((a, b) => a - b);
      console.log(`sorted response times: ${responseTimes.at(0)} to ${responseTimes.at(responseTimes.length - 1)}`)
      const timesInMinutes = responseTimes.map((time) => time / 60000);
      const result: number[][] = [];
      for (let i = 0; i < timesInMinutes.length; i++) {
        //create an array with 100 entries, where each entry shows, how many messages were answered
        // in less than 1/i of the longest response time; on x we track the cutoff in minutes, 
        // on y the percentage of messages responed to in the cutoff time 

        const currentCutoff = timesInMinutes[i];
        const amountOfResponseTimes = timesInMinutes.length;
        result.push(
          [currentCutoff, i / amountOfResponseTimes],
        );
      }
      console.log(`result size: ${result.length}`)
      allResponseTimes.push({
        data: result.slice(0, result.length - this.cutoffInput()),
        type: 'line',
        smooth: true,
        name: selectedChat.name,
      });
    }
    return allResponseTimes;
  });


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
        nameGap: 25,
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
        nameLocation: 'middle',
        nameRotate: 90,
        nameGap: 28,
      },
      series: this.getResponseTimesSeries(),
    };
    return options;
  });
}

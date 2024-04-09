import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { ChatData } from '../../../chatdata.type';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'prioss-messages-per-weekday',
  standalone: true,
  imports: [NgxEchartsModule],
  providers: [provideEcharts()],
  templateUrl: './messages-per-weekday.component.html',
  styleUrl: './messages-per-weekday.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesPerWeekdayComponent {
  chatData = input.required<ChatData[]>();
  yourUsername = input.required<string>();
  chartXAxisLabels = signal<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

  drawMessagesPerWeekDayChart = computed(() => {
    const options: EChartsOption = {
      tooltip:{
        trigger: 'axis'
      
      },
      xAxis: {
        type: 'category',
        data: this.chartXAxisLabels()
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.messagesSentPerWeekDay(),
          type: 'bar',
          name: 'Sent'
        },
        {
          data: this.messagesReceivedPerWeekDay(),
          type: 'bar',
          name: 'Received'
        }
      ]
    };
    return options;
  });

  messagesSentPerWeekDay = computed(() => {
    const messagesPerDay = Array.from({ length: 7 }, () => 0);
    for(const chat of this.chatData()) {
      for(const message of chat.messages) {
        if(message.sender === this.yourUsername()) {
          const date = new Date(message.timestamp);
          messagesPerDay[date.getDay()]++;
        }
      }
    }
    return messagesPerDay;
  });
  messagesReceivedPerWeekDay = computed(() => {
    const messagesPerDay = Array.from({ length: 7 }, () => 0);
    for(const chat of this.chatData()) {
      for(const message of chat.messages) {
        if(message.sender !== this.yourUsername()) {
          const date = new Date(message.timestamp);
          messagesPerDay[date.getDay()]++;
        }
      }
    }
    return messagesPerDay;
  });
}

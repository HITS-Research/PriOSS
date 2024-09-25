import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { ChatData } from '../../../chatdata.type';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';

/**
 * Component for displaying a chart of messages sent and received per day of the week.
 * This component visualizes the distribution of messages across the seven days of a week.
 */
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
  /** Input property for chat data */
  chatData = input.required<ChatData[]>();

  /** Input property for the current user's username */
  yourUsername = input.required<string>();

  /** Signal for chart X-axis labels (days of the week) */
  chartXAxisLabels = signal<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

  /**
   * Computed property to generate the ECharts options for the messages per weekday chart
   * @returns EChartsOption object for configuring the chart
   */
  drawMessagesPerWeekDayChart = computed(() => {
    const options: EChartsOption = {
      tooltip:{
        trigger: 'axis'
      },
      xAxis: {
        name: 'Day of the week',
        nameLocation: 'middle',
        nameGap: 30,
        type: 'category',
        data: this.chartXAxisLabels()
      },
      yAxis: {
        name: 'Messages',
        nameLocation: 'end',
        type: 'value'
      },
      aria: {
				enabled: true,
				decal: {
					show: true,
				},
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

  /**
   * Computed property to calculate the number of messages sent per day of the week
   * @returns An array of 7 elements, each representing the count of messages sent on that day
   */
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

  /**
   * Computed property to calculate the number of messages received per day of the week
   * @returns An array of 7 elements, each representing the count of messages received on that day
   */
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
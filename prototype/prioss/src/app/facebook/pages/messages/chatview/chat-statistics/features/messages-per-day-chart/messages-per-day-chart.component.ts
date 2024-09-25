import { ChangeDetectionStrategy, Component, OnInit, computed, input, signal } from '@angular/core';
import type { ChatData } from '../../../chatdata.type';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

/**
 * Component for displaying a chart of messages sent and received per hour of the day.
 * This component visualizes the distribution of messages across a 24-hour period.
 */
@Component({
  selector: 'prioss-messages-per-day-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './messages-per-day-chart.component.html',
  styleUrl: './messages-per-day-chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesPerDayChartComponent implements OnInit {
  /** Input property for chat data */
  chatData = input.required<ChatData[]>();

  /** Input property for the current user's username */
  yourUsername = input.required<string>();

  /** Signal for chart X-axis labels (hours of the day) */
  chartXAxisLabels = signal<string[]>([]);

  ngOnInit() {
    for (let i = 0; i < 24; i++) {
      this.chartXAxisLabels().push(i.toString());
    }
  }

  /**
   * Computed property to generate the ECharts options for the messages per day chart
   * @returns EChartsOption object for configuring the chart
   */
  drawMessagesPerDayChart = computed(() => {
    const options: EChartsOption = {
      tooltip:{
        trigger: 'axis'
      },
      aria: {
				enabled: true,
				decal: {
					show: true,
				},
			},
      xAxis: {
        name: 'Hour of the day',
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
      series: [
        {
          data: this.messagesSentPerDay(),
          type: 'bar',
          name: 'Sent'
        },
        {
          data: this.messagesReceivedPerDay(),
          type: 'bar',
          name: 'Received'
        }
      ]
    };
    return options;
  });

  /**
   * Computed property to calculate the number of messages sent per hour of the day
   * @returns An array of 24 elements, each representing the count of messages sent in that hour
   */
  messagesSentPerDay = computed(() => {
    const messagesPerDay = Array.from({ length: 24 }, () => 0);
    for(const chat of this.chatData()) {
      for(const message of chat.messages) {
        if(message.sender === this.yourUsername()) {
          const date = new Date(message.timestamp);
          messagesPerDay[date.getHours()]++;
        }
      }
    }
    return messagesPerDay;
  });

  /**
   * Computed property to calculate the number of messages received per hour of the day
   * @returns An array of 24 elements, each representing the count of messages received in that hour
   */
  messagesReceivedPerDay = computed(() => {
    const messagesPerDay = Array.from({ length: 24 }, () => 0);
    for(const chat of this.chatData()) {
      for(const message of chat.messages) {
        if(message.sender !== this.yourUsername()) {
          const date = new Date(message.timestamp);
          messagesPerDay[date.getHours()]++;
        }
      }
    }
    return messagesPerDay;
  });
}
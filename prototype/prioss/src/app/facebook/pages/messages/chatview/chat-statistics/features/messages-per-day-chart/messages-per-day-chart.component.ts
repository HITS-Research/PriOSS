import { ChangeDetectionStrategy, Component, OnInit, computed, input, signal } from '@angular/core';
import type { ChatData } from '../../../chatdata.type';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'prioss-messages-per-day-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './messages-per-day-chart.component.html',
  styleUrl: './messages-per-day-chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesPerDayChartComponent implements OnInit{
  chatData = input.required<ChatData[]>();
  yourUsername = input.required<string>();
  chartXAxisLabels = signal<string[]>([]);

  ngOnInit() {
    for (let i = 0; i < 24; i++) {
      this.chartXAxisLabels().push(i.toString());
    }
  }
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
        type: 'category',
        data: this.chartXAxisLabels()
      },
      yAxis: {
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

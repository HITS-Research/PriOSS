import {AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy, Signal, computed} from '@angular/core';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";
import {InstaUserMessageDataModel, Messages} from "../../state/models";
import {EChartsOption} from "echarts";
import {DataRangeCalculatorService} from "../../service/echarts/data-range-calculator.service";

@Component({
  selector: 'app-insta-messages',
  templateUrl: './insta-messages.component.html',
  styleUrls: ['./insta-messages.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstaMessagesComponent
  extends SequenceComponentInit
  implements AfterViewInit, OnInit {
  @Input()
  previewMode = false;
  messageData: InstaUserMessageDataModel[];
  username: string;
  profilePic: string;
  sentMessages: Messages[] = [];
  receivedMessages: Messages[] = [];

  constructor(private store: Store, private rangeCalculator: DataRangeCalculatorService) {
    super();
  }


  ngOnInit() {
    this.messageData = this.store.selectSnapshot(InstaState.getUserMessageData);
    this.username = this.store.selectSnapshot(InstaState.getUserPersonalData).personalInfo.name;
    this.profilePic = this.store.selectSnapshot(InstaState.getProfilePic);
    this.constructGraphData();
  }

  async ngAfterViewInit() {
    if (!this.previewMode) {
      await this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {
  }

  constructGraphData() {
    this.messageData.forEach(data => {
      this.sentMessages.push(...data.messages.filter(msg => msg.sender === this.username));
      this.receivedMessages.push(...data.messages.filter(msg => msg.sender !== this.username));
    })
  }

  private timestampArray(data: Messages[]): (string | number)[] {
    return data.map(item => item.timestamp);
  }

  options: Signal<EChartsOption> = computed(() => {
    const dateRange = this.rangeCalculator.getDateRangeArray(this.timestampArray([...this.receivedMessages, ...this.sentMessages]),true);
    const options: EChartsOption = {
      aria: {
        enabled: true,
        decal: {
          show: true,
        },
      },
      grid: {
        top: 70,
        bottom: 50
      },
      tooltip: {
        trigger: "axis",
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        data: ["Sent Messages", "Received Messages"]
      },
      xAxis: {
        type: "category",
        data: dateRange,
      },
      yAxis: {
        type: "value",
        minInterval: 1,
      },
      series: [
        {
          name: "Sent Messages",
          data: this.rangeCalculator.countOccurrencesInRange(dateRange, this.timestampArray(this.sentMessages),true),
          type: "line",
          smooth: true,
        },
        {
          name: "Received Messages",
          data: this.rangeCalculator.countOccurrencesInRange(dateRange, this.timestampArray(this.receivedMessages),true),
          type: "line",
          smooth: true,
        },
      ],
    };
    return options;
  });
}

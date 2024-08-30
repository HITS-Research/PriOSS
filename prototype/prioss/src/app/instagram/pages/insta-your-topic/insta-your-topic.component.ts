import {AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaTopicsInfo } from 'src/app/instagram/models/YourTopicsInfo/InstaTopicsInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";
import {WordCloudComponent} from "src/app/features/word-cloud/word-cloud.component";
import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-insta-your-topic',
  templateUrl: './insta-your-topic.component.html',
  styleUrls: ['./insta-your-topic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass,
    NgIf,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzStatisticModule,
    TitleBarComponent,
    WordCloudComponent,
  ]
})
export class InstaYourTopicComponent extends SequenceComponentInit implements AfterViewInit, OnInit{

  @Input()
  previewMode = false;
  yourTopics: InstaTopicsInfo[] = [];
  topicsWordData: string[]= [];
  @ViewChild('wordCloudRef', { static: false }) wordlCloud: WordCloudComponent;

  constructor(private store: Store){
    super();
  }

  ngOnInit() {
    this.yourTopics = this.store.selectSnapshot(InstaState.getUserTopicData);
    this.yourTopics.forEach(topic=>this.topicsWordData.push(topic.topic));
  }

  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

  override async initComponent(): Promise<void> {
  }

  redrawCloud(){
    this.wordlCloud.reDraw();
  }

  downloadCloud(){
    this.wordlCloud.saveAsImage();
  }
}

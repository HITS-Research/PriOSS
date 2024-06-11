import {AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaTopicsInfo } from 'src/app/instagram/models/YourTopicsInfo/InstaTopicsInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";
import {WordCloudComponent} from "src/app/features/word-cloud/word-cloud.component";

@Component({
  selector: 'app-insta-your-topic',
  templateUrl: './insta-your-topic.component.html',
  styleUrls: ['./insta-your-topic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

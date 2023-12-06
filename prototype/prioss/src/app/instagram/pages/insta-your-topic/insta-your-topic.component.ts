import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaTopicsInfo } from 'src/app/instagram/models/YourTopicsInfo/InstaTopicsInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";

@Component({
  selector: 'app-insta-your-topic',
  templateUrl: './insta-your-topic.component.html',
  styleUrls: ['./insta-your-topic.component.less']
})
export class InstaYourTopicComponent extends SequenceComponentInit implements AfterViewInit, OnInit{

  @Input()
  previewMode = false;
  topicSearchValue = '';
  topicVisible = false;
  yourTopics: InstaTopicsInfo[] = [];
  listOfYourTopics: InstaTopicsInfo[] = [];

  constructor(private store: Store){
    super();
  }

  ngOnInit() {
    this.yourTopics = this.store.selectSnapshot(InstaState.getUserTopicData);
    this.listOfYourTopics = [...this.yourTopics]
  }

  /**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

  /**
  * @see-super-class
  * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 10: Your Topics");
  }

  /**
   * Resets the given searchvalue.
   *
   * @param searchList the list that should be resetted.
   *
   * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
   */
  reset(searchList: string): void {
    switch (searchList) {
      case 'topic':
        this.topicSearchValue = '';
        break;
      default:
        break;
    }

    this.search(searchList);
  }

  /**
   * Searches the given list for the current searchvalue.
   *
   * @param searchList the list that should be searched.
   *
   * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
   */
  search(searchList: string): void {
    this.topicVisible = false;

    switch (searchList) {
      case 'topic':
        this.listOfYourTopics = this.yourTopics.filter((item: InstaTopicsInfo) => item.topic.toLowerCase().indexOf(this.topicSearchValue.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }
}

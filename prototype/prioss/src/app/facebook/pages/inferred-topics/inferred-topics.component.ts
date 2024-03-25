import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookState } from '../../state/fb.state';
import { FbLoggedInformationModel } from '../../state/models/';
import { Store } from '@ngxs/store';
import { InferredTopicsModel } from '../../models';

/**
 * This component visualizes inferred topics in facebook.
 * This page is shown once user clicks the tile for inferred topics in facebook dashboard.
 *
 *
 * @author: Rashida (rbharmal@mail.uni-paderborn.de)
 *
 */

@Component({
  selector: 'app-inferred-topics',
  templateUrl: './inferred-topics.component.html',
  styleUrls: ['./inferred-topics.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InferredTopicsComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  @Input()
  previewMode = false;

  inferredTopics: string[] = [];
  dataAvailable = false;

  fbLoggedInformationStore: FbLoggedInformationModel = {} as FbLoggedInformationModel;
  fbInferredTopicsData: InferredTopicsModel = {} as InferredTopicsModel;

  /**
   * This method gets all inferred topics on intialization of the component
   *
   *
   * @author: Rashida (rbharmal@mail.uni-paderborn.de)
   *
   */
  ngOnInit() {
    this.fbLoggedInformationStore = this.store.selectSnapshot(
      FacebookState.getFacebookLoggedInformationData,
    );
    this.fbInferredTopicsData = this.fbLoggedInformationStore.inferred_topics;
    if (this.fbLoggedInformationStore.inferred_topics.inferred_topics_v2.length !== 0) {
      this.inferredTopics = this.fbLoggedInformationStore.inferred_topics.inferred_topics_v2;
      this.dataAvailable = true;
    }
  }
  /**
   * This method navigates from inferred topics visualization to guidelines to manage inferred topics
   *
   *
   * @author: Mukul (mukuls@mail.uni-paderborn.de)
   *
   */
  navigateToYourTopics() {
    this.router.navigate(['face/your-topics']);
  }
}

import { Component, Input, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FbLoggedInformationModel } from '../../state/models/';
import { Store } from '@ngxs/store';
import { InferredTopicsModel } from '../../models';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgFor, NgIf } from '@angular/common';

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
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NzButtonModule,
    NzListModule,
    NzResultModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzTypographyModule,
    TitleBarComponent,
  ]
})
export class InferredTopicsComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
    private indexedDbService: IndexedDbService,
  ) { }

  @Input()
  previewMode = false;
  loading = signal<boolean>(true);
  inferredTopics = computed(() => this.fbInferredTopicsData().inferred_topics_v2 ?? []);
  dataAvailable = computed(() => this.inferredTopics().length !== 0);

  fbLoggedInformationStore = signal<FbLoggedInformationModel>({} as FbLoggedInformationModel);
  fbInferredTopicsData = computed(() => this.fbLoggedInformationStore().inferred_topics ?? {} as InferredTopicsModel);

  /**
   * This method gets all inferred topics on intialization of the component
   *
   *
   * @author: Rashida (rbharmal@mail.uni-paderborn.de)
   *
   */
  async ngOnInit() {
    await this.indexedDbService.getSelectedFacebookDataStore()
      .then((data) => {
        if (!data.facebookData) {
          this.fbLoggedInformationStore.set({} as FbLoggedInformationModel);
        } else {
          this.fbLoggedInformationStore.set(data.facebookData.logged_information);
        }
      }
      ).finally(() => {
        this.loading.set(false);
      });
  }
  /**
   * This method navigates from inferred topics visualization to guidelines to manage inferred topics
   *
   *
   * @author: Mukul (mukuls@mail.uni-paderborn.de)
   *
   */
  navigateToYourTopics() {
    this.router.navigate(['facebook/your-topics']);
  }
}

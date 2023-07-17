import { Component, Input } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { InferredTopicsRepository } from 'src/app/db/data-repositories/facebook/fb-inferred-data/face_inferred_topics.repo';
import { InferredTopicsModel } from 'src/app/models/Facebook/inferredTopics';
import { Router } from '@angular/router';

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
  styleUrls: ['./inferred-topics.component.less']
})
export class InferredTopicsComponent {

  constructor( private inferredTopicsDataRepo: InferredTopicsRepository, private router: Router)
  {}

  @Input()
  previewMode: boolean = false;

  inferredTopics: InferredTopicsModel[] = [];

  /**
  * This method gets all inferred topics on intialization of the component
  * 
  *
  * @author: Rashida (rbharmal@mail.uni-paderborn.de)
  *
  */
  ngOnInit() {
    this.inferredTopicsDataRepo.getAllInferredTopics().then((topics) => {
      this.inferredTopics = topics;
    });
  }
  /**
  * This method navigates from inferred topics visualization to guidelines to manage inferred topics 
  * 
  *
  * @author: Mukul (mukuls@mail.uni-paderborn.de)
  *
  */
  navigateToYourTopics(){
    this.router.navigate(['face/your-topics']);

  }

}

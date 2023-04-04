import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

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

  constructor(private dbService: NgxIndexedDBService)
  {}

  inferredTopics: any[] = [];

  /**
  * This method gets all inferred topics on intialization of the component
  * 
  *
  * @author: Rashida (rbharmal@mail.uni-paderborn.de)
  *
  */
  ngOnInit() {
    this.dbService.getAll('face/inferred_topics').subscribe(topics => {
      this.inferredTopics = topics;
      console.log(this.inferredTopics);
    })
  }

}

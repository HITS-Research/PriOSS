import { Component, Input, SimpleChanges } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';


interface Inference {
  inference: string;
}


/**
  * This component visualizes the inferences in the datadownload.
  * It allows to directly open the email client with a template text to rectificate a inference.
  *
  * @author: Sven (svenf@mail.uni-paderborn.de)
  *
  */
@Component({
  selector: 'spot-inferences',
  templateUrl: './inferences.component.html',
  styleUrls: ['./inferences.component.less']
})


export class InferencesComponent {

  @Input()
  previewMode: boolean = false;

  inferences: Inference[] = [];
  listOfInferences: Inference[];
  searchValue = '';
  visible = false;

  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.getAll('spot/inferences').subscribe((inferences: any) => 
    {
     console.log("history: ");
     console.log(inferences); 
     this.inferences = inferences;
     this.listOfInferences =  [...this.inferences];     
    });
  }

  /**
   * This function resets the search value. Calls {@link search()} which then displays all inferences as the searchvalue is empty
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  reset(): void {
    this.searchValue = '';
    this.search();
  }


  /**
   * Filters the list of inferences based on the searchValue.
   * https://ng.ant.design/components/table/en#components-table-demo-custom-filter-panel
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  search(): void {
    this.visible = false;
    this.listOfInferences = this.inferences.filter((item: Inference) => item.inference.indexOf(this.searchValue) !== -1);
  }


  /**
   * Opens the standard email client from a user.
   * Sets recipient, subject and body for the user. Adds the clicked on inference to the email.
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  handleClick(inference: string): void {
    window.open('mailto:privacy@spotify.com?subject=Rectification&body=I want to rectificate this inference '+ inference);
  }
  

}

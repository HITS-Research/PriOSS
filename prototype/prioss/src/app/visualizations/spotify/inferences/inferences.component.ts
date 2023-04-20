import { Component, Input, SimpleChanges } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

interface Inference {
  inference: string;
  id: number;
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

  inferences: readonly Inference[] = [];
  listOfInferences: readonly Inference[];
  visible = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  listOfInferencesToDelete: Inference[];

  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.getAll('spot/inferences').subscribe((inferences: any) => {
      this.inferences = inferences;
      inferences.forEach((inference: Inference, index: number) => inference.id = index + 1);
      this.listOfInferences = [...this.inferences];
    });
  }

  /**
   * The following five functions are taken from https://ng.ant.design/components/table/en#components-table-demo-row-selection-custom.
   * Update the set of checked IDs based on the checked status.
   * @param id 
   * @param checked 
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  /**
   * Handler for when an item's checked status changes.
   * @param id 
   * @param checked 
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }


  /**
   * Handler for when the "Select All" checkbox is checked or unchecked
   * @param value 
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  onAllChecked(value: boolean): void {
    this.listOfInferences.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  /**
   * Handler for when the data of the current page changes.
   * @param $event 
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  onCurrentPageDataChange($event: readonly Inference[]): void {
    this.listOfInferences = $event;
    this.refreshCheckedStatus();
  }

  /**
   * Refresh the checked status of all items.
   *  
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  refreshCheckedStatus(): void {
    this.checked = this.listOfInferences.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfInferences.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  /**
   * Filters the list of inferences based on the searchValue.
   * https://ng.ant.design/components/table/en#components-table-demo-custom-filter-panel
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  search(searchValue: any): void {
    this.visible = false;
    this.listOfInferences = this.inferences.filter((item: Inference) =>
      item.inference.toLowerCase().includes(searchValue.toLowerCase())
    );

  }

  /**
   * This function resets the search value. Calls {@link search('')} which then displays all inferences as the searchvalue is empty
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  reset(): void {
    const searchText = document.querySelector('input[nz-input]') as HTMLInputElement;
    searchText.value = '';
    this.search('');
  }


  /**
   * Opens the standard email client from a user.
   * Sets recipient, subject and body for the user. Adds the clicked on inference to the email.
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  rectifyInferences(): void {
    let inferencesWithLinebreak: String = "";
    for (const inference of this.listOfInferences) {
      if (this.setOfCheckedId.has(inference.id)) {
        inferencesWithLinebreak += inference.inference + '%0D%0A';
      }
    }
    if (this.setOfCheckedId.size > 0) {
      window.open('mailto:privacy@spotify.com?subject=Rectification&body=Dear Spotify Data Protection Team,%0D%0A I want to rectify the following inferences as I deem them wrong. I am exercising my right after GDPR 16. %0D%0A' + inferencesWithLinebreak, '_self');
    } else {
      console.log("no inference selected")
    }
  }
}

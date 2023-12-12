import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { InferencesRepository } from 'src/app/db/data-repositories/general/inferences/inferences.repository';
import { InferencesEntry } from 'src/app/framework/models/Inferences/InferencesEntry';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InferencesMailComponent } from '../../features/inferences-mail/inferences-mail.component';


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
export class InferencesComponent extends SequenceComponentInit implements AfterViewInit{

  @Input()
  previewMode = false;

  @ViewChild('InferencesMailComponent')
  inferencesMailDialogComponent : InferencesMailComponent;

  inferences: readonly InferencesEntry[] = [];
  listOfInferences: InferencesEntry[] = [];
  visible = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  listOfInferencesToDelete: InferencesEntry[];

  constructor(private inferencesRepo: InferencesRepository) {
    super();
  }

/**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }

/**
  * @see-super-class
  * @author Simon (scg@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    const inferences = await this.inferencesRepo.getAllInferences();

    this.inferences = inferences;
    this.listOfInferences = [...this.inferences];
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
  onCurrentPageDataChange($event: InferencesEntry[]): void {
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
    this.listOfInferences = this.inferences.filter((item: InferencesEntry) =>
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
    let inferencesWithLinebreak = "";
    for (const inference of this.listOfInferences) {
      if (this.setOfCheckedId.has(inference.id)) {
        inferencesWithLinebreak += inference.inference + '\n';
      }
    }
    if (this.setOfCheckedId.size > 0) {
      this.inferencesMailDialogComponent.showModal(inferencesWithLinebreak);
    } else {
       // TODO: Toast : show the below message as Toast,
      console.log("no inference selected")
    }
  }
}

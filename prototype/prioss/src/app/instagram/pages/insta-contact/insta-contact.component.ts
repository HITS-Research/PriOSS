import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaContactInfo } from 'src/app/instagram/models/ContactInfo/InstaContactInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";

@Component({
  selector: 'app-insta-contact',
  templateUrl: './insta-contact.component.html',
  styleUrls: ['./insta-contact.component.less']
})
export class InstaContactComponent extends SequenceComponentInit implements AfterViewInit, OnInit{

  @Input()
  previewMode = false;
  firstnameSearchValue = '';
  surnameSearchValue = '';
  numberSearchValue = '';
  firstVisible = false;
  surVisible = false;
  numberVisible = false;

  contacts: InstaContactInfo[] = [];
  listOfContacts: InstaContactInfo[] = [];

  constructor(private store: Store){
    super();
  }

  ngOnInit() {
    this.contacts = this.store.selectSnapshot(InstaState.getUserContacts);
    this.listOfContacts = [...this.contacts];
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
    console.log("--- Initializing Component 4: Contacts");
  }

  /**
   * Resets the given searchvalue.
   *
   * @param searchList the list that should be resetted.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  reset(searchList: string): void {
    switch (searchList) {
      case 'first':
        this.firstnameSearchValue = '';
        break;
      case 'sur':
        this.surnameSearchValue = '';
        break;
      case 'number':
        this.numberSearchValue = '';
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
   * @author: Paul (pasch@mail.upb.de)
   */
  search(searchList: string): void {
    this.firstVisible = false;
    this.surVisible = false;
    this.numberVisible = false;

    switch (searchList) {
      case 'first':
        this.listOfContacts = this.contacts.filter((item: InstaContactInfo) => item.firstName.toLowerCase().indexOf(this.firstnameSearchValue.toLowerCase()) !== -1);
        break;
      case 'sur':
        this.listOfContacts = this.contacts.filter((item: InstaContactInfo) => item.surname.toLowerCase().indexOf(this.surnameSearchValue.toLowerCase()) !== -1);
        break;
      case 'number':
        this.listOfContacts = this.contacts.filter((item: InstaContactInfo) => item.contactInformation.toLowerCase().indexOf(this.numberSearchValue.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }
}

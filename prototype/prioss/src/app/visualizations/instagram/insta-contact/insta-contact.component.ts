import { Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { InstaContactsRepository } from 'src/app/db/data-repositories/instagram/insta-contacts/insta-contacts.repository';
import { InstaContactInfo } from 'src/app/models/Instagram/ContactInfo/InstaContactInfo';

@Component({
  selector: 'app-insta-contact',
  templateUrl: './insta-contact.component.html',
  styleUrls: ['./insta-contact.component.less']
})
export class InstaContactComponent extends SequenceComponentInit{

  @Input()
  previewMode: boolean = false;
  firstnameSearchValue = '';
  surnameSearchValue = '';
  firstVisible = false;
  surVisible = false;

  contacts: InstaContactInfo[] = [];
  listOfContacts: InstaContactInfo[] = [];

  constructor(private instaContactsRepo: InstaContactsRepository){
    super();
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
    // Contacts fetched from SQlite
    await this.instaContactsRepo.getAllContacts().then((contacts) => {
      this.contacts = contacts;
      this.listOfContacts = [...this.contacts];
    });
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

    switch (searchList) {
      case 'first':
        this.listOfContacts = this.contacts.filter((item: InstaContactInfo) => item.firstName.indexOf(this.firstnameSearchValue) !== -1);
        break;
      case 'sur':
        this.listOfContacts = this.contacts.filter((item: InstaContactInfo) => item.surname.indexOf(this.surnameSearchValue) !== -1);
        break;
      default:
        break;
    }
  }
}

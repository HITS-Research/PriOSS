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

    contacts: InstaContactInfo[] = [];
  
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
  * @author Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
  */
  override async initComponent(): Promise<void> {

    // Contacts fetched from SQlite
    
    let contacts = await this.instaContactsRepo.getAllContacts();
    if(contacts.length > 0) {
      this.contacts = contacts
    }
}
}

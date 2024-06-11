import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaContactInfo } from 'src/app/instagram/models/ContactInfo/InstaContactInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-insta-contact',
  templateUrl: './insta-contact.component.html',
  styleUrls: ['./insta-contact.component.less']
})
export class InstaContactComponent extends SequenceComponentInit implements AfterViewInit, OnInit{

  @Input()
  previewMode = false;
  searchControl = new FormControl();
  contacts: InstaContactInfo[] = [];
  listOfContacts: InstaContactInfo[] = [];
  sortCounter= 0;
  sortIconValue="arrow-down";
  constructor(private store: Store){
    super();
  }

  ngOnInit() {
    this.contacts = this.store.selectSnapshot(InstaState.getUserContacts);
    this.contacts.forEach(contact => contact.colour = this.getRandomSoftColor());
    this.listOfContacts = [...this.contacts];
  }

  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
    this.searchControl.valueChanges.pipe(
      debounceTime(10),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterContacts(searchTerm);
    });
  }

  override async initComponent(): Promise<void> {
  }

  resetContacts(){
    this.listOfContacts = [...this.contacts];
    this.searchControl.patchValue("");
  }

  filterContacts(searchTerm: string = this.searchControl.getRawValue() as string) {
    console.log(searchTerm,"\n");
    if (!searchTerm||searchTerm.length < 3) {
      this.listOfContacts = [...this.contacts];
      return;
    }
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.listOfContacts = this.contacts.filter(contact => {
      if (/^\d+$/.test(lowerCaseTerm)) {
        return contact.contactInformation.includes(lowerCaseTerm);
      } else {
        return contact.firstName.toLowerCase().includes(lowerCaseTerm) ||
          contact.surname.toLowerCase().includes(lowerCaseTerm);
      }
    });
  }

  sortContactsByName() {
    this.sortCounter++;
    const isAscending = this.sortCounter % 2 !== 0;
    this.listOfContacts.sort((a, b) => {
      const nameA = (a.firstName + a.surname).toLowerCase();
      const nameB = (b.firstName + b.surname).toLowerCase();
      if (nameA < nameB) return isAscending ? -1 : 1;
      if (nameA > nameB) return isAscending ? 1 : -1;
      return 0;
    });
    if(isAscending){
      this.sortIconValue = "arrow-down";
    }else{
      this.sortIconValue = "arrow-up";
    }
  }

  getRandomSoftColor() {
    const hue = Math.floor(Math.random() * 360);
    const lightness = Math.floor(Math.random() * 20) + 70;
    const saturation = Math.floor(Math.random() * 21) + 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}

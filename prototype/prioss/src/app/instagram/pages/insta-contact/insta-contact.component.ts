import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngxs/store";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { debounceTime, distinctUntilChanged } from "rxjs";
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { InstaContactInfo } from 'src/app/instagram/models/ContactInfo/InstaContactInfo';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { InstaState } from "../../state/insta.state";
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-insta-contact',
  templateUrl: './insta-contact.component.html',
  styleUrls: ['./insta-contact.component.less'],
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass,
    NgFor,
    NgIf,
    NgStyle,
    NzAvatarModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzListModule,
    NzStatisticModule,
    ReactiveFormsModule,
    TitleBarComponent,
  ]
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

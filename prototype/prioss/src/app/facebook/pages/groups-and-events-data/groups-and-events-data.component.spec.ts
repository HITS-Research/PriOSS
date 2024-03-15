import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAndEventsDataComponent } from './groups-and-events-data.component';

describe('GroupsAndEventsDataComponent', () => {
  let component: GroupsAndEventsDataComponent;
  let fixture: ComponentFixture<GroupsAndEventsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsAndEventsDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsAndEventsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

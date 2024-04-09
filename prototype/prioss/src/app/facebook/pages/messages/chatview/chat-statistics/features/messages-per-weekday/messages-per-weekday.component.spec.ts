import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesPerWeekdayComponent } from './messages-per-weekday.component';

describe('MessagesPerWeekdayComponent', () => {
  let component: MessagesPerWeekdayComponent;
  let fixture: ComponentFixture<MessagesPerWeekdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesPerWeekdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesPerWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesPerDayChartComponent } from './messages-per-day-chart.component';

describe('MessagesPerDayChartComponent', () => {
  let component: MessagesPerDayChartComponent;
  let fixture: ComponentFixture<MessagesPerDayChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesPerDayChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesPerDayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

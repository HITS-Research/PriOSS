import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageDistributionChartComponent } from './chat-message-distribution-chart.component';

describe('ChatMessageDistributionChartComponent', () => {
  let component: ChatMessageDistributionChartComponent;
  let fixture: ComponentFixture<ChatMessageDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageDistributionChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatMessageDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

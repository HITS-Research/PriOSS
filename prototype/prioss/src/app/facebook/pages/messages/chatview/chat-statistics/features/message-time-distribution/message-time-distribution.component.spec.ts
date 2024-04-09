import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTimeDistributionComponent } from './message-time-distribution.component';

describe('MessageTimeDistributionComponent', () => {
  let component: MessageTimeDistributionComponent;
  let fixture: ComponentFixture<MessageTimeDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTimeDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageTimeDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

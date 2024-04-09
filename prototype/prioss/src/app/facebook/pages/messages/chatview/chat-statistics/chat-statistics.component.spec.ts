import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStatisticsComponent } from './chat-statistics.component';

describe('ChatStatisticsComponent', () => {
  let component: ChatStatisticsComponent;
  let fixture: ComponentFixture<ChatStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

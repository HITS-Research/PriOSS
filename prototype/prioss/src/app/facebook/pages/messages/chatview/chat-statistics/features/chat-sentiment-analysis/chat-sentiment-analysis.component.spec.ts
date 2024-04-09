import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSentimentAnalysisComponent } from './chat-sentiment-analysis.component';

describe('ChatSentimentAnalysisComponent', () => {
  let component: ChatSentimentAnalysisComponent;
  let fixture: ComponentFixture<ChatSentimentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSentimentAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatSentimentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

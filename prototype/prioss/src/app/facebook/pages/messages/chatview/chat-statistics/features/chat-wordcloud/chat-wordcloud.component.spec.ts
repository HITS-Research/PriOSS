import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWordcloudComponent } from './chat-wordcloud.component';
import { ChatMessage } from '../../../chatdata.type';

describe('ChatWordcloudComponent', () => {
  let component: ChatWordcloudComponent;
  let fixture: ComponentFixture<ChatWordcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWordcloudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatWordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('ChatWordcloudComponent', () => {
  let component: ChatWordcloudComponent;

  beforeEach(() => {
    component = new ChatWordcloudComponent();
  });

  describe('computeConversations', () => {
    it('should return an empty array if no messages are provided', () => {
      const result = component.computeConversations([]);
      expect(result).toEqual([]);
    });

    it('should split messages into conversations based on the timeframe', () => {
      const messages: ChatMessage[] = [
        { timestamp: 1000, sender: '', content: '' },
        { timestamp: 2000, sender: '', content: '' },
        { timestamp: 30000000, sender: '', content: '' },
        { timestamp: 30000003, sender: '', content: '' },
      ];
    
      const result = component.computeConversations(messages);
    
      expect(result).toEqual([
        [messages[0], messages[1]],
        [messages[2], messages[3]],
      ]);
    });

    it('should not split conversations if the timeframe is not exceeded', () => {
      const messages = [
        { timestamp: 1000, sender: '', content: '' },
        { timestamp: 2000, sender: '', content: '' },
        { timestamp: 2500, sender: '', content: '' },
        { timestamp: 3000, sender: '', content: '' },
      ];

      const result = component.computeConversations(messages);

      expect(result).toEqual([[messages[0], messages[1], messages[2], messages[3]]]);
    });

    it('should exclude conversations with less than 3 messages', () => {
      const messages = [
        { timestamp: 1000, sender: '', content: '' },
        { timestamp: 2000, sender: '', content: '' },
        { timestamp: 3000, sender: '', content: '' },
      ];
    
      const result = component.computeConversations(messages);
    
      expect(result).toEqual([]);
    });
  });
});
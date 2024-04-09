import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWordcloudComponent } from './chat-wordcloud.component';

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

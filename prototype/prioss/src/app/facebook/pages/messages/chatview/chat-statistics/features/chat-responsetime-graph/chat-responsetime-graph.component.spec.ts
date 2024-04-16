import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatResponsetimeGraphComponent } from './chat-responsetime-graph.component';

describe('ChatResponsetimeGraphComponent', () => {
  let component: ChatResponsetimeGraphComponent;
  let fixture: ComponentFixture<ChatResponsetimeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatResponsetimeGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatResponsetimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

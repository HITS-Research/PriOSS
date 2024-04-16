import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBarRaceComponent } from './chat-bar-race.component';

describe('ChatBarRaceComponent', () => {
  let component: ChatBarRaceComponent;
  let fixture: ComponentFixture<ChatBarRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBarRaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBarRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

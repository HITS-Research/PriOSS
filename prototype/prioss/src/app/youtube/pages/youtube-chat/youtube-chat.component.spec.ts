import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeChatComponent } from './youtube-chat.component';

describe('YoutubeChatComponent', () => {
  let component: YoutubeChatComponent;
  let fixture: ComponentFixture<YoutubeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

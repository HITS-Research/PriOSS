import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeChatViewComponent } from './youtube-chat-view.component';

describe('YoutubeChatViewComponent', () => {
  let component: YoutubeChatViewComponent;
  let fixture: ComponentFixture<YoutubeChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeChatViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

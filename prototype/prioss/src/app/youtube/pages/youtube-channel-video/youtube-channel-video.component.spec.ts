import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeChannelVideoComponent } from './youtube-channel-video.component';

describe('YoutubeChannelVideoComponent', () => {
  let component: YoutubeChannelVideoComponent;
  let fixture: ComponentFixture<YoutubeChannelVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeChannelVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeChannelVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

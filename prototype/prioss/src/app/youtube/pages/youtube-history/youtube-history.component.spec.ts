import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeHistoryComponent } from './youtube-history.component';

describe('YoutubeHistoryComponent', () => {
  let component: YoutubeHistoryComponent;
  let fixture: ComponentFixture<YoutubeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

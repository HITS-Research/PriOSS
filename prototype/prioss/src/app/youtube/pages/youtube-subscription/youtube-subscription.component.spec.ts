import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSubscriptionComponent } from './youtube-subscription.component';

describe('YoutubeSubscriptionComponent', () => {
  let component: YoutubeSubscriptionComponent;
  let fixture: ComponentFixture<YoutubeSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

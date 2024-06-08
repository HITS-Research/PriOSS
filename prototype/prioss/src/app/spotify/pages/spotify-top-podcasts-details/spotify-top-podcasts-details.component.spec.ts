import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTopPodcastsDetailsComponent } from './spotify-top-podcasts-details.component';

describe('SpotifyTopPodcastsDetailsComponent', () => {
  let component: SpotifyTopPodcastsDetailsComponent;
  let fixture: ComponentFixture<SpotifyTopPodcastsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyTopPodcastsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyTopPodcastsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

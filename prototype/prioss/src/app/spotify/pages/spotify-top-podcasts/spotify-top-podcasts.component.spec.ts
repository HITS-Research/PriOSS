import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTopPodcastsComponent } from './spotify-top-podcasts.component';

describe('SpotifyTopPodcastsComponent', () => {
  let component: SpotifyTopPodcastsComponent;
  let fixture: ComponentFixture<SpotifyTopPodcastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyTopPodcastsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyTopPodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTopSongArtistsComponent } from './spotify-top-song-artists.component';

describe('TopArtistsComponent', () => {
  let component: SpotifyTopSongArtistsComponent;
  let fixture: ComponentFixture<SpotifyTopSongArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyTopSongArtistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyTopSongArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyArtistHistoryComponent } from './spotify-artist-history.component';

describe('SpotifyArtistHistoryComponent', () => {
  let component: SpotifyArtistHistoryComponent;
  let fixture: ComponentFixture<SpotifyArtistHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyArtistHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyArtistHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

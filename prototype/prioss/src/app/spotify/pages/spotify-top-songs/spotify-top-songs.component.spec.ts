import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTopSongsComponent } from './spotify-top-songs.component';

describe('TopSongsComponent', () => {
  let component: SpotifyTopSongsComponent;
  let fixture: ComponentFixture<SpotifyTopSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyTopSongsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyTopSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

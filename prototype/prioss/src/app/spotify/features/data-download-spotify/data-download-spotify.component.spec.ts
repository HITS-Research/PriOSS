import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloadSpotifyComponent } from './data-download-spotify.component';

describe('DataDownloadSpotifyComponent', () => {
  let component: DataDownloadSpotifyComponent;
  let fixture: ComponentFixture<DataDownloadSpotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDownloadSpotifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDownloadSpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

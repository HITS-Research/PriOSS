import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyInferencesRawDataComponent } from './spotify-inferences-raw-data.component';

describe('SpotifyInferencesRawDataComponent', () => {
  let component: SpotifyInferencesRawDataComponent;
  let fixture: ComponentFixture<SpotifyInferencesRawDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyInferencesRawDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyInferencesRawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

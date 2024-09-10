import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPrivacyInformationComponent } from './spotify-privacy-information.component';

describe('SpotifyPrivacyInformationComponent', () => {
  let component: SpotifyPrivacyInformationComponent;
  let fixture: ComponentFixture<SpotifyPrivacyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyPrivacyInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyPrivacyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

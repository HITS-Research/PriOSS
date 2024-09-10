import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyInferencesInterpretationComponent } from './spotify-inferences-interpretation.component';

describe('SpotifyInferencesInterpretationComponent', () => {
  let component: SpotifyInferencesInterpretationComponent;
  let fixture: ComponentFixture<SpotifyInferencesInterpretationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyInferencesInterpretationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotifyInferencesInterpretationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

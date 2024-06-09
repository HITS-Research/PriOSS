import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have general FAQs', () => {
    const compiled = fixture.nativeElement;
    const generalFAQs = compiled.querySelector('.accord_layout app-accordion[title="General FAQs"]');
    expect(generalFAQs).toBeTruthy();
  });

  it('should have Instagram FAQs', () => {
    const compiled = fixture.nativeElement;
    const instagramFAQs = compiled.querySelector('.accord_layout app-accordion[title="Instagram Related FAQs"]');
    expect(instagramFAQs).toBeTruthy();
  });

  it('should have Facebook FAQs', () => {
    const compiled = fixture.nativeElement;
    const facebookFAQs = compiled.querySelector('.accord_layout app-accordion[title="Facebook Related FAQs"]');
    expect(facebookFAQs).toBeTruthy();
  });

  it('should have Spotify FAQs', () => {
    const compiled = fixture.nativeElement;
    const spotifyFAQs = compiled.querySelector('.accord_layout app-accordion[title="Spotify Related FAQs"]');
    expect(spotifyFAQs).toBeTruthy();
  });
});

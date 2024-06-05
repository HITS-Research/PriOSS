import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkPatternsComponent } from './dark_patterns.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

describe('DarkPatternsComponent', () => {
  let component: DarkPatternsComponent;
  let fixture: ComponentFixture<DarkPatternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkPatternsComponent],
      imports: [NzIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkPatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Presence of Dark Patterns section', () => {
    const presenceOfDarkPatternsSection = fixture.nativeElement.querySelector('h3[nz-typography]');
    expect(presenceOfDarkPatternsSection.textContent).toContain('Presence of Dark Patterns:');
  });

  it('should display correct number of dark pattern items', () => {
    const darkPatternItems = fixture.nativeElement.querySelectorAll('.dark-pattern-item');
    expect(darkPatternItems.length).toEqual(9); // Update the number based on the number of dark patterns added
  });

  it('should have Popular Dark Pattern Types section', () => {
    const popularDarkPatternTypesSection = fixture.nativeElement.querySelector('h3[nz-typography]');
    expect(popularDarkPatternTypesSection.textContent).toContain('Popular Dark Pattern Types:');
  });

  it('should display stepper component', () => {
    const stepperComponent = fixture.nativeElement.querySelector('prioss-stepper');
    expect(stepperComponent).toBeTruthy();
  });
});

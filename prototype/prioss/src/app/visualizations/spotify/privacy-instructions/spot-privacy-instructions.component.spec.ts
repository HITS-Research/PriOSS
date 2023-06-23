import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotPrivacyInstructionsComponent } from './spot-privacy-instructions.component';

describe('PrivacyInstructionsComponent', () => {
  let component: SpotPrivacyInstructionsComponent;
  let fixture: ComponentFixture<SpotPrivacyInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotPrivacyInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotPrivacyInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

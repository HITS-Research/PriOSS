import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSettingsComponent } from './ads-settings.component';

describe('AdsSettingsComponent', () => {
  let component: AdsSettingsComponent;
  let fixture: ComponentFixture<AdsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdsSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

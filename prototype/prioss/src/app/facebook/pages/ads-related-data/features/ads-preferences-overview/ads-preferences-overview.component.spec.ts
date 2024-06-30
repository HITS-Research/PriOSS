import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPreferencesOverviewComponent } from './ads-preferences-overview.component';

describe('AdsPreferencesOverviewComponent', () => {
  let component: AdsPreferencesOverviewComponent;
  let fixture: ComponentFixture<AdsPreferencesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsPreferencesOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdsPreferencesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

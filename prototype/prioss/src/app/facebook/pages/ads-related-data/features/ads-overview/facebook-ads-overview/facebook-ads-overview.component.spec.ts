import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAdsOverviewComponent } from './facebook-ads-overview.component';

describe('FacebookAdsOverviewComponent', () => {
  let component: FacebookAdsOverviewComponent;
  let fixture: ComponentFixture<FacebookAdsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookAdsOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacebookAdsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

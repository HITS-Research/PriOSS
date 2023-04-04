import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaAdsComponent } from './insta-ads.component';

describe('InstaAdsComponent', () => {
  let component: InstaAdsComponent;
  let fixture: ComponentFixture<InstaAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaAdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

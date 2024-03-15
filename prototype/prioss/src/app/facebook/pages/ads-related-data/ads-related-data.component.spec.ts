import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsRelatedDataComponent } from './ads-related-data.component';

describe('AdsRelatedDataComponent', () => {
  let component: AdsRelatedDataComponent;
  let fixture: ComponentFixture<AdsRelatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdsRelatedDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdsRelatedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

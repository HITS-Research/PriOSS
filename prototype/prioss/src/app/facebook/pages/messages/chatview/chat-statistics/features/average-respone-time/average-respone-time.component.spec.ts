import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageResponeTimeComponent } from './average-respone-time.component';

describe('AverageResponeTimeComponent', () => {
  let component: AverageResponeTimeComponent;
  let fixture: ComponentFixture<AverageResponeTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageResponeTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageResponeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

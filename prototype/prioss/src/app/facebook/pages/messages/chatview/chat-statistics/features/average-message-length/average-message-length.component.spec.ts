import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMessageLengthComponent } from './average-message-length.component';

describe('AverageMessageLengthComponent', () => {
  let component: AverageMessageLengthComponent;
  let fixture: ComponentFixture<AverageMessageLengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageMessageLengthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageMessageLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

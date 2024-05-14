import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsFrequencyComponent } from './reactions-frequency.component';

describe('ReactionsFrequencyComponent', () => {
  let component: ReactionsFrequencyComponent;
  let fixture: ComponentFixture<ReactionsFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactionsFrequencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactionsFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

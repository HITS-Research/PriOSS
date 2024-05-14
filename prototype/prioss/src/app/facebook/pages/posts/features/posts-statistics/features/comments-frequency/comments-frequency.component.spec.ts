import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsFrequencyComponent } from './comments-frequency.component';

describe('CommentsFrequencyComponent', () => {
  let component: CommentsFrequencyComponent;
  let fixture: ComponentFixture<CommentsFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsFrequencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

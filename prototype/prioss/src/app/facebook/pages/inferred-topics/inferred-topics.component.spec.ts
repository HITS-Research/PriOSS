import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InferredTopicsComponent } from './inferred-topics.component';

describe('InferredTopicsComponent', () => {
  let component: InferredTopicsComponent;
  let fixture: ComponentFixture<InferredTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InferredTopicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InferredTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

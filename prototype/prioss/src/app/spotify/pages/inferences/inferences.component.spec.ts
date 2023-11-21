import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InferencesComponent } from './inferences.component';

describe('InferencesComponent', () => {
  let component: InferencesComponent;
  let fixture: ComponentFixture<InferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

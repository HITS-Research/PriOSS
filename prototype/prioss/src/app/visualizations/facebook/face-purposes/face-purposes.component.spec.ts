import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacePurposesComponent } from './face-purposes.component';

describe('FacePurposesComponent', () => {
  let component: FacePurposesComponent;
  let fixture: ComponentFixture<FacePurposesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacePurposesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacePurposesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

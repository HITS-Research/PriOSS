import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPurposesComponent } from './insta-purposes.component';

describe('InstaPurposesComponent', () => {
  let component: InstaPurposesComponent;
  let fixture: ComponentFixture<InstaPurposesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaPurposesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaPurposesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposesComponent } from './purposes.component';

describe('PurposesComponent', () => {
  let component: PurposesComponent;
  let fixture: ComponentFixture<PurposesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurposesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurposesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

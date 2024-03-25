import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPersonalInfoComponent } from './other-personal-info.component';

describe('OtherPersonalInfoComponent', () => {
  let component: OtherPersonalInfoComponent;
  let fixture: ComponentFixture<OtherPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherPersonalInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

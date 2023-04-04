import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insta_PersonalInfoComponent } from './personal-info.component';

describe('PersonalInfoComponent', () => {
  let component: Insta_PersonalInfoComponent;
  let fixture: ComponentFixture<Insta_PersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Insta_PersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Insta_PersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaAccountCreationLoginComponent } from './insta-account-creation-login.component';

describe('InstaAccountCreationLoginComponent', () => {
  let component: InstaAccountCreationLoginComponent;
  let fixture: ComponentFixture<InstaAccountCreationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaAccountCreationLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaAccountCreationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

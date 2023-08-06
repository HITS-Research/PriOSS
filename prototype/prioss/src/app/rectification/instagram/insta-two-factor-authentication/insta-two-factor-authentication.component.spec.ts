import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaTwoFactorAuthenticationComponent } from './insta-two-factor-authentication.component';

describe('InstaTwoFactorAuthenticationComponent', () => {
  let component: InstaTwoFactorAuthenticationComponent;
  let fixture: ComponentFixture<InstaTwoFactorAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaTwoFactorAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaTwoFactorAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

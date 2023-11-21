import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLoginDataComponent } from './security-login-data.component';

describe('SecurityLoginDataComponent', () => {
  let component: SecurityLoginDataComponent;
  let fixture: ComponentFixture<SecurityLoginDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityLoginDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityLoginDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

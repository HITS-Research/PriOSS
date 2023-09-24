import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaDisableCookiesComponent } from './insta-disable-cookies.component';

describe('InstaDisableCookiesComponent', () => {
  let component: InstaDisableCookiesComponent;
  let fixture: ComponentFixture<InstaDisableCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaDisableCookiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaDisableCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

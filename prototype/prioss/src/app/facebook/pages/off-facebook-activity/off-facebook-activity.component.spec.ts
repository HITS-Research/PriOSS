import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffFacebookActivityComponent } from './off-facebook-activity.component';

describe('OffFacebookActivityComponent', () => {
  let component: OffFacebookActivityComponent;
  let fixture: ComponentFixture<OffFacebookActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffFacebookActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffFacebookActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

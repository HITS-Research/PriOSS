import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaProfileInfoPrivateComponent } from './insta-profile-info-private.component';

describe('InstaProfileInfoPrivateComponent', () => {
  let component: InstaProfileInfoPrivateComponent;
  let fixture: ComponentFixture<InstaProfileInfoPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaProfileInfoPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaProfileInfoPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

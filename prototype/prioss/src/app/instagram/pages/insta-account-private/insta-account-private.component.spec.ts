import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaAccountPrivateComponent } from './insta-account-private.component';

describe('InstaAccountPrivateComponent', () => {
  let component: InstaAccountPrivateComponent;
  let fixture: ComponentFixture<InstaAccountPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaAccountPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaAccountPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

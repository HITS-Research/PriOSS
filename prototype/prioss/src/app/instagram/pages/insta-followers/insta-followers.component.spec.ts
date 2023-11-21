import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaFollowersComponent } from './insta-followers.component';

describe('InstaFollowersComponent', () => {
  let component: InstaFollowersComponent;
  let fixture: ComponentFixture<InstaFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaFollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

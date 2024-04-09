import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFriendsFollowingOverTimeComponent } from './facebook-friends-following-over-time.component';

describe('FacebookFriendsFollowingOverTimeComponent', () => {
  let component: FacebookFriendsFollowingOverTimeComponent;
  let fixture: ComponentFixture<FacebookFriendsFollowingOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFriendsFollowingOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacebookFriendsFollowingOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

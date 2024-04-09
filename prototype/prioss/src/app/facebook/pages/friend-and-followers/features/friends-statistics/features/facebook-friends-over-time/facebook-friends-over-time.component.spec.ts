import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFriendsOverTimeComponent } from './facebook-friends-over-time.component';

describe('FacebookFriendsOverTimeComponent', () => {
  let component: FacebookFriendsOverTimeComponent;
  let fixture: ComponentFixture<FacebookFriendsOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFriendsOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacebookFriendsOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

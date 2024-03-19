import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendAndFollowersComponent } from './friend-and-followers.component';

describe('FriendAndFollowersComponent', () => {
  let component: FriendAndFollowersComponent;
  let fixture: ComponentFixture<FriendAndFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendAndFollowersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendAndFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

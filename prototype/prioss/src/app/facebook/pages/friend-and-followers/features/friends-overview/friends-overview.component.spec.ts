import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFriendsOverviewComponent } from './friends-overview.component';

describe('FriendsOverviewComponent', () => {
  let component: FacebookFriendsOverviewComponent;
  let fixture: ComponentFixture<FacebookFriendsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFriendsOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacebookFriendsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

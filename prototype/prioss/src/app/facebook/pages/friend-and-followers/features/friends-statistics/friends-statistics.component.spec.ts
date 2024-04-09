import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFriendsStatisticsComponent } from './friends-statistics.component';

describe('FriendsStatisticsComponent', () => {
  let component: FacebookFriendsStatisticsComponent;
  let fixture: ComponentFixture<FacebookFriendsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFriendsStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacebookFriendsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

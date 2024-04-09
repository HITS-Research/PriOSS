import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFriendsGeneralInfoComponent } from './facebook-friends-general-info.component';

describe('FacebookFriendsGeneralInfoComponent', () => {
  let component: FacebookFriendsGeneralInfoComponent;
  let fixture: ComponentFixture<FacebookFriendsGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFriendsGeneralInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacebookFriendsGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

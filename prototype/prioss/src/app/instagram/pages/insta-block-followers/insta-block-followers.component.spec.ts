import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaBlockFollowersComponent } from './insta-block-followers.component';

describe('InstaBlockFollowersComponent', () => {
  let component: InstaBlockFollowersComponent;
  let fixture: ComponentFixture<InstaBlockFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaBlockFollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaBlockFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

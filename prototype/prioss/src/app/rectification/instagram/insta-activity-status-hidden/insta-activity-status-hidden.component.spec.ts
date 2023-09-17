import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaActivityStatusHiddenComponent } from './insta-activity-status-hidden.component';

describe('InstaActivityStatusHiddenComponent', () => {
  let component: InstaActivityStatusHiddenComponent;
  let fixture: ComponentFixture<InstaActivityStatusHiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaActivityStatusHiddenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaActivityStatusHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

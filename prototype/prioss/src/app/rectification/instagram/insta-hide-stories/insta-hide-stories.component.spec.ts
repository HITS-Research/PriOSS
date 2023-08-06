import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaHideStoriesComponent } from './insta-hide-stories.component';

describe('InstaHideStoriesComponent', () => {
  let component: InstaHideStoriesComponent;
  let fixture: ComponentFixture<InstaHideStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaHideStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaHideStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

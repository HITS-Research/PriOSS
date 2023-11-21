import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaLikedContentComponent } from './insta-liked-content.component';

describe('InstaLikedContentComponent', () => {
  let component: InstaLikedContentComponent;
  let fixture: ComponentFixture<InstaLikedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaLikedContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaLikedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

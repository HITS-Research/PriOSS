import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaYourTopicComponent } from './insta-your-topic.component';

describe('InstaYourTopicComponent', () => {
  let component: InstaYourTopicComponent;
  let fixture: ComponentFixture<InstaYourTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaYourTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaYourTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaMessagesComponent } from './insta-messages.component';

describe('InstaMessagesComponent', () => {
  let component: InstaMessagesComponent;
  let fixture: ComponentFixture<InstaMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

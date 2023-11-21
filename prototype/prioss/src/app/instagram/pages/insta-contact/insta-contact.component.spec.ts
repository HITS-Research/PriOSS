import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaContactComponent } from './insta-contact.component';

describe('InstaContactComponent', () => {
  let component: InstaContactComponent;
  let fixture: ComponentFixture<InstaContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

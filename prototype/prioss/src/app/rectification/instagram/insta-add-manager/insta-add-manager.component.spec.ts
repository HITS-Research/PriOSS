import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaAddManagerComponent } from './insta-add-manager.component';

describe('InstaAddManagerComponent', () => {
  let component: InstaAddManagerComponent;
  let fixture: ComponentFixture<InstaAddManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaAddManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaAddManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

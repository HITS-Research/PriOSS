import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaShoppingComponent } from './insta-shopping.component';

describe('InstaShoppingComponent', () => {
  let component: InstaShoppingComponent;
  let fixture: ComponentFixture<InstaShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

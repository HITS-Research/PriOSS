import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourTopicsComponent } from './your-topics.component';

describe('YourTopicsComponent', () => {
  let component: YourTopicsComponent;
  let fixture: ComponentFixture<YourTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

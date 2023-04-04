import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaDashboardComponent } from './insta-dashboard.component';

describe('InstaDashboardComponent', () => {
  let component: InstaDashboardComponent;
  let fixture: ComponentFixture<InstaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDashboardComponent } from './spot-dashboard.component';

describe('SpotDashboardComponent', () => {
  let component: SpotDashboardComponent;
  let fixture: ComponentFixture<SpotDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

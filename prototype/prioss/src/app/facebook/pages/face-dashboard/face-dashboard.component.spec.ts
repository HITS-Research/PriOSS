import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from 'src/app/accordion/accordion.component';
import { FaceDashboardComponent } from './face-dashboard.component';

describe('FaceDashboardComponent', () => {
  let component: FaceDashboardComponent;
  let fixture: ComponentFixture<FaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceDashboardComponent, AccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

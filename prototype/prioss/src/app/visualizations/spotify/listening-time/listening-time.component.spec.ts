import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningTimeComponent } from './listening-time.component';

describe('ListeningTimeComponent', () => {
  let component: ListeningTimeComponent;
  let fixture: ComponentFixture<ListeningTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeningTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeningTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongtimelineComponent } from './songtimeline.component';

describe('SongtimelineComponent', () => {
  let component: SongtimelineComponent;
  let fixture: ComponentFixture<SongtimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongtimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

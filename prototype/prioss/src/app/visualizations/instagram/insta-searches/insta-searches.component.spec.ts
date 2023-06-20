import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaSearchesComponent } from './insta-searches.component';

describe('InstaSearchesComponent', () => {
  let component: InstaSearchesComponent;
  let fixture: ComponentFixture<InstaSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaSearchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

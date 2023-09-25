import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InferencesMailComponent } from './inferences-mail.component';

describe('InferencesMailComponent', () => {
  let component: InferencesMailComponent;
  let fixture: ComponentFixture<InferencesMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InferencesMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InferencesMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

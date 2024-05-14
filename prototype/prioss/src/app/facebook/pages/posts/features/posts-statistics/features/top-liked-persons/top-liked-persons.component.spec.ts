import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikedPersonsComponent } from './top-liked-persons.component';

describe('TopLikedPersonsComponent', () => {
  let component: TopLikedPersonsComponent;
  let fixture: ComponentFixture<TopLikedPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLikedPersonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLikedPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsInGroupsComponent } from './comments-in-groups.component';

describe('CommentsInGroupsComponent', () => {
  let component: CommentsInGroupsComponent;
  let fixture: ComponentFixture<CommentsInGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsInGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsInGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

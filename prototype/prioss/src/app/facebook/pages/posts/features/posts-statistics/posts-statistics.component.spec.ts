import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsStatisticsComponent } from './posts-statistics.component';

describe('PostsStatisticsComponent', () => {
  let component: PostsStatisticsComponent;
  let fixture: ComponentFixture<PostsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

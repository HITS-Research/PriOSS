import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeDashboardComponent } from './youtube-dashboard.component';

describe('YoutubeDashboardComponent', () => {
  let component: YoutubeDashboardComponent;
  let fixture: ComponentFixture<YoutubeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

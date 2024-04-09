import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySongHistoryComponent } from './spotify-song-history.component';

describe('SpotifySongHistoryComponent', () => {
  let component: SpotifySongHistoryComponent;
  let fixture: ComponentFixture<SpotifySongHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifySongHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifySongHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

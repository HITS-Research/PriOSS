import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySearchHistoryComponent } from './spotify-search-history.component';

describe('SpotifySearchHistoryComponent', () => {
  let component: SpotifySearchHistoryComponent;
  let fixture: ComponentFixture<SpotifySearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifySearchHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifySearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

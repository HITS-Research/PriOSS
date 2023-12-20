import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyUserDataComponent } from './spotify-user-data.component';

describe('SpotifyUserDataComponent', () => {
  let component: SpotifyUserDataComponent;
  let fixture: ComponentFixture<SpotifyUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyUserDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

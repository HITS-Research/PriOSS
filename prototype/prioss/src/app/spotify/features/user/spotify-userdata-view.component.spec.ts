import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyUserdataViewComponent } from './spotify-userdata-view.component';

describe('SpotifyUserdataViewComponent', () => {
  let component: SpotifyUserdataViewComponent;
  let fixture: ComponentFixture<SpotifyUserdataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyUserdataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyUserdataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

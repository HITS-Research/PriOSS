import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTileComponent } from './preview-tile.component';

describe('PreviewTileComponent', () => {
  let component: PreviewTileComponent;
  let fixture: ComponentFixture<PreviewTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

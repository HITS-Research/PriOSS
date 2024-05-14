import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbTopLikedPagesComponent } from './fb-top-liked-pages.component';

describe('FbTopLikedPagesComponent', () => {
  let component: FbTopLikedPagesComponent;
  let fixture: ComponentFixture<FbTopLikedPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbTopLikedPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FbTopLikedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

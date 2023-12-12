import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloadInstagramComponent } from './data-download-instagram.component';

describe('DataDownloadInstagramComponent', () => {
  let component: DataDownloadInstagramComponent;
  let fixture: ComponentFixture<DataDownloadInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDownloadInstagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDownloadInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

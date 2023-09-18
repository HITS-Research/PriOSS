import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloadInstructionsComponent } from './data-download-instructions.component';

describe('DataDownloadInstructionsComponent', () => {
  let component: DataDownloadInstructionsComponent;
  let fixture: ComponentFixture<DataDownloadInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDownloadInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDownloadInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

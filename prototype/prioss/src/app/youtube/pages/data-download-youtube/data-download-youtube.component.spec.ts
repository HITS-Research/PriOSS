import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloadYoutubeComponent } from './data-download-youtube.component';

describe('DataDownloadYoutubeComponent', () => {
  let component: DataDownloadYoutubeComponent;
  let fixture: ComponentFixture<DataDownloadYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDownloadYoutubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDownloadYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

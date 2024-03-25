import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloadFacebookComponent } from './data-download-facebook.component';

describe('DataDownloadFacebookComponent', () => {
  let component: DataDownloadFacebookComponent;
  let fixture: ComponentFixture<DataDownloadFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDownloadFacebookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDownloadFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

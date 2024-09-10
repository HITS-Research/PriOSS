import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatusIconComponent } from './network-status-icon.component';

describe('NetworkStatusIconComponent', () => {
  let component: NetworkStatusIconComponent;
  let fixture: ComponentFixture<NetworkStatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkStatusIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaChatViewComponent } from './insta-chat-view.component';

describe('InstaChatViewComponent', () => {
  let component: InstaChatViewComponent;
  let fixture: ComponentFixture<InstaChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstaChatViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstaChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

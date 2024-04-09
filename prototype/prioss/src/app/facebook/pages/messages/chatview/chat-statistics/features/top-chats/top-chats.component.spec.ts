import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopChatsComponent } from './top-chats.component';

describe('TopChatsComponent', () => {
  let component: TopChatsComponent;
  let fixture: ComponentFixture<TopChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopChatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

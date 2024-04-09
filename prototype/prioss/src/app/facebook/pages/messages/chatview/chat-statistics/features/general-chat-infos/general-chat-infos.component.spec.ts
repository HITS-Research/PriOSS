import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralChatInfosComponent } from './general-chat-infos.component';

describe('GeneralChatInfosComponent', () => {
  let component: GeneralChatInfosComponent;
  let fixture: ComponentFixture<GeneralChatInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralChatInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralChatInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

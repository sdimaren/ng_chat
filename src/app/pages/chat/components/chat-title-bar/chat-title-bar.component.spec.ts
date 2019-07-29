import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTitleBarComponent } from './chat-title-bar.component';

describe('ChatTitleBarComponent', () => {
  let component: ChatTitleBarComponent;
  let fixture: ComponentFixture<ChatTitleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTitleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDevComponent } from './feedback-dev.component';

describe('FeedbackDevComponent', () => {
  let component: FeedbackDevComponent;
  let fixture: ComponentFixture<FeedbackDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

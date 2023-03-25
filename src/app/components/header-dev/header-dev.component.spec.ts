import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDevComponent } from './header-dev.component';

describe('HeaderDevComponent', () => {
  let component: HeaderDevComponent;
  let fixture: ComponentFixture<HeaderDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

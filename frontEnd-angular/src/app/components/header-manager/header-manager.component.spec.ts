import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderManagerComponent } from './header-manager.component';

describe('HeaderManagerComponent', () => {
  let component: HeaderManagerComponent;
  let fixture: ComponentFixture<HeaderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevInterfaceComponent } from './dev-interface.component';

describe('DevInterfaceComponent', () => {
  let component: DevInterfaceComponent;
  let fixture: ComponentFixture<DevInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

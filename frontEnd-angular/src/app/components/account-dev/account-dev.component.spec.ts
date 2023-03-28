import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDevComponent } from './account-dev.component';

describe('AccountDevComponent', () => {
  let component: AccountDevComponent;
  let fixture: ComponentFixture<AccountDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

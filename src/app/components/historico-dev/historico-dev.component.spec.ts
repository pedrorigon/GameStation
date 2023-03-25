import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDevComponent } from './historico-dev.component';

describe('HistoricoDevComponent', () => {
  let component: HistoricoDevComponent;
  let fixture: ComponentFixture<HistoricoDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

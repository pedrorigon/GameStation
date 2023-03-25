import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoManagerComponent } from './historico-manager.component';

describe('HistoricoManagerComponent', () => {
  let component: HistoricoManagerComponent;
  let fixture: ComponentFixture<HistoricoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

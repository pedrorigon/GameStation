import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesExchangeComponent } from './games-exchange.component';

describe('GamesExchangeComponent', () => {
  let component: GamesExchangeComponent;
  let fixture: ComponentFixture<GamesExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesExchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

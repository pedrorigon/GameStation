import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsExchangeComponent } from './game-details-exchange.component';

describe('GameDetailsExchangeComponent', () => {
  let component: GameDetailsExchangeComponent;
  let fixture: ComponentFixture<GameDetailsExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsExchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

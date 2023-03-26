import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsOfferComponent } from './game-details-offer.component';

describe('GameDetailsOfferComponent', () => {
  let component: GameDetailsOfferComponent;
  let fixture: ComponentFixture<GameDetailsOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

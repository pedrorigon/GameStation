import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsDevComponent } from './game-details-dev.component';

describe('GameDetailsDevComponent', () => {
  let component: GameDetailsDevComponent;
  let fixture: ComponentFixture<GameDetailsDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

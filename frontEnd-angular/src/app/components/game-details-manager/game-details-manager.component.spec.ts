import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsManagerComponent } from './game-details-manager.component';

describe('GameDetailsManagerComponent', () => {
  let component: GameDetailsManagerComponent;
  let fixture: ComponentFixture<GameDetailsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

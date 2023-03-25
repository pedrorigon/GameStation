import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsLibraryComponent } from './game-details-library.component';

describe('GameDetailsLibraryComponent', () => {
  let component: GameDetailsLibraryComponent;
  let fixture: ComponentFixture<GameDetailsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

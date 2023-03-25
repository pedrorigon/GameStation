import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesDevComponent } from './games-dev.component';

describe('GamesDevComponent', () => {
  let component: GamesDevComponent;
  let fixture: ComponentFixture<GamesDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

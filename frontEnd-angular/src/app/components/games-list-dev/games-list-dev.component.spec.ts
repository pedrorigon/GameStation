import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListDevComponent } from './games-list-dev.component';

describe('GamesListDevComponent', () => {
  let component: GamesListDevComponent;
  let fixture: ComponentFixture<GamesListDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesListDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesListDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

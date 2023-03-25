import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesManagerComponent } from './games-manager.component';

describe('GamesManagerComponent', () => {
  let component: GamesManagerComponent;
  let fixture: ComponentFixture<GamesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

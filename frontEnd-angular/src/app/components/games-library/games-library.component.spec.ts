import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesLibraryComponent } from './games-library.component';

describe('GamesLibraryComponent', () => {
  let component: GamesLibraryComponent;
  let fixture: ComponentFixture<GamesLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesOfferComponent } from './games-offer.component';

describe('GamesOfferComponent', () => {
  let component: GamesOfferComponent;
  let fixture: ComponentFixture<GamesOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

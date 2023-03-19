import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {

  // carregar lista de jogos para venda do banco de dados
  GamesOffer = ["game1", "game2", "game3"];

  constructor() { }
}

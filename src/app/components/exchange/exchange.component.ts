import { Component } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {

  // carregar lista de jogos para venda do banco de dados
  GamesExchange = ["game1", "game2", "game3"];

  constructor() { }

}

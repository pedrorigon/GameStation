import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  // carregar lista de jogos para venda do banco de dados
  GamesStore = ["game1", "game2", "game3"];

  constructor() { }

}

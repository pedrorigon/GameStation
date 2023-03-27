import { Component } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-list-dev',
  templateUrl: './games-list-dev.component.html',
  styleUrls: ['./games-list-dev.component.css']
})
export class GamesListDevComponent {

  GamesDev: Games[] = [
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "id": 2,
      "link_imagens": "link imagem do jogo 2",
      "nome": "nome jogo 2",
      "preco": 90.90,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
  ];
}

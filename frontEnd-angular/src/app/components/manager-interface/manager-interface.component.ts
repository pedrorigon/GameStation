import { Component } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-manager-interface',
  templateUrl: './manager-interface.component.html',
  styleUrls: ['./manager-interface.component.css']
})
export class ManagerInterfaceComponent {
  JogosPendentes: Games[] = [
    {
      "id": 10,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "id": 20,
      "link_imagens": "link imagem do jogo 2",
      "nome": "nome jogo 2",
      "preco": 90.90,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "id": 30,
      "link_imagens": "link imagem do jogo 3",
      "nome": "nome jogo 3",
      "preco": 50.00,
      "descricao": "descricao",
      "avaliacao": 8,
      "tags": ["puzzle"]
    },
    {
      "id": 40,
      "link_imagens": "link imagem do jogo 4",
      "nome": "nome jogo 4",
      "preco": 70.00,
      "avaliacao": 7,
      "descricao": "descricao",
      "tags": ["adventure"]
    },
  ];

  constructor() { }


}

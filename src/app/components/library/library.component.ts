import { Component } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  GamesLibrary: Games[] = [
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    },
    {
      "id": 2,
      "link_imagens": "link imagem do jogo 2",
      "nome": "nome jogo 2",
      "preco": 90.90
    },
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    },
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    },
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    },
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    },
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    },
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00
    }
  ]

  constructor() {

  }
}

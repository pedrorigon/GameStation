import { Component } from '@angular/core';
import { JogoPendente } from 'src/app/model/jogo-pendente.model';
import { Historico } from 'src/app/model/historico.model';

@Component({
  selector: 'app-manager-interface',
  templateUrl: './manager-interface.component.html',
  styleUrls: ['./manager-interface.component.css']
})
export class ManagerInterfaceComponent {
  JogosPendentes: JogoPendente[] = [
    {
      "id": 10,
      "rank_dev": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "rank_dev": 10,
      "id": 20,
      "link_imagens": "link imagem do jogo 2",
      "nome": "nome jogo 2",
      "preco": 90.90,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "rank_dev": 2,
      "id": 30,
      "link_imagens": "link imagem do jogo 3",
      "nome": "nome jogo 3",
      "preco": 50.00,
      "descricao": "descricao",
      "avaliacao": 8,
      "tags": ["puzzle"]
    },
  ];

  ManagerHistorico: Historico[] = [
    {
      "id_usuario": 15,
      "id_transacao": 10,
      "id_usuario_participou": 1,
      "id_chave": 101,
      "valor": 100,
      "tipo": "srting",
      "direcao": "string",
      "data": 25,
    },
  ];

  constructor() { }


}

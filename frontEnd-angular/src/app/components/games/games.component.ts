import { Component, OnInit, Input } from '@angular/core';
import { GameServiceService } from 'src/app/game-service.service';
import { GameInLibrary } from 'src/app/model/biblio.model';


interface Game {
  id_jogo: number;
  nome: string;
  descricao: string;
  preco: number;
  link_imagens: string;
  avaliacao: number;
  tags: string[];
}


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  @Input() game!: Game;
  gameToOffer: GameInLibrary = {} as GameInLibrary;

  showDetails = false;

  verDetails() {
    this.showDetails = true;
    console.log(this.showDetails);
  }

  semDetails() {
    this.showDetails = false;
  }

  ngOnInit() {
    // console.log(this.game)
  }

  comprarJogo() {
    console.log(this.game.id_jogo);
    let success = false;

    fetch("http://127.0.0.1:8000/comprar_jogo/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_jogo: this.game.id_jogo,
      })

      //VER COMO CONCLUIR A PARTIR DAQUI
      //OU SE PRECISA ADICIONAR MAIS ALGUMA COISA

    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, string | null]) =>
            data[0] ? (success = true) :
              console.log(`Login falhou, motivo: ${data[1]}`)
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Erro na requisição')
    );
    // return success;
  }
}



import { Component, OnInit, Input } from '@angular/core';
import { GameServiceService } from 'src/app/game-service.service';
import { Games } from 'src/app/model/games.model';
import { GameInLibrary } from 'src/app/model/biblio.model';



@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  @Input() game!: Games;

  showDetails = false;

  verDetails() {
    this.showDetails = true;
    console.log(this.showDetails);
    console.log(this.game.avaliacao)
  }

  semDetails() {
    this.showDetails = false;
  }

  ngOnInit() {
    // console.log(this.game)
  }

  comprarJogo() {
    console.log(this.game.id);
    let success = false;

    fetch("http://127.0.0.1:8000/comprar_jogo/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_jogo: this.game.id,
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



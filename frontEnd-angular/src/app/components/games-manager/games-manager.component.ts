import { Component, OnInit, Input } from '@angular/core';
import { JogoGamesManager } from 'src/app/model/jogo-games-manager.model';

@Component({
  selector: 'app-games-manager',
  templateUrl: './games-manager.component.html',
  styleUrls: ['./games-manager.component.css']
})
export class GamesManagerComponent implements OnInit {

  @Input() game!: JogoGamesManager

  showDetails = false;

  verDetails() {
    this.showDetails = true;
    console.log(this.showDetails);
  }

  semDetails() {
    this.showDetails = false;
  }

  ngOnInit() {

  }

  aprovarJogo() {
    console.log(this.game);
    let success = false;

    fetch("http://127.0.0.1:8000/validar_jogo/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_jogo: this.game.id_jogo
      })
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
  }

  recusarJogo() {
    console.log(this.game);
    let success = false;

    fetch("http://127.0.0.1:8000/validar_jogo/", {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_jogo: this.game.id_jogo, justificativa: 'aa'
      })
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
  }

}
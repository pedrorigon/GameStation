import { Component, OnInit, Input } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-dev',
  templateUrl: './games-dev.component.html',
  styleUrls: ['./games-dev.component.css']
})
export class GamesDevComponent {

  @Input() game!: Games

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

  removerJogo() {
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
        id_jogo: this.game.id, justificativa: ''
      })
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, string | null]) =>
            data[0] ? (success = true) :
              console.log(`motivo: ${data[1]}`)
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Erro na requisição')
    );
  }

}

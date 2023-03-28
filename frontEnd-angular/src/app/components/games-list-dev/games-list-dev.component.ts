import { Component } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-list-dev',
  templateUrl: './games-list-dev.component.html',
  styleUrls: ['./games-list-dev.component.css']
})
export class GamesListDevComponent {

  GamesDev: Games[] = []

  ngOnInit() {
    this.refreshGames();
  }

  refreshGames(): boolean {
    let result = false;

    fetch("http://127.0.0.1:8000/gerenciar_jogos/", {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, Games[] | string]) =>
            data[0] ? (
              this.GamesDev = data[1] as Games[], result = true
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

}

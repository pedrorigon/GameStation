import { Component, OnInit, Input } from '@angular/core';
import { Troca } from 'src/app/model/troca.model';

@Component({
  selector: 'app-games-exchange',
  templateUrl: './games-exchange.component.html',
  styleUrls: ['./games-exchange.component.css']
})
export class GamesExchangeComponent {

  @Input() troca!: Troca

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

  trocarJogo() {
    //implementar
  }

  removerTroca() {
    let result = false;

    //conferir se é /biblioteca mesmo!!!
    fetch("http://127.0.0.1:8000/trocas/", {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_troca: this.troca.id_troca
      })
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, null | string]) =>
            data[0] ? (
              console.log("Successfully removed offered game!")
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );
    return result;
  }
}

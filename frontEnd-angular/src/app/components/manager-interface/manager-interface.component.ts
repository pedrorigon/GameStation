import { Component } from '@angular/core';
import { JogoPendente } from 'src/app/model/jogo-pendente.model';
import { Historico } from 'src/app/model/historico.model';

@Component({
  selector: 'app-manager-interface',
  templateUrl: './manager-interface.component.html',
  styleUrls: ['./manager-interface.component.css']
})
export class ManagerInterfaceComponent {
  JogosPendentes: JogoPendente[] = [];

  ManagerHistorico: Historico[] = [];

  constructor() { }

  ngOnInit() {
    this.refreshGames();
  }

  refreshGames(): boolean {
    let result = false;

    fetch("http://127.0.0.1:8000/validar_jogo/", {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, JogoPendente[] | string]) =>
            data[0] ? (
              this.JogosPendentes = data[1] as JogoPendente[], result = true
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

}

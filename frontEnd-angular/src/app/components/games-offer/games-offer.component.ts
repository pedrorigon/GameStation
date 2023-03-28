import { Component, OnInit, Input } from '@angular/core';
import { Oferta } from 'src/app/model/oferta.model';

@Component({
  selector: 'app-games-offer',
  templateUrl: './games-offer.component.html',
  styleUrls: ['./games-offer.component.css']
})
export class GamesOfferComponent {

  @Input() oferta!: Oferta

  showDetails = false;

  verDetails() {
    this.showDetails = true;
    console.log(this.showDetails);
    console.log(this.oferta)
  }

  semDetails() {
    this.showDetails = false;
  }

  ngOnInit() {

  }

  comprarOferta() {

    console.log(this.oferta.id_oferta);
    let success = false;

    fetch("http://127.0.0.1:8000/comprar_oferta/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_oferta: this.oferta.id_oferta
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



  removerOferta() {

    let result = false;

    //conferir se é /biblioteca mesmo!!!
    fetch("http://127.0.0.1:8000/ofertas/", {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_oferta: this.oferta.id_oferta
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

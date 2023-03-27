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
  }

  semDetails() {
    this.showDetails = false;
  }

  ngOnInit() {

  }

  comprarOferta() {

    //implementar comprar_oferta

  }

  removerOferta() {

    //implementar deletar_oferta

  }

}

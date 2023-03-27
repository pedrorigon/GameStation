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
    //implementar
  }
}

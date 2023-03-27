import { Component, OnInit, Input } from '@angular/core';
import { JogoPendente } from 'src/app/model/jogo-pendente.model';

@Component({
  selector: 'app-games-manager',
  templateUrl: './games-manager.component.html',
  styleUrls: ['./games-manager.component.css']
})
export class GamesManagerComponent implements OnInit {

  @Input() game!: JogoPendente

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
    //IMPLEMENTAR AQUI
  }
  recusarJogo() {
    //IMPLEMENTAR AQUI
  }


}
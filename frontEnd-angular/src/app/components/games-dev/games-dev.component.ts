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
    //IMPLEMENTAR AQUI
    console.log(this.game);

  }

}

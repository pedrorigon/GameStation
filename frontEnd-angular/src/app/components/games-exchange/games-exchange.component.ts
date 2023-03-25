import { Component, OnInit, Input } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-exchange',
  templateUrl: './games-exchange.component.html',
  styleUrls: ['./games-exchange.component.css']
})
export class GamesExchangeComponent {
  @Input() games!: Games

  constructor() { }

  ngOnInit() {
  }
}

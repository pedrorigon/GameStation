import { Component, OnInit, Input } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-dev',
  templateUrl: './games-dev.component.html',
  styleUrls: ['./games-dev.component.css']
})
export class GamesDevComponent {

  @Input() games!: Games

  constructor() { }

  ngOnInit() {
  }

}

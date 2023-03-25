import { Component, OnInit, Input } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-manager',
  templateUrl: './games-manager.component.html',
  styleUrls: ['./games-manager.component.css']
})
export class GamesManagerComponent implements OnInit {

  @Input() games!: Games

  constructor() { }

  ngOnInit() {
  }

}
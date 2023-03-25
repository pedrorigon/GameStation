import { Component, OnInit, Input } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.css']
})
export class GamesLibraryComponent {

  @Input() games!: Games

  constructor() { }

  ngOnInit() {
  }

}

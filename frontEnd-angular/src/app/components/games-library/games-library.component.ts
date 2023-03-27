import { Component, OnInit, Input } from '@angular/core';
import { Biblio } from 'src/app/model/biblio.model';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.css']
})
export class GamesLibraryComponent {

  @Input() games!: Biblio

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

  ofertarJogo() {
    //IMPLEMENTAR
  }

  trocarJogo() {
    //IMPLEMENTAR
  }

}

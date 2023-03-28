import { Component, OnInit, Input } from '@angular/core';
import { GameInLibrary } from 'src/app/model/biblio.model';


@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.css']
})
export class GamesLibraryComponent {

  @Input() games!: GameInLibrary
  showDetails = false;
  imgvar = "https://media.kasperskydaily.com/wp-content/uploads/sites/94/2020/02/29174606/game-ratings-featured.jpg";

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
    //IMPLEMENTAR
  }

  public ofertarJogo(){
    let result = false;

    //conferir se é /biblioteca mesmo!!!
    fetch("http://127.0.0.1:8000/ofertas/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        id_chave: this.games.id_chave, preco: this.games.preco
      })
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, GameInLibrary[] | string]) =>
            data[0] ? (
              console.log("Successfully offered game!")
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }
}

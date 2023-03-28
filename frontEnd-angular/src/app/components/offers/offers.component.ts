import { Component } from '@angular/core';
import { Oferta } from 'src/app/model/oferta.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})

export class OffersComponent {
  gamesOffer: Oferta[] = [];
  //para filtragem nos generos selecionados
  selectedGenres: string[] = [];
  filteredGames: any[] = this.gamesOffer;
  

  ngOnInit(){
    this.refreshGames();
  }

  // carregar lista de jogos para venda do banco de dados
  refreshGames(): boolean {
    let result = false;

    //conferir se é /ofertas mesmo!!!
    fetch("http://127.0.0.1:8000/ofertas/", {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, Oferta[] | string]) =>
            data[0] ? (
              this.gamesOffer = data[1] as Oferta[], result = true, this.filterGames()
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

  filterGames() {
    this.selectedGenres = this.selectedGenres.map(genre => genre.toLowerCase());
    const gamesStoreCopy = [...this.gamesOffer];

    gamesStoreCopy.forEach(offer => {
      offer.tags = offer.tags.map(tag => tag.toLowerCase());
    });

    console.log('Selected genres:', this.selectedGenres);

    if (this.selectedGenres.length === 0) {
      this.filteredGames = gamesStoreCopy;
      return;
    }

    this.filteredGames = gamesStoreCopy.filter(offer => {
      return this.selectedGenres.every(genre => offer.tags.includes(genre));
    });

    console.log('Filtered games:', this.filteredGames);

    // Verifica se há algum gênero selecionado que não é válido na lista "GamesStore"
    const invalidGenres = this.selectedGenres.filter(genre => {
      return !gamesStoreCopy.some(offer => offer.tags.includes(genre));
    });

    if (invalidGenres.length > 0) {
      console.warn('Invalid genres:', invalidGenres);
    }
  }

  toggleGenre(genre: string) {
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    } else {
      this.selectedGenres.push(genre);
    }
    this.filterGames();
  }

  //para filtragem de escrita na search 
  search(e: Event): void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.filteredGames = this.gamesOffer.filter((offer) => { return offer.nome.includes(value); })
  }

  constructor() { }

}

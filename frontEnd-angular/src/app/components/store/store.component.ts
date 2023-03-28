import { Component } from '@angular/core';
import { Games } from 'src/app/model/games.model';
import { GameServiceService } from 'src/app/game-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})

export class StoreComponent {
  GamesStore: Games[] = [];
  
  //para filtragem nos generos selecionados
  selectedGenres: string[] = [];
  filteredGames: any[] = this.GamesStore;

  ngOnInit(){
    this.refreshGames();
  }

  refreshGames(): boolean {
    let result = false;

    fetch("http://127.0.0.1:8000/loja/", {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, Games[] | string]) =>
            data[0] ? (
              this.GamesStore = data[1] as Games[], result = true, this.filterGames()
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

  // constructor(private gameService: GameServiceService) { 
  //   this.gameService.game = this.game;
  // }

  filterGames() {
    this.selectedGenres = this.selectedGenres.map(genre => genre.toLowerCase());
    const gamesStoreCopy = [...this.GamesStore];

    gamesStoreCopy.forEach(game => {
      game.tags = game.tags.map(tag => tag.toLowerCase());
    });

    console.log('Selected genres:', this.selectedGenres);

    if (this.selectedGenres.length === 0) {
      this.filteredGames = gamesStoreCopy;
      return;
    }

    this.filteredGames = gamesStoreCopy.filter(game => {
      return this.selectedGenres.every(genre => game.tags.includes(genre));
    });

    console.log('Filtered games:', this.filteredGames);

    // Verifica se há algum gênero selecionado que não é válido na lista "GamesStore"
    const invalidGenres = this.selectedGenres.filter(genre => {
      return !gamesStoreCopy.some(game => game.tags.includes(genre));
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

    this.filteredGames = this.GamesStore.filter((game) => { return game.nome.includes(value); })
  }
}

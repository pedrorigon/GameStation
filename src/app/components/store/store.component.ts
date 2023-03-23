import { Component } from '@angular/core';
import { Games } from 'src/app/model/games.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})

export class StoreComponent {
  // carregar lista de jogos para venda do banco de dados
  GamesStore: Games[] = [
    {
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00,
      "avaliacao": 9,
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "id": 2,
      "link_imagens": "link imagem do jogo 2",
      "nome": "nome jogo 2",
      "preco": 90.90,
      "avaliacao": 9,
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "id": 3,
      "link_imagens": "link imagem do jogo 3",
      "nome": "nome jogo 3",
      "preco": 50.00,
      "avaliacao": 8,
      "tags": ["puzzle"]
    },
    {
      "id": 4,
      "link_imagens": "link imagem do jogo 4",
      "nome": "nome jogo 4",
      "preco": 70.00,
      "avaliacao": 7,
      "tags": ["adventure"]
    },
    {
      "id": 5,
      "link_imagens": "link imagem do jogo 5",
      "nome": "nome jogo 5",
      "preco": 120.00,
      "avaliacao": 9.5,
      "tags": ["action", "adventure"]
    },
    {
      "id": 6,
      "link_imagens": "link imagem do jogo 6",
      "nome": "nome jogo 6",
      "preco": 80.00,
      "avaliacao": 8.5,
      "tags": ["puzzle", "multiplayer"]
    },
  ];

  //para filtragem nos generos selecionados
  selectedGenres: string[] = [];
  filteredGames: any[] = this.GamesStore;

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

    this.filteredGames = this.GamesStore.filter((games) => { return games.nome.toLowerCase().includes(value); })
  }

  constructor() { }

}

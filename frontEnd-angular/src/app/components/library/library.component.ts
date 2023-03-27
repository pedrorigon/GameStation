import { 
  Component,
} from '@angular/core';
import { Biblio } from 'src/app/model/biblio.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  ngOnInit(){
    this.refreshGames();
    this.filterGames();
  }

  // carregar lista de jogos para venda do banco de dados
  refreshGames(): boolean {
    let result = false;

    //conferir se é /biblioteca mesmo!!!
    fetch("http://127.0.0.1:8000/biblioteca/", {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, Biblio[] | string]) =>
            data[0] ? (
              this.GamesLibrary = data[1] as Biblio[], result = true, this.filterGames()
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

  GamesLibrary: Biblio[] = [
    {
      "id_chave": 5,
      "avaliacao_usuario": 10,
      "disponibilidade": "string",
      "id": 1,
      "link_imagens": "link imagem do jogo 1",
      "nome": "nome jogo 1",
      "preco": 100.00,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
    {
      "id_chave": 7,
      "avaliacao_usuario": 10,
      "disponibilidade": "string",
      "id": 2,
      "link_imagens": "link imagem do jogo 2",
      "nome": "nome jogo 2",
      "preco": 90.90,
      "avaliacao": 9,
      "descricao": "descricao",
      "tags": ["action", "adventure", "multiplayer"]
    },
  ];

  //para filtragem nos generos selecionados
  selectedGenres: string[] = [];
  filteredGames: any[] = this.GamesLibrary;

  filterGames() {
    this.selectedGenres = this.selectedGenres.map(genre => genre.toLowerCase());
    const gamesStoreCopy = [...this.GamesLibrary];

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

    this.filteredGames = this.GamesLibrary.filter((games) => { return games.nome.toLowerCase().includes(value); })
  }

  constructor() { }

}

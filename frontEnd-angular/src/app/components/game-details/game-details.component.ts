import { Component, OnInit, ElementRef, Input, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { Games } from 'src/app/model/games.model';
import { GameServiceService } from 'src/app/game-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})

export class GameDetailsComponent implements AfterViewInit {

  @Input() game!: Games

  constructor() { }

  ngAfterViewInit() {
    console.log(this.game);
    const varGame = this.game;
    console.log(varGame);
  }

  // comprarJogo() {
  //   console.log(varGame);
  // }

  // game: any;

  // constructor(
  //   private route: ActivatedRoute,
  //   private gameService: GameServiceService
  // ) { }

  // ngOnInit() {
  //   const gameId = this.route.snapshot.paramMap.get('id');
  //   const id = parseInt(gameId!, 10);
  //   this.game = this.gameService.game.find(g => g.id === id);
  //   console.log(this.game);
  // }

}
// export class GameDetailsComponent {

//   // @Input() game!: Games
//   // @ViewChild('container_total') cont_total!: ElementRef;
//   // game: Games[] = [];

//   constructor(private gameService: GameServiceService) { }

//   // ngOnInit() {
//   //   this.game = this.gameService.game;
//   // }

//   // comprarJogo() {
//   //   console.log("entrou na funcao")
//   //   console.log(this.game.id);

//   // Lógica para comprar o jogo aqui
//   // const id_jogo = 1; // Substitua 1 pelo id do jogo que você deseja comprar
//   // const url = `http://127.0.0.1:8000/comprar_jogo/${id_jogo}`;

//   // this.http.put(url, { id_jogo: id_jogo }).subscribe(
//   //   (response) => {
//   //     console.log("Compra realizada com sucesso:", response);
//   //   },
//   //   (error) => {
//   //     console.log("Erro ao comprar jogo:", error);
//   //   }
//   // );
//   // }

// }
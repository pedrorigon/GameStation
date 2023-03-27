import { Injectable } from '@angular/core';
import { Games } from './model/games.model';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  showDetails = false;

  constructor() { }
}

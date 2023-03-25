import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-details-manager',
  templateUrl: './game-details-manager.component.html',
  styleUrls: ['./game-details-manager.component.css']
})
export class GameDetailsManagerComponent {
  @Input() name_obj!: string;
}

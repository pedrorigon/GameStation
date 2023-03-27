import { Component, OnInit, Input } from '@angular/core';
import { Historico } from 'src/app/model/historico.model';


@Component({
  selector: 'app-historico-manager',
  templateUrl: './historico-manager.component.html',
  styleUrls: ['./historico-manager.component.css']
})
export class HistoricoManagerComponent {

  @Input() transaction!: Historico

  ngOnInit() {

  }
}

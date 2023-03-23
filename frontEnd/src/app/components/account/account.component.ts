import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  mostrarFormulario = false;

  adicionarSaldo() {
    this.mostrarFormulario = true;
  }

  cancelar() {
    this.mostrarFormulario = false;
  }

  adicionar(dadosCartao: any) {
    // Lógica para adicionar saldo com os dados do cartão de crédito aqui
    this.mostrarFormulario = false;
  }

}

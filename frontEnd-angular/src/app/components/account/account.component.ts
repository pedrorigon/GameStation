import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Userinfo } from 'src/app/model/user_info.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  ngOnInit(): void {
    this.refreshUserInfo()
  }

  userInfo!: Userinfo

  refreshUserInfo(): boolean {
    let result = false;

    fetch("http://127.0.0.1:8000/user_info/", {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, Userinfo[] | string]) =>
            data[0] ? (
              this.userInfo = data[1][0] as Userinfo, result = true, console.log(this.userInfo)
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

  avaliacoesUser() {
    //implementar
  }

  mostrarFormulario = false;

  adicionarSaldo() {
    this.mostrarFormulario = true;
  }

  addSaldo(valor: string) {
    // alert("Valor a ser adicionado: " + valor);

    fetch("http://127.0.0.1:8000/aumentar_saldo/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        acrescimo: parseFloat(valor)
      })
    }).then(response => {
      if (response.ok) {
        // saldo adicionado com sucesso
        this.refreshUserInfo();
      } else {
        // erro ao adicionar saldo
        console.log("Erro ao adicionar saldo");
      }
    }).catch(error => {
      console.log("Erro na requisição");
    });

    this.refreshUserInfo();
  }

  // }
  cancelar() {
    this.mostrarFormulario = false;
  }

  adicionar(dadosCartao: any) {
    // Lógica para adicionar saldo com os dados do cartão de crédito aqui
    this.mostrarFormulario = false;
  }

}

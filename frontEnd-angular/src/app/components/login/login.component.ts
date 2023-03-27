import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  login(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Enviar dados para o servidor para verificar o login
    fetch("http://127.0.0.1:8000/session/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        login: username, password: MD5(password).toString(),
      })
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((data: [boolean, string | null]) => {
            if (data[0]) {
              const userType: string | null = data[1];
              if (userType === 'admin') {
                window.location.href = '/manager-interface'; // redireciona para a página do admin
              } else if (userType === 'dev') {
                window.location.href = '/dev-interface'; // redireciona para a página do desenvolvedor
              } else {
                window.location.href = '/store'; // redireciona para a página do usuário comum
              }
            } else {
              console.log(`Login falhou, motivo: ${data[1]}`);
            }
          });
      } else {
        console.log(response);
      }
    }).catch((err) => console.log('Erro na requisição'));

    this.loginForm.reset();
  }

  // login2() {
  //   const userType: string = 'dev'
  //   if (userType === 'admin') {
  //     window.location.href = '/manager-interface'; // redireciona para a página do admin
  //   } else if (userType === 'dev') {
  //     window.location.href = '/dev-interface'; // redireciona para a página do desenvolvedor
  //   } else {
  //     window.location.href = '/store'; // redireciona para a página do usuário comum
  //   }
  // }
}





import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    userType: new FormControl('dev', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  toggleForm(event: MouseEvent) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.loginForm.reset();
    } else {
      this.registerForm.reset();
    }
  }

  login(): boolean {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    let success = false;

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
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, string|null]) =>
            data[0] ? ( success = true ) :
              console.log(`Login falhou, motivo: ${data[1]}`)
        )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Erro na requisição')
    );

    this.loginForm.reset();

    return success;
  }

  register() {
    const name = this.registerForm.value.name;
    const password = this.registerForm.value.password;
    const userType = this.registerForm.value.userType;

    // Enviar dados para o servidor para registrar o usuário

    this.registerForm.reset();

    this.isLogin = true;
  }

  backToLogin(event: MouseEvent) {
    event.preventDefault();
    this.isLogin = true;
  }
}

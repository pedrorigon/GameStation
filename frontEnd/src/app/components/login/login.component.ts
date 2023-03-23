import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  toggleForm() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.loginForm.reset();
    } else {
      this.registerForm.reset();
    }
  }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Enviar dados para o servidor para verificar o login

    this.loginForm.reset();
  }

  register() {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const userType = this.registerForm.value.userType;

    // Enviar dados para o servidor para registrar o usuário

    this.registerForm.reset();
    this.isLogin = true;
  }

  backToLogin() {
    this.isLogin = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userType: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  register() {
    const name = this.registerForm.value.name;
    const password = this.registerForm.value.password;
    const userType = this.registerForm.value.userType;

    if (!userType) {
      console.log('Selecione um tipo de usuário válido');
      return;
    }

    // Enviar dados para o servidor para registrar o usuário

    this.navigateToDefaultPage(userType);

    this.registerForm.reset();

  }

  navigateToDefaultPage(userType: string) {
    let defaultPage = '';
    switch (userType) {
      case 'manager':
        defaultPage = '/manager-interface'; // Rota da página default do manager
        break;
      case 'dev':
        defaultPage = '/dev-interface'; // Rota da página default do developer
        break;
      case 'user':
        defaultPage = '/store'; // Rota da página default do gamer
        break;
      default:
        defaultPage = ''; // Rota padrão
        break;
    }
    this.router.navigate([defaultPage]);
  }


}

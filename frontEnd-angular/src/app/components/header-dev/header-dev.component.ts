import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-dev',
  templateUrl: './header-dev.component.html',
  styleUrls: ['./header-dev.component.css']
})
export class HeaderDevComponent {

  constructor(private router: Router) { }

  logout() {
    //aqui implementar
    this.router.navigate(['/login']);
  }

}

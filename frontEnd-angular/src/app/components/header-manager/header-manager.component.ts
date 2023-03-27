import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-manager',
  templateUrl: './header-manager.component.html',
  styleUrls: ['./header-manager.component.css']
})
export class HeaderManagerComponent {

  constructor(private router: Router) { }

  logout() {
    //aqui implementar
    this.router.navigate(['/login']);
  }

}

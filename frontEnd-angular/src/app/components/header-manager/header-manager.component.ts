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
    let success = false;

    fetch("http://127.0.0.1:8000/session/", {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    });

    this.router.navigate(['/login']);
  }

}

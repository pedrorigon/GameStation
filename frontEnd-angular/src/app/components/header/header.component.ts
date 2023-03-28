import { Component, Input } from '@angular/core';
import { Userinfo } from 'src/app/model/user_info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userInfo: Userinfo = {
    "login": "string",
    "saldo": 0,
    "rank": 0
  }

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
          .then((data: [boolean, { login: string, saldo: number, rank: number } | string]) =>
            data[0] ? (
              this.userInfo = data[1] as Userinfo, result = true
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

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

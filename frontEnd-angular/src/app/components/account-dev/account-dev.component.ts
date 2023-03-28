import { Component } from '@angular/core';
import { Devinfo } from 'src/app/model/dev_info.model';

@Component({
  selector: 'app-account-dev',
  templateUrl: './account-dev.component.html',
  styleUrls: ['./account-dev.component.css']
})
export class AccountDevComponent {
  ngOnInit(): void {
    this.refreshUserInfo()
  }

  devInfo!: Devinfo

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
          .then((data: [boolean, Devinfo[] | string]) =>
            data[0] ? (
              this.devInfo = data[1][0] as Devinfo, result = true, console.log(this.devInfo)
            ) : console.log(data[1])
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Error na requisição')
    );

    return result;
  }

}

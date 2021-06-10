import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Token} from '@angular/compiler';

@Injectable()
export class HomeServices {

  createUrl = 'https://movie.graved.ch/api/lobby/v1/create-lobby/new-lobby';
  joinUrl = 'https://movie.graved.ch/api/lobby/v1/join-lobby/join';

  token: Token;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  async createGame(username: string): Promise<any> {
    try {
      const req = await fetch(this.createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-User': '90x'
        },
        body: new URLSearchParams({username})
      });
      const res = await req.json();
      this.router.navigate(['lobby']);
    } catch (err) {
      this.router.navigate(['home']);
    }
  }

  async joinGame(username: string, token: string): Promise<void> {
    const req = await fetch(this.joinUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-User': '39y'
      },
      body: new URLSearchParams({username, token})
    })
      .then(res => res.json())
      .then(() => {
        this.router.navigate(['lobby']);
      })
      .catch(err => {
        this.router.navigate(['home']);
      });
  }


}

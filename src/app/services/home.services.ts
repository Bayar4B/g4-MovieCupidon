import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable()
export class HomeServices {

  createUrl = 'https://movie.graved.ch/api/lobby/v1/create-lobby/new-lobby';
  joinUrl = 'https://movie.graved.ch/lobby/v1/join-lobby/join';

  token: Token;

  constructor(private http: HttpClient,
              private router: Router) {}

  createGame(username: string): void {

    fetch(this.createUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-User': '86x'
      },
      body: new URLSearchParams({ username })
    })
      .then(req => req.json())
      .then(res => {
        console.log(res.token);
      })
      .catch(err => {
        console.log('err', err);
      });
    this.router.navigate(['lobby']);
  }

  joinGame(username: string, token: string): void {

    fetch(this.joinUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-User': '39y'
      },
      body: new URLSearchParams({ username, token })
    })
      .then(req => req.json())
      .then(res => {
        console.log(res.token);
      })
      .catch(err => {
        console.log('err', err);
      });
    this.router.navigate(['lobby']);
  }

}

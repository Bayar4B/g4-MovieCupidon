import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class HomeServices {
  createUrl = 'http://localhost:8000/loby/username';
  joinUrl = 'http://localhost:8000/loby/username+token';

  constructor(private http: HttpClient) {}

  createGame(username: string): void {
    this.http.post(this.createUrl, {username}, httpOptions)
      .subscribe(
        (error) => {
          console.log('Error : ' + error);
        }
      );
  }

  joinGame(username: string, token: string): void {
    this.http.post(this.joinUrl, {username, token}, httpOptions)
      .subscribe(
        (error) => {
          console.log('Error : ' + error);
        }
      );
  }


}

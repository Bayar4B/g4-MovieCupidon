import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'movieCupidon-frontend';
  login = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    /*this.http.get('https://movie.graved.ch/oauth2/userinfo')
      .subscribe( () => {
        this.login = true;
        });*/
  }
}


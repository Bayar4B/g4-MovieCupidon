import {Component, OnDestroy, OnInit} from '@angular/core';
import {Genre} from '../models/Genre.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {Token} from '@angular/compiler';
import {Subscription} from 'rxjs';

@Component({templateUrl: 'lobby.component.html'})

export class LobbyComponent implements OnInit, OnDestroy {
  token: Token;
  index = 0;
  selectedGenre: [];
  yearDown = 1900;
  yearUp = 2021;
  owner: boolean;
  interval: number;
  initDB: string;
  check: boolean;
  users: any;

  action = new Genre(28, 'Action');
  adventure = new Genre(12, 'Adventure');
  anim = new Genre(16, 'Animation');
  comedy = new Genre(35, 'Comedy');
  crime = new Genre(80, 'Crime');
  doc = new Genre(99, 'Documentary');
  drama = new Genre(18, 'Drama');
  family = new Genre(10751, 'Family');
  fantasy = new Genre(14, 'Fantasy');
  history = new Genre(36, 'History');
  horror = new Genre(27, 'Horror');
  music = new Genre(10402, 'Music');
  mystery = new Genre(9648, 'Mystery');
  romance = new Genre(10749, 'Romance');
  scifi = new Genre(878, 'Science-Fiction');
  tvmovie = new Genre(10770, 'TV Movie');
  thriller = new Genre(53, 'Thriller');
  war = new Genre(10752, 'War');
  western = new Genre(37, 'Western');

  genres = [this.action, this.adventure, this.anim, this.comedy, this.crime,
    this.doc, this.drama, this.family, this.fantasy, this.history, this.horror,
    this.music, this.mystery, this.romance, this.scifi, this.tvmovie, this.thriller,
    this.war, this.western];

  constructor(private http: HttpClient,
              private router: Router,
              private movieService: MovieService) {
  }


  async ngOnInit(): Promise<void> {
    this.owner = await this.isOwner();
    this.users = await  this.getNames();

    if ( this.owner ) {
      this.interval = setInterval(this.checkAllReady, 5000);
    } else {
      this.interval = setInterval(this.gameStarted, 5000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  sendStart(selectedGenre, years): void {
    fetch('https://movie.graved.ch/api/lobby/v1/lobby/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-User': '86x'
      },
      body: new URLSearchParams({ selectedGenre, years } )
    })
      .then(req => req.json())
      .then(res => {
        this.initDB = res;
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  async checkAllReady(): Promise<boolean> {
    const req = await fetch('https://movie.graved.ch/api/lobby/v1/lobby/isEveryoneReady', {
      method: 'GET',
      headers: {
        'X-User': '86x'
      }
    });
    const res = await req.json();
    return res.isEveryOneReady;
  }

  gameStarted(): void {
    fetch('https://movie.graved.ch/api/lobby/v1/lobby/hasTheGameStartYet', {
      method: 'GET',
      headers: {
        'X-User': '38y'
      }
    })
      .then(req => req.json())
      .then(async (result: []) => {
        const pref = await this.getLobbyPref();
        console.log('pref', pref);
        this.sendSampleSelectionJoiner(pref.genreList, pref.rangeYear);
        this.router.navigate(['lobby']);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  sendSampleSelectionJoiner( selectedGenre, years ): void {
    fetch('https://movie.graved.ch/api/sample/v1/sample-selection/get-sample', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User': '38y'
      },
      body: JSON.stringify( {genreList: selectedGenre.map(g => g.toLowerCase()), rangeYear: years.map(y => parseInt(y))} )
    })
      .then(req => req.json())
      .then( res => {
        res.forEach((m: { title: string, overview: string, vote_average: number, release_dates: string, poster_path: string }) => {
          this.movieService.addMovie({
            title: m.title,
            overview: m.overview,
            voteAverage: m.vote_average,
            releaseDates: m.release_dates,
            image: m.poster_path,
          });
        });
      });
  }

  sendSampleSelectionOwner( selectedGenre, years ): void {
    if ( this.checkAllReady ) {
      fetch('https://movie.graved.ch/api/sample/v1/sample-selection/get-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User': '86x'
        },
        body: JSON.stringify({ genreList: selectedGenre.map(g => g.toLowerCase()), rangeYear: years.map(y => parseInt(y))} )
      })
        .then(req => req.json())
        .then( res => {
          res.forEach((m: { title: string, overview: string, vote_average: number, release_dates: string, poster_path: string }) => {
            this.movieService.addMovie({
              title: m.title,
              overview: m.overview,
              voteAverage: m.vote_average,
              releaseDates: m.release_dates,
              image: m.poster_path,
            });
          });

          this.sendStart( selectedGenre, years );
        });
    }
  }

  sendQuit(): void {
    fetch('https://movie.graved.ch/api/lobby/v1/lobby/quit', {
      method: 'DELETE',
      headers: {
        'X-User': '86x'
      }
    })
      .then(req => req.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  sendReady(): void {
    fetch('https://movie.graved.ch/api/lobby/v1/lobby/toggleready', {
      method: 'GET',
      headers: {
        'X-User': '38y'
      }
    })
      .then(req => req.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  async getLobbyPref(): Promise<any> {
    return await this.http.get('https://movie.graved.ch/api/lobby/v1/lobby/getLobbyPref').subscribe();
  }

  async isOwner(): Promise<boolean> {
    const req = await fetch('https://movie.graved.ch/api/lobby/v1/lobby/isOwner', {
      method: 'GET',
      headers: {
        'X-User': '86x'
      }
    });
    const res = await req.json();
    return res.isOwner;
  }

  async getNames(): Promise<any> {
    const req = await fetch('https://movie.graved.ch/api/lobby/v1/lobby/seeUserInLobby', {
      method: 'GET',
      headers: {
        'X-User': '86x'
      }
    });
    const res = await req.json();
    return res.listPlayer;
    }
}

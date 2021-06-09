import {Component, OnDestroy, OnInit} from '@angular/core';
import {Genre} from '../models/Genre.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {TokenService} from '../services/token.service';
import {Token} from '@angular/compiler';
import {Subscription} from 'rxjs';
import {User} from '../models/User.model';

@Component({templateUrl: 'lobby.component.html'})

export class LobbyComponent implements OnInit, OnDestroy {
  token: Token;
  tokensubscription: Subscription;
  index = 0;
  selectedGenre: Genre[];
  yearDown = 1900;
  yearUp = 2021;
  owner = false; // this.isOwner();
  interval: number;
  initDB: string;

  // URL pour lobby service
  readyURL = 'https://movie.graved.ch/api/lobby/v1/lobby/toggleready';
  quitURL = 'https://movie.graved.ch/api/lobby/v1/lobby/quit';
  isOwnerURL = 'https://movie.graved.ch/api/lobby/v1/lobby/isOwner';
  checkReadyURL = 'https://movie.graved.ch/api/lobby/v1/lobby/isEveryoneReady';
  lobbyPrefURL = 'https://movie.graved.ch/api/lobby/v1/lobby/getLobbyPref';
  // URL pour sample service
  sampleURL = 'https://movie.graved.ch/api/sample/v1/sample-selection/get-sample';
  // URL pour play service
  startURL = 'https://movie.graved.ch/api/play/v1/play/start';
  checkStartURL = 'https://movie.graved.ch/api/play/v1/play/hasTheGameStartYet';

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


  ngOnInit(): void {
    if (this.owner) {
      this.interval = setInterval(this.checkAllReady, 5000);
    } else {
      this.interval = setInterval(this.gameStarted, 5000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  sendStart(): void {
    this.http.post(this.startURL, {})
      .subscribe(
        (res: string) => {
          this.initDB = res;
        });
  }

  /*checkAllReady(): void {
    this.http.get(this.checkReadyURL)
      .subscribe(
        (result) => {
          console.log(result);
        });
  }*/
  checkAllReady(): void {
    fetch(this.checkReadyURL, {
      method: 'GET',
      headers: {
        'X-User': 'r5757'
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

  gameStarted(): void {
    fetch(this.checkStartURL, {
      method: 'GET',
      headers: {
        'X-User': 'r5757'
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

  sendSampleSelectionJoiner( selectedGenre, rangeYear ): void {
    this.http.post(this.sampleURL, { selectedGenre, rangeYear } )
      .subscribe((response: []) => {
        response.forEach((m: { title: string, overview: string, vote_average: number, release_dates: string, poster_path: string }) => {
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

  sendSampleSelectionOwner( selectedGenre, rangeYear ): void {
    if ( this.checkAllReady ) {
      this.http.post(this.sampleURL, { selectedGenre, rangeYear } )
        .subscribe(( response: [] ) => {
          response.forEach((m: { title: string, overview: string, vote_average: number, release_dates: string, poster_path: string }) => {
            this.movieService.addMovie({
              title: m.title,
              overview: m.overview,
              voteAverage: m.vote_average,
              releaseDates: m.release_dates,
              image: m.poster_path,
            });
          });
        });
      this.sendStart();
    }
  }

  sendQuit(): void {
    this.http.delete(this.quitURL)
      .subscribe(
        (result) => {
          console.log(result);
        });
  }

  sendReady(): void {
    this.http.get(this.readyURL)
      .subscribe(
        (result) => {
          console.log(result);
        });
  }

  async getLobbyPref(): Promise<any> {
    return await this.http.get(this.lobbyPrefURL).subscribe();
  }

  isOwner(): void {
    this.http.get(this.isOwnerURL)
      .subscribe(
        (value: boolean) => {
          console.log(value);
          this.owner = value;
        });
  }

}
